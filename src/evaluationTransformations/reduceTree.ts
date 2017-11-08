import { NodeEvaluation } from '../types';

export type Reducer<T> = (acc: T, node: NodeEvaluation, path: string[]) => T;

const reduce = <T>(reducer: Reducer<T>, accResult: T, node: NodeEvaluation, path: string[], depth: number): T => {
  const rootValue = reducer(accResult, node, path);
  return path.length > depth + 1
    ? rootValue
    : (node.dependencies || [])
        .reduce(
          (acc, dependency) => reduce(reducer, acc, dependency, [ ...path, dependency.nodeName ], depth),
          rootValue
        );
};

export default <T>(tree: NodeEvaluation, reducer: Reducer<T>, initialResult: T, depth: number = Infinity): T => {
  return reduce(reducer, initialResult, tree, [ tree.nodeName ], depth);
};
