import { useEffect, useState } from 'react';

export type Route = 'projects' | 'about';

const parseRoute = (): Route => {
  const h = (window.location.hash || '').replace(/^#\/?/, '').split('/')[0];
  return h === 'about' ? 'about' : 'projects';
};

export const useHashRoute = (): [Route, (r: Route) => void] => {
  const [route, setRoute] = useState<Route>(parseRoute);
  useEffect(() => {
    const onH = () => setRoute(parseRoute());
    window.addEventListener('hashchange', onH);
    if (!window.location.hash) window.location.hash = '/projects';
    return () => window.removeEventListener('hashchange', onH);
  }, []);
  const go = (r: Route) => {
    window.location.hash = '/' + r;
  };
  return [route, go];
};
