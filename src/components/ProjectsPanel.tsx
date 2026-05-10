import { useEffect, useRef } from 'react';
import type { Project } from '../types';

interface Props {
  projects: Project[];
  selected: number;
  setSelected: (i: number) => void;
  openDetail: (i?: number) => void;
}

interface DragState {
  down: boolean;
  startX: number;
  startScroll: number;
  dragged: boolean;
  captured?: boolean;
  pid?: number;
}

export const ProjectsPanel = ({ projects, selected, setSelected, openDetail }: Props) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const dragRef = useRef<DragState>({ down: false, startX: 0, startScroll: 0, dragged: false });
  const lastSelRef = useRef(selected);

  useEffect(() => {
    const sc = scrollerRef.current;
    const el = itemsRef.current[selected];
    if (!sc || !el) return;
    if (lastSelRef.current === selected) return;
    lastSelRef.current = selected;
    sc.scrollTo({ left: el.offsetLeft, behavior: 'smooth' });
  }, [selected]);

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
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
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
    return () => {
      sc.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [selected, setSelected]);

  return (
    <div className="panel glass projects-panel">
      <div className="panel-body">
        <button
          className="nav-arrow"
          aria-label="Previous project"
          disabled={selected === 0}
          onClick={() => setSelected(Math.max(0, selected - 1))}
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
          disabled={selected === projects.length - 1}
          onClick={() => setSelected(Math.min(projects.length - 1, selected + 1))}
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
