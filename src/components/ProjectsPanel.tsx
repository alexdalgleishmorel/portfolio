import { useEffect, useRef } from 'react';
import type { Project } from '../types';
import { useReducedMotion } from '../hooks/useReducedMotion';

const AUTO_ADVANCE_MS = 6000;

interface Props {
  projects: Project[];
  selected: number;
  setSelected: (i: number) => void;
  openDetail: (i?: number) => void;
  isDetailOpen: boolean;
}

interface DragState {
  down: boolean;
  startX: number;
  startScroll: number;
  dragged: boolean;
  captured?: boolean;
  pid?: number;
}

export const ProjectsPanel = ({
  projects,
  selected,
  setSelected,
  openDetail,
  isDetailOpen,
}: Props) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const dragRef = useRef<DragState>({ down: false, startX: 0, startScroll: 0, dragged: false });
  const lastSelRef = useRef(selected);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const sc = scrollerRef.current;
    const el = itemsRef.current[selected];
    if (!sc || !el) return;
    if (lastSelRef.current === selected) return;
    const prev = lastSelRef.current;
    lastSelRef.current = selected;
    const isLongJump = Math.abs(selected - prev) > 1;
    sc.scrollTo({ left: el.offsetLeft, behavior: isLongJump ? 'auto' : 'smooth' });
  }, [selected]);

  useEffect(() => {
    if (isDetailOpen || reducedMotion || projects.length <= 1) return;
    const id = window.setTimeout(() => {
      setSelected((selected + 1) % projects.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [selected, isDetailOpen, reducedMotion, projects.length, setSelected]);

  useEffect(() => {
    const sc = scrollerRef.current;
    if (!sc) return;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      dragRef.current = {
        down: true,
        startX: e.clientX,
        startScroll: sc.scrollLeft,
        dragged: false,
        captured: false,
        pid: e.pointerId,
      };
    };
    const onMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d.down) return;
      const dx = e.clientX - d.startX;
      if (Math.abs(dx) > 4) {
        if (!d.dragged) {
          d.dragged = true;
          try {
            if (d.pid !== undefined) sc.setPointerCapture?.(d.pid);
            d.captured = true;
          } catch {
            /* noop */
          }
        }
        sc.scrollLeft = d.startScroll - dx;
      }
    };
    const onUp = () => {
      const d = dragRef.current;
      if (!d.down) return;
      d.down = false;
      if (d.captured && d.pid !== undefined) {
        try {
          sc.releasePointerCapture?.(d.pid);
        } catch {
          /* noop */
        }
      }
      if (d.dragged) {
        setTimeout(() => {
          dragRef.current.dragged = false;
        }, 50);
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

  useEffect(() => {
    const sc = scrollerRef.current;
    if (!sc) return;
    // Debounce so we only commit a new selection once the scroll-snap
    // animation has fully settled — otherwise a single swipe can fire
    // overlapping setSelected calls (A→B→A→B) and re-trigger the screen-fade
    // mount animation mid-transition, causing a visible flicker.
    let settleTimer = 0;
    const onScroll = () => {
      if (settleTimer) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        const w = sc.clientWidth;
        if (!w) return;
        const i = Math.round(sc.scrollLeft / w);
        const clamped = Math.max(0, Math.min(itemsRef.current.length - 1, i));
        if (clamped !== selected) {
          lastSelRef.current = clamped;
          setSelected(clamped);
        }
      }, 50);
    };
    sc.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      sc.removeEventListener('scroll', onScroll);
      if (settleTimer) window.clearTimeout(settleTimer);
    };
  }, [selected, setSelected]);

  return (
    <div className="panel glass projects-panel">
      <div className="panel-body">
        <button
          className="nav-arrow"
          aria-label="Previous project"
          onClick={() => setSelected((selected - 1 + projects.length) % projects.length)}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="proj-scroller" ref={scrollerRef}>
          <div className="proj-scroller-inner">
            {projects.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                className={`proj-item ${i === selected ? 'active' : ''}`}
                onClick={(e) => {
                  if (dragRef.current.dragged) {
                    e.preventDefault();
                    return;
                  }
                  setSelected(i);
                  openDetail(i);
                }}
              >
                <div className="proj-name">{p.name}</div>
                <div className="proj-tags">CLICK TO LEARN MORE</div>
              </button>
            ))}
          </div>
        </div>
        <button
          className="nav-arrow"
          aria-label="Next project"
          onClick={() => setSelected((selected + 1) % projects.length)}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      <div className="dots">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === selected ? 'on' : ''}`}
            aria-label={`Go to project ${i + 1}`}
            onClick={() => setSelected(i)}
          />
        ))}
      </div>
    </div>
  );
};
