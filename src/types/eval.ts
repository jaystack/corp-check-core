import { Node, PackageMeta } from './info';

export enum LogType {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO'
}

export type Log = {
  message: string;
  type: LogType;
  meta?: any;
};

export type Evaluation = {
  name: string;
  score: number;
  description: string;
  logs: Log[];
};

export enum Qualification {
  RECOMMENDED = 'RECOMMENDED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export type NodeEvaluation = {
  nodeName: string;
  nodeVersion: string;
  evaluations: Evaluation[];
  nodeScore: number;
  dependencies: NodeEvaluation[];
};

export type FinalEvaluation = {
  rootEvaluation: NodeEvaluation;
  qualification: Qualification;
};
