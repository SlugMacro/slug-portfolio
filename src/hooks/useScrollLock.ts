// src/hooks/useScrollLock.ts
import { useEffect } from "react";

// Module-level reference count — survives across component instances
const lockCount = { value: 0 };

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (active) {
      lockCount.value++;
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (active) {
        lockCount.value--;
        if (lockCount.value === 0) {
          document.body.style.overflow = "";
        }
      }
    };
  }, [active]);
}
