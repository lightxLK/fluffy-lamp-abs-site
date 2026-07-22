// Runs on every route change (app/template.tsx remounts, unlike layout.tsx),
// so this was previously pulling in framer-motion just for a fade-in — a
// ~120KB dependency for one opacity tween. tw-animate-css's `animate-in`
// utility gives the same effect via a plain CSS animation, no JS required.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-in fade-in duration-300 ease-out">{children}</div>;
}
