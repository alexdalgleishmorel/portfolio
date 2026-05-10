import type { ComponentType } from 'react';
import type { MotifKey } from '../types';
import { Wave } from './Wave';
import { Rings } from './Rings';
import { Bars } from './Bars';
import { Pulse } from './Pulse';

export interface MotifProps {
  accent: string;
  accent2: string;
}

export const motifs: Record<MotifKey, ComponentType<MotifProps>> = {
  wave: Wave,
  rings: Rings,
  bars: Bars,
  pulse: Pulse,
};
