import { NodeEvaluation } from '../types';
import {
  Group,
  Item,
  composeLeft,
  flatTree,
  groupByEvaluation,
  sortGroupsByEvaluation,
  groupByType,
  sortGroupsByType,
  sortByPathLength,
  processGroupsItems,
  map,
  ensureEvaluationGroups,
  ensureTypeGroups
} from './transformations';

export const getSummary = (rootEvaluation: NodeEvaluation): Group<Group<Item>> =>
  composeLeft(
    flatTree,
    groupByEvaluation,
    ensureEvaluationGroups,
    sortGroupsByEvaluation,
    processGroupsItems(
      groupByType,
      ensureTypeGroups,
      sortGroupsByType,
      processGroupsItems(sortByPathLength)
    )
  )(rootEvaluation);
