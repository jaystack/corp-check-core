import { NodeEvaluation, LogType } from '../types';
import {
  Item,
  composeLeft,
  flatTree,
  groupByValue,
  sortByNames,
  flatGroups,
  getCountBy,
  sortByPathLength,
  sortGroupsByType,
  groupByType,
  sortGroupsByEvaluation,
  groupByEvaluation,
  processGroupsItems
} from './transformations';

export type Listing = {
  items: Item[];
  errorCount: number;
  warningCount: number;
  infoCount: number;
};

export const getListing = (rootEvaluation: NodeEvaluation): Listing => {
  const items = composeLeft(
    flatTree,
    groupByType,
    sortGroupsByType,
    processGroupsItems(
      groupByEvaluation,
      sortGroupsByEvaluation,
      processGroupsItems(sortByPathLength),
      flatGroups
    ),
    flatGroups
  )(rootEvaluation);

  return {
    items,
    errorCount: getCountBy(LogType.ERROR)(items),
    warningCount: getCountBy(LogType.WARNING)(items),
    infoCount: getCountBy(LogType.INFO)(items)
  };
};
