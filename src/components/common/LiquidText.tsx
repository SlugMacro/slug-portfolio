import { useRef, useEffect, useCallback, useState } from 'react'

const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`

const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D u_texture;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_hover;

  void main() {
    vec2 uv = v_texCoord;
    float strength = u_hover;

    // Water ripple from mouse
    float dist = distance(uv, u_mouse);
    float ripple = sin(dist * 37.5 - u_time * 6.0) * exp(-dist * 4.5);

    // Organic wave layers
    float nx = sin(uv.y * 18.0 + u_time * 3.0) * 0.012;
    float ny = cos(uv.x * 15.0 + u_time * 2.25) * 0.009;

    vec2 offset = vec2(
      ripple * 0.045 + nx,
      ripple * 0.03 + ny
    ) * strength;

    // Chromatic aberration — red/blue split
    float aberration = strength * 0.015;
    vec2 dir = normalize(uv - u_mouse + 0.001);

    float r = texture2D(u_texture, uv + offset + dir * aberration).r;
    float g = texture2D(u_texture, uv + offset).g;
    float b = texture2D(u_texture, uv + offset - dir * aberration).b;
    float a = texture2D(u_texture, uv + offset).a;

    // Red/blue color glow at bottom
    float bottomGlow = smoothstep(0.2, 1.0, uv.y) * strength;
    float redGlow = bottomGlow * (0.5 + 0.5 * sin(uv.x * 4.5 + u_time * 1.2));
    float blueGlow = bottomGlow * (0.5 + 0.5 * cos(uv.x * 3.75 - u_time * 0.9));

    r += redGlow * 0.525 * a;
    b += blueGlow * 0.6 * a;

    gl_FragColor = vec4(r, g, b, a);
  }
`

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const s = gl.createShader(type)!; gl.shaderSource(s, source); gl.compileShader(s); return s
}
function createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const p = gl.createProgram()!; gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p); return p
}
function measureDescent(font: string) {
  const c = document.createElement('canvas'); const ctx = c.getContext('2d')!; ctx.font = font
  return ctx.measureText('Mpgyq|').actualBoundingBoxDescent
}

interface Props { children: React.ReactNode; className?: string; style?: React.CSSProperties }

export default function LiquidText({ children, className, style }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const textureRef = useRef<WebGLTexture | null>(null)
  const rafRef = useRef(0)
  const startTimeRef = useRef(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const hoverRef = useRef(0)
  const hoverTargetRef = useRef(0)
  const [canvasReady, setCanvasReady] = useState(false)

  const initGL = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true }); if (!gl) return
    glRef.current = gl
    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    const program = createProgram(gl, vs, fs); programRef.current = program; gl.useProgram(program)

    const posBuf = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc); gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const texBuf = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, texBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,1,1,1,0,0,0,0,1,1,1,0]), gl.STATIC_DRAW)
    const texLoc = gl.getAttribLocation(program, 'a_texCoord')
    gl.enableVertexAttribArray(texLoc); gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0)

    const tex = gl.createTexture()!; textureRef.current = tex; gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  }, [])

  const captureText = useCallback(() => {
    const textEl = textRef.current; const glCanvas = canvasRef.current; const gl = glRef.current
    if (!textEl || !glCanvas || !gl) return
    const dpr = window.devicePixelRatio || 1
    const cs = getComputedStyle(textEl)
    const font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
    const fontSize = parseFloat(cs.fontSize)
    const descent = measureDescent(font)
    const rect = textEl.getBoundingClientRect()
    const lines: string[] = []; let cur = ''
    textEl.childNodes.forEach(n => { if (n.nodeName === 'BR') { lines.push(cur); cur = '' } else cur += n.textContent ?? '' })
    if (cur) lines.push(cur)
    const lh = fontSize * 0.75; const totalH = lh * lines.length + descent
    const w = Math.round(rect.width * dpr); const h = Math.round(totalH * dpr)
    glCanvas.width = w; glCanvas.height = h
    glCanvas.style.width = `${rect.width}px`; glCanvas.style.height = `${totalH}px`
    gl.viewport(0, 0, w, h)
    const off = document.createElement('canvas'); off.width = w; off.height = h
    const ctx = off.getContext('2d')!; ctx.scale(dpr, dpr); ctx.font = font; ctx.fillStyle = cs.color; ctx.textBaseline = 'top'
    if (cs.letterSpacing !== 'normal' && 'letterSpacing' in ctx) (ctx as CanvasRenderingContext2D).letterSpacing = cs.letterSpacing
    lines.forEach((l, i) => ctx.fillText(l, 0, i * lh))
    gl.bindTexture(gl.TEXTURE_2D, textureRef.current)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off)
    setCanvasReady(true)
  }, [])

  const renderStatic = useCallback(() => {
    const gl = glRef.current; const p = programRef.current; if (!gl || !p) return
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT)
    gl.uniform1f(gl.getUniformLocation(p, 'u_time'), 0)
    gl.uniform2f(gl.getUniformLocation(p, 'u_mouse'), 0.5, 0.5)
    gl.uniform1f(gl.getUniformLocation(p, 'u_hover'), 0)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }, [])

  const render = useCallback(() => {
    const gl = glRef.current; const p = programRef.current; if (!gl || !p) return
    hoverRef.current += (hoverTargetRef.current - hoverRef.current) * 0.09
    const time = (performance.now() - startTimeRef.current) / 1000
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT)
    gl.uniform1f(gl.getUniformLocation(p, 'u_time'), time)
    gl.uniform2f(gl.getUniformLocation(p, 'u_mouse'), mouseRef.current.x, mouseRef.current.y)
    gl.uniform1f(gl.getUniformLocation(p, 'u_hover'), hoverRef.current)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    if (hoverTargetRef.current === 0 && hoverRef.current < 0.01) { hoverRef.current = 0; renderStatic(); return }
    rafRef.current = requestAnimationFrame(render)
  }, [renderStatic])

  useEffect(() => {
    initGL(); startTimeRef.current = performance.now()
    document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(() => captureText())))
    const onResize = () => { setCanvasReady(false); requestAnimationFrame(() => captureText()) }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', onResize) }
  }, [initGL, captureText])

  useEffect(() => { if (canvasReady) renderStatic() }, [canvasReady, renderStatic])

  const onEnter = useCallback(() => {
    hoverTargetRef.current = 1; cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(render)
  }, [render])
  const onLeave = useCallback(() => { hoverTargetRef.current = 0 }, [])
  const onMove = useCallback((e: React.MouseEvent) => {
    const r = containerRef.current?.getBoundingClientRect(); if (!r) return
    mouseRef.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }
  }, [])

  return (
    <div ref={containerRef} className="relative cursor-pointer" onMouseEnter={onEnter} onMouseLeave={onLeave} onMouseMove={onMove}>
      <div ref={textRef} className={className} style={{ ...style, visibility: canvasReady ? 'hidden' : 'visible' }}>{children}</div>
      <canvas ref={canvasRef} className="absolute top-0 left-0 pointer-events-none" />
    </div>
  )
}
