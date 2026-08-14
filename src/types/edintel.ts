export interface SbirPitchMeta {
  pitchId: string;
  ppoId: string;
  dueDate: string;
  submitter: string;
  email: string;
  company: string;
  location: string;
  website: string;
  altPoc: string;
}

export interface FleetRouteMetric {
  id: string;
  routeName: string;
  passengerLoadPct: number;
  baselineKwhCost: number;
  optimizedKwhCost: number;
  peakDemandReductionKw: number;
  monthlySavingsUsd: number;
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number;
  label: string;
  pppFactor: number;
}

export interface MediaAsset {
  id: string;
  title: string;
  duration: string;
  views: number;
  retentionPct: number;
  conversionRate: number;
  storageMb: number;
  status: "optimal" | "flagged_for_pruning" | "auto_edited";
}

export interface SwarmAgent {
  id: string;
  name: string;
  role: string;
  status: "active" | "idle" | "optimizing";
  tasksCompleted: number;
  latencyMs: number;
}
