import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="relative">
      {/* Hero text: static on mobile, fixed on desktop */}
      <div className="relative z-0 flex min-h-[50vh] w-full items-end px-6 pb-12 pt-24 md:fixed md:top-0 md:left-0 md:w-[25%] md:max-w-[450px] md:items-start md:px-8 md:pt-[180px]">
        <h1 className="text-[clamp(56px,6vw,88px)] leading-[1.05] tracking-[-0.16vw] font-bold text-text-primary">
          Let's Talk
        </h1>
      </div>

      {/* Scrolling content */}
      <div className="relative z-10 w-full px-6 pb-24 md:ml-auto md:w-[75%] md:pt-[70vh] md:pr-8 md:pl-0">
        <div className="bg-bg pt-8 md:pl-8 md:pt-16">
          <div className="max-w-[600px]">
            <p className="mb-10 text-[18px] leading-[28px] text-text-secondary md:mb-12 md:text-[20px] md:leading-[30px]">
              Have a project in mind? Let's create something great together.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-0">
              <div className="border-t border-border py-5 md:py-6">
                <label className="mb-2 block text-[14px] uppercase tracking-[0.1em] text-text-secondary">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border-b border-border bg-transparent py-2 text-[18px] text-text-primary outline-none transition-colors duration-300 focus:border-accent md:text-[20px]"
                  placeholder="Your name"
                />
              </div>

              <div className="border-t border-border py-5 md:py-6">
                <label className="mb-2 block text-[14px] uppercase tracking-[0.1em] text-text-secondary">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border-b border-border bg-transparent py-2 text-[18px] text-text-primary outline-none transition-colors duration-300 focus:border-accent md:text-[20px]"
                  placeholder="your@email.com"
                />
              </div>

              <div className="border-t border-border py-5 md:py-6">
                <label className="mb-2 block text-[14px] uppercase tracking-[0.1em] text-text-secondary">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none border-b border-border bg-transparent py-2 text-[18px] text-text-primary outline-none transition-colors duration-300 focus:border-accent md:text-[20px]"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="border-t border-border pt-8">
                <button
                  type="submit"
                  className="text-[18px] tracking-[-0.02em] text-text-secondary transition-colors duration-300 hover:text-accent md:text-[20px]"
                  style={{ transitionTimingFunction: "cubic-bezier(1, 0, 0, 1)" }}
                >
                  Send Message →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
