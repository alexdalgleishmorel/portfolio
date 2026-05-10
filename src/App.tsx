import { useEffect, useState } from 'react';
import { projects } from './data/projects';
import { useHashRoute } from './hooks/useHashRoute';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useScene } from './hooks/useScene';
import { NavChip } from './components/NavChip';
import { ProjectScreen } from './components/ProjectScreen';
import { AboutScreen } from './components/AboutScreen';
import { ProjectsPanel } from './components/ProjectsPanel';
import { BioPanel } from './components/BioPanel';
import { DetailCard } from './components/DetailCard';

export const App = () => {
  const [route, go] = useHashRoute();
  const [selected, setSelected] = useState(0);
  const [detail, setDetail] = useState(false);
  const [detailIndex, setDetailIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const scene = useScene();
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    setDetail(false);
  }, [route]);

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const current = projects[selected];

  // Cover-fit math: oversize the stage so its intrinsic aspect fills the
  // whole viewport, then absolutely center it. Anything past the viewport
  // edges is clipped by .stage-wrap's overflow:hidden, so no gradient bars.
  const sceneAR = scene.width / scene.height;
  const stageW = Math.max(vp.w, vp.h * sceneAR);
  const stageH = Math.max(vp.h, vp.w / sceneAR);
  const stageStyle = {
    position: 'absolute' as const,
    width: `${stageW}px`,
    height: `${stageH}px`,
    left: `${(vp.w - stageW) / 2}px`,
    top: `${(vp.h - stageH) / 2}px`,
  };

  return (
    <div className="app">
      <div className="stage-wrap">
        <div className="stage" style={stageStyle}>
          <img className="bg" src={scene.src} alt="" />

          <div
            className={`screen ${route === 'projects' ? 'screen-clickable' : ''}`}
            onClick={() => {
              if (route === 'projects' && current) {
                setDetailIndex(selected);
                setDetail(true);
              }
            }}
            style={{
              left: scene.bbox.left + '%',
              top: scene.bbox.top + '%',
              width: scene.bbox.width + '%',
              height: scene.bbox.height + '%',
            }}
          >
            <div className={`screen-inner route-${route}`}>
              {route === 'projects' && current && (
                <div key={current.id} className="screen-fade">
                  <ProjectScreen project={current} reducedMotion={reducedMotion} />
                </div>
              )}
              {route === 'about' && (
                <div key="about" className="screen-fade">
                  <AboutScreen />
                </div>
              )}
            </div>
            <div className="screen-gloss" aria-hidden />
          </div>

          <div className="ui-nav">
            <div className="brand-name">Alex Dalgleish-Morel</div>
            <div className="brand-role">Full Stack Developer</div>
            <NavChip route={route} go={go} />
          </div>

          <div className="ui-panel">
            {route === 'projects' && projects.length > 0 && (
              <ProjectsPanel
                projects={projects}
                selected={selected}
                setSelected={setSelected}
                openDetail={(i) => {
                  setDetailIndex(i ?? selected);
                  setDetail(true);
                }}
                isDetailOpen={detail}
              />
            )}
            {route === 'about' && <BioPanel />}
          </div>

          {detail && projects[detailIndex] && route === 'projects' && (
            <DetailCard project={projects[detailIndex]} onClose={() => setDetail(false)} />
          )}
        </div>
      </div>
    </div>
  );
};
