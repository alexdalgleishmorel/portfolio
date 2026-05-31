import type { ComponentType } from 'react';
import type { MotifKey } from '../types';
import { Wave } from './Wave';
import { Rings } from './Rings';
import { Bars } from './Bars';
import { Pulse } from './Pulse';
import { Mortgage } from './Mortgage';
import { FlowReport } from './FlowReport';
import { AverageCost } from './AverageCost';
import { PokerFlow } from './PokerFlow';
import { ExpenseVisualizer } from './ExpenseVisualizer';

export interface MotifProps {
  accent: string;
  accent2: string;
}

export const motifs: Record<MotifKey, ComponentType<MotifProps>> = {
  wave: Wave,
  rings: Rings,
  bars: Bars,
  pulse: Pulse,
  mortgage: Mortgage,
  'flow-report': FlowReport,
  'average-cost': AverageCost,
  'poker-flow': PokerFlow,
  'expense-visualizer': ExpenseVisualizer,
};
