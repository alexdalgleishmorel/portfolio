import { useEffect, useState } from 'react';
import { scenes, type Scene } from '../data/scenes';

const pickScene = (w: number, h: number): Scene => {
  const ar = w / h;
  return scenes.reduce((best, s) => {
    const sar = s.width / s.height;
    const bsar = best.width / best.height;
    return Math.abs(sar - ar) < Math.abs(bsar - ar) ? s : best;
  });
};

export const useScene = (): Scene => {
  const [scene, setScene] = useState<Scene>(() => pickScene(window.innerWidth, window.innerHeight));
  useEffect(() => {
    const onResize = () => setScene(pickScene(window.innerWidth, window.innerHeight));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return scene;
};
