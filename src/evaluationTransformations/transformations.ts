import { NodeEvaluation, LogType } from '../types';
import { reduceTree } from './reduceTree';

export type Group<T> = {
  name: string;
  items: T[];
};

export type Item = {
  type: LogType;
  evaluation: string;
  message: string;
  path: string[];
};

export const composeLeft = (...funcs) => {
  if (funcs.length === 0) return _ => _;
  if (funcs.length === 1) return funcs[0];
  return funcs.reduce((acc, f) => (...args) => f(acc(...args)));
};

export const map = <I, T>(mapper: (i: I) => T) => (items: I[]): T[] => items.map(mapper);

export const filter = <I>(predicate: (i: I) => boolean) => (items: I[]): I[] => items.filter(predicate);

export const processGroupsItems = <I, O>(...processors) =>
  map<Group<I>, Group<O>>(({ name, items }) => ({ name, items: composeLeft(...processors)(items) }));

export const flatTree = (tree: NodeEvaluation) =>
  reduceTree<Item[]>(
    tree,
    (items, { evaluations }, path) =>
      evaluations.reduce(
        (items, { name, logs }) =>
          logs.reduce((items, { type, message }) => [ ...items, { evaluation: name, type, message, path } ], items),
        items
      ),
    []
  );

export const sortBy = <I>(sorter: (a: I, b: I) => number) => (items: I[]) => items.sort(sorter);

export const sortByPathLength = sortBy<Item>((a, b) => a.path.length - b.path.length);

export const sortByNames = <I>(prop: string) => (names: string[]) =>
  sortBy<I>((a, b) => {
    const aIndex = names.indexOf(a[prop]) || Infinity;
    const bIndex = names.indexOf(b[prop]) || Infinity;
    return bIndex - aIndex;
  });

export const sortGroupBy = sortByNames('name');

export const sortGroupsByType = sortGroupBy([ LogType.ERROR, LogType.ERROR ]);

export const sortGroupsByEvaluation = sortGroupBy([ 'license', 'version' ]);

export const groupBy = <I>(
  predicate: (group: Group<I>, name: string) => boolean,
  getGroupName: (item: I) => string
) => (items: I[]) =>
  items.reduce((groups: Group<I>[], item: I) => {
    const name = getGroupName(item);
    const groupIndex = groups.findIndex(group => predicate(group, name));
    return groupIndex > -1
      ? groups.map((group, i) => (i === groupIndex ? { name: group.name, items: [ ...group.items, item ] } : group))
      : [ ...groups, { name, items: [ item ] } ];
  }, []);

export const groupByValue = <I>(prop: string) =>
  groupBy<I>((group, groupName) => group.name === groupName, item => item[prop]);

export const groupByType = groupByValue('type');

export const groupByEvaluation = groupByValue('evaluation');

export const ensureGroups = <I>(names: string[]) => (groups: Group<I>[]) =>
  names.map(groupName => groups.find(({ name }) => name === groupName) || { name: groupName, items: [] });

export const ensureEvaluationGroups = ensureGroups([ 'license', 'version', 'npm-scores' ]);

export const ensureTypeGroups = ensureGroups([ LogType.ERROR, LogType.WARNING, LogType.INFO ]);

export const getCountBy = (name: string) => (items: Item[]) => items.filter(({ type }) => type === name).length;

export const flatGroups = <I>(array: Group<I>[]): I[] => array.reduce((prev, { items }) => [ ...prev, ...items ], []);
