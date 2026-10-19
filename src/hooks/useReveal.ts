import { useEffect, useRef } from "react";

/**
 * Enter-on-scroll (handoff › board 19): children with `.reveal` get `.is-visible`
 * once the container is 20 % visible, once only. Stagger is driven by the
 * `--i` custom property on each child (100 ms per step, see index.css).
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.classList.contains("reveal") ? [root] : Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (items.length === 0) return;
    if (typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            items.forEach((el, i) => {
              if (!el.style.getPropertyValue("--i")) el.style.setProperty("--i", String(i));
              el.classList.add("is-visible");
            });
            io.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);
  return ref;
}
