// Portfolio prototype — overlay UI on top of a static illustrated scene.
// The magenta laptop screen in the background image lives at:
//   left 19.079%, top 41.977%, width 25.179%, height 26.355% (of the image).
// We render a fixed-aspect stage matching the image so overlays stay aligned.

const { useState, useEffect, useRef, useMemo } = React;

// Magenta bbox is left 19.079% / top 41.977% / width 25.179% / height 26.355%.
// Overshoot the bbox slightly so the dark bezel fully covers any rounding/
// subpixel gaps. The overlay corners are clipped by overflow:hidden anyway.
const SCREEN = {
  left: 18.85,
  top: 41.40,
  width: 25.60,
  height: 27.45
};

const IMG_AR = 1672 / 941; // ~1.776

// ─────────────────────────────────────────── helpers
const useReducedMotion = () => {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const upd = () => setR(m.matches);
    upd();
    m.addEventListener('change', upd);
    return () => m.removeEventListener('change', upd);
  }, []);
  return r;
};

const useHashRoute = () => {
  const get = () => {
    const h = (window.location.hash || '').replace(/^#\/?/, '').split('/')[0];
    return h === 'about' ? 'about' : 'projects';
  };
  const [route, setRoute] = useState(get);
  useEffect(() => {
    const onH = () => setRoute(get());
    window.addEventListener('hashchange', onH);
    if (!window.location.hash) window.location.hash = '/projects';
    return () => window.removeEventListener('hashchange', onH);
  }, []);
  const go = (r) => {window.location.hash = '/' + r;};
  return [route, go];
};

// ─────────────────────────────────────────── per-project screen content
const ProjectScreen = ({ project, reducedMotion }) => {
  const { name, headline, accent, accent2, motif } = project;
  return (
    <div className="ps-root" style={{
      background: `radial-gradient(120% 140% at 20% 10%, ${accent2}55, transparent 55%),
                   radial-gradient(120% 140% at 90% 100%, ${accent}40, transparent 60%),
                   linear-gradient(160deg, #0d0a1f 0%, #1a1535 60%, #2a1a3a 100%)`
    }} data-comment-anchor="075e3b0f3e-div-53-5">
      <div className={`ps-motif ps-motif-${motif} ${reducedMotion ? 'ps-static' : ''}`}
      style={{ '--a': accent, '--b': accent2 }}>
        {motif === 'wave' &&
        <svg viewBox="0 0 400 200" preserveAspectRatio="none">
            <path d="M0,120 Q100,60 200,120 T400,120 L400,200 L0,200Z" fill={accent + '33'} />
            <path d="M0,140 Q100,90 200,140 T400,140 L400,200 L0,200Z" fill={accent2 + '33'} />
          </svg>
        }
        {motif === 'rings' &&
        <div className="rings">
            <span /><span /><span /><span />
          </div>
        }
        {motif === 'bars' &&
        <div className="bars">
            {[...Array(8)].map((_, i) => <span key={i} style={{ '--i': i }} />)}
          </div>
        }
        {motif === 'pulse' &&
        <div className="pulse">
            <span /><span />
          </div>
        }
      </div>

      <div className="ps-content">
        <div className="ps-eyebrow">{project.tags.join(' · ').toUpperCase()}</div>
        <div className="ps-name">{name}</div>
        <div className="ps-headline">{headline}</div>
      </div>

    </div>);

};

// ─────────────────────────────────────────── About screen content
const AboutScreen = () =>
<div className="ps-root about-root">
    <div className="about-name">
      Alex
      <br />
      <em>Dalgleish-Morel</em>
    </div>
    <div className="about-links">
      <a className="about-link" href="#" onClick={(e) => e.preventDefault()}>
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
        </svg>
        <span>Resume</span>
      </a>
      <a className="about-link" href="#" onClick={(e) => e.preventDefault()}>
        <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3v-11zm6.5 0h3.8v1.5h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v5.4h-4v-4.8c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v4.9h-4v-11z" />
        </svg>
        <span>LinkedIn</span>
      </a>
    </div>
  </div>;


// ─────────────────────────────────────────── nav chip
const NavChip = ({ route, go }) =>
<div className="nav-chip glass" data-screen-label="Nav chip">
    <button
    className={`nav-tab ${route === 'projects' ? 'active' : ''}`}
    onClick={() => go('projects')}>
      Projects
    </button>
    <button
    className={`nav-tab ${route === 'about' ? 'active' : ''}`}
    onClick={() => go('about')}>
      About
    </button>
    <span className={`nav-thumb ${route === 'about' ? 'right' : ''}`} aria-hidden />
  </div>;


// ─────────────────────────────────────────── projects panel
const ProjectsPanel = ({ projects, selected, setSelected, openDetail }) => {
  const scrollerRef = useRef(null);
  const itemsRef = useRef([]);
  // Track drag so a click that ended a drag doesn't trigger the modal.
  const dragRef = useRef({ down: false, startX: 0, startScroll: 0, dragged: false });
  const lastSelRef = useRef(selected);

  // Sync scroll position when selection changes externally (arrows, dots).
  useEffect(() => {
    const sc = scrollerRef.current;
    const el = itemsRef.current[selected];
    if (!sc || !el) return;
    if (lastSelRef.current === selected) return;
    lastSelRef.current = selected;
    // each chip is 100% of scroller width, so target = i * scroller width
    sc.scrollTo({ left: el.offsetLeft, behavior: 'smooth' });
  }, [selected]);

  // Pointer-based drag scrolling for desktop (mouse-drag through chips).
  useEffect(() => {
    const sc = scrollerRef.current;
    if (!sc) return;
    const onDown = (e) => {
      // ignore touch — native scroll handles it
      if (e.pointerType === 'touch') return;
      dragRef.current = { down: true, startX: e.clientX, startScroll: sc.scrollLeft, dragged: false, captured: false, pid: e.pointerId };
    };
    const onMove = (e) => {
      const d = dragRef.current;
      if (!d.down) return;
      const dx = e.clientX - d.startX;
      if (Math.abs(dx) > 4) {
        if (!d.dragged) {
          d.dragged = true;
          // only capture once we've decided this is a drag; doing it on
          // pointerdown swallows the click on child buttons
          try { sc.setPointerCapture?.(d.pid); d.captured = true; } catch (_) {}
        }
        sc.scrollLeft = d.startScroll - dx;
      }
    };
    const onUp = (e) => {
      const d = dragRef.current;
      if (!d.down) return;
      d.down = false;
      if (d.captured) { try { sc.releasePointerCapture?.(d.pid); } catch (_) {} }
      if (d.dragged) {
        setTimeout(() => { dragRef.current.dragged = false; }, 50);
      }
    };
    sc.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      sc.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  // observe scroll to update selection
  useEffect(() => {
    const sc = scrollerRef.current;
    if (!sc) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // each chip is one scroller-width wide, so index = round(scrollLeft / width)
        const w = sc.clientWidth;
        if (!w) return;
        const i = Math.round(sc.scrollLeft / w);
        const clamped = Math.max(0, Math.min(itemsRef.current.length - 1, i));
        if (clamped !== selected) {
          lastSelRef.current = clamped;
          setSelected(clamped);
        }
      });
    };
    sc.addEventListener('scroll', onScroll, { passive: true });
    return () => {sc.removeEventListener('scroll', onScroll);cancelAnimationFrame(raf);};
  }, [selected, setSelected]);

  return (
    <div className="panel glass projects-panel" data-screen-label="Projects panel">
      <div className="panel-body">
        <button
          className="nav-arrow"
          aria-label="Previous project"
          disabled={selected === 0}
          onClick={() => setSelected(Math.max(0, selected - 1))}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="proj-scroller" ref={scrollerRef}>
          <div className="proj-scroller-inner" data-comment-anchor="863d167737-div-174-11">
            {projects.map((p, i) =>
            <button
              key={p.id}
              ref={(el) => itemsRef.current[i] = el}
              className={`proj-item ${i === selected ? 'active' : ''}`}
              onClick={(e) => {
                if (dragRef.current.dragged) { e.preventDefault(); return; }
                setSelected(i);
                openDetail(i);
              }}>
                <div className="proj-name">{p.name}</div>
                <div className="proj-tags">{p.tags.join(' · ').toUpperCase()}</div>
              </button>
            )}
          </div>
        </div>
        <button
          className="nav-arrow"
          aria-label="Next project"
          disabled={selected === projects.length - 1}
          onClick={() => setSelected(Math.min(projects.length - 1, selected + 1))}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      <div className="dots">
          {projects.map((_, i) =>
          <button
            key={i}
            className={`dot ${i === selected ? 'on' : ''}`}
            aria-label={`Go to project ${i + 1}`}
            onClick={() => setSelected(i)} />
          )}
        </div>
    </div>);

};

// ─────────────────────────────────────────── about bio panel
const BioPanel = () =>
<div className="panel glass bio-panel" data-screen-label="Bio panel">
    <div className="bio-text">
      Designer and developer crafting thoughtful digital experiences.
    </div>
  </div>;


// ─────────────────────────────────────────── sky buttons (about)
const SkyButtons = () =>
<div className="sky-buttons" data-screen-label="Sky buttons">
    <a className="sky-btn glass" href="#" onClick={(e) => e.preventDefault()}>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6" />
        <path d="M8 13h8M8 17h5" />
      </svg>
      <span>Resume</span>
    </a>
    <a className="sky-btn glass" href="#" onClick={(e) => e.preventDefault()}>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3v-11zm6.5 0h3.8v1.5h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v5.4h-4v-4.8c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v4.9h-4v-11z" />
      </svg>
      <span>LinkedIn</span>
    </a>
  </div>;


// ─────────────────────────────────────────── detail card (optional)
const DetailCard = ({ project, onClose }) =>
<div className="detail-overlay" onClick={onClose}>
    <div className="detail-card glass" onClick={(e) => e.stopPropagation()}>
      <button className="detail-close" onClick={onClose} aria-label="Close">×</button>
      <div className="detail-eyebrow">{project.tags.join(' · ').toUpperCase()}</div>
      <h2 className="detail-name">{project.name}</h2>
      <p className="detail-headline">{project.headline}</p>
      <p className="detail-desc">{project.description}</p>
      <div className="detail-actions">
        {project.links.github && <a className="detail-btn" href="#" onClick={(e) => e.preventDefault()}>GitHub</a>}
        {project.links.demo && <a className="detail-btn" href="#" onClick={(e) => e.preventDefault()}>Demo</a>}
        {project.links.try && <a className="detail-btn primary" href="#" onClick={(e) => e.preventDefault()}>Try it</a>}
      </div>
    </div>
  </div>;


// ─────────────────────────────────────────── main app
const App = () => {
  const [route, go] = useHashRoute();
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(0);
  const [detail, setDetail] = useState(false);
  const [detailIndex, setDetailIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    fetch('data/projects.json').
    then((r) => r.json()).
    then((d) => setProjects(d.projects)).
    catch(() => setProjects([]));
  }, []);

  // close detail on route change
  useEffect(() => {setDetail(false);}, [route]);

  const current = projects[selected];

  return (
    <div className="app" data-screen-label={route === 'about' ? 'About' : 'Projects'}>
      <div className="stage-wrap">
        <div className="stage">
          <img className="bg" src="assets/scene.png" alt="" />

          {/* Laptop screen overlay */}
          <div className={`screen ${route === 'projects' ? 'screen-clickable' : ''}`}
               onClick={() => {
                 if (route === 'projects' && current) {
                   setDetailIndex(selected);
                   setDetail(true);
                 }
               }}
               style={{
            left: SCREEN.left + '%',
            top: SCREEN.top + '%',
            width: SCREEN.width + '%',
            height: SCREEN.height + '%'
          }}>
            <div className={`screen-inner route-${route}`}>
              {route === 'projects' && current &&
              <div key={current.id} className="screen-fade">
                  <ProjectScreen project={current} reducedMotion={reducedMotion} />
                </div>
              }
              {route === 'about' &&
              <div key="about" className="screen-fade">
                  <AboutScreen />
                </div>
              }
            </div>
            {/* subtle screen reflection */}
            <div className="screen-gloss" aria-hidden />
          </div>

          {/* Top-left nav chip */}
          <div className="ui-nav">
            <div className="brand-name">Alex Dalgleish-Morel</div>
            <div className="brand-role">Full Stack Developer</div>
            <NavChip route={route} go={go} />
          </div>

          {/* Sky buttons (about only) */}
          <div className={`ui-sky ${route === 'about' ? 'on' : 'off'}`}>
            <SkyButtons />
          </div>

          {/* Bottom panel */}
          <div className="ui-panel">
            {route === 'projects' && projects.length > 0 &&
            <ProjectsPanel
              projects={projects}
              selected={selected}
              setSelected={setSelected}
              openDetail={(i) => { setDetailIndex(i ?? selected); setDetail(true); }} />
            }
            {route === 'about' && <BioPanel />}
          </div>

          {/* Detail card */}
          {detail && projects[detailIndex] && route === 'projects' &&
          <DetailCard project={projects[detailIndex]} onClose={() => setDetail(false)} />
          }
        </div>
      </div>
    </div>);

};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);