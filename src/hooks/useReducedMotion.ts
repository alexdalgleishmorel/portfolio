import { useEffect, useState } from 'react';

export const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const upd = () => setReduced(m.matches);
    upd();
    m.addEventListener('change', upd);
    return () => m.removeEventListener('change', upd);
  }, []);
  return reduced;
};
