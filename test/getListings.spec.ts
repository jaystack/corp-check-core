import 'jest';
import noDeps from './data/nodeps';
import deps from './data/deps';
import { getListing } from '../src/evaluationTransformations/getListing';

describe('getListing', () => {
  it('creates list by rootEvaluation without dependencies', () => {
    const rootEvaluation = noDeps;

    expect(getListing(rootEvaluation)).toEqual({
      errorCount: 0,
      warningCount: 1,
      infoCount: 2,
      items: [
        { type: 'INFO', evaluation: 'npm-scores', message: 'Quality: 82%', path: [ 'repatch' ] },
        { type: 'INFO', evaluation: 'npm-scores', message: 'Maintenance: 100%', path: [ 'repatch' ] },
        { type: 'WARNING', evaluation: 'npm-scores', message: 'Popularity: 18%', path: [ 'repatch' ] }
      ]
    });
  });

  it('creates list by rootEvaluation with dependencies', () => {
    const rootEvaluation = deps;

    expect(getListing(rootEvaluation)).toEqual({
      errorCount: 0,
      warningCount: 0,
      infoCount: 6,
      items: [
        { evaluation: 'npm-scores', message: 'Quality: 90%', path: [ 'async' ], type: 'INFO' },
        { evaluation: 'npm-scores', message: 'Popularity: 96%', path: [ 'async' ], type: 'INFO' },
        { evaluation: 'npm-scores', message: 'Maintenance: 67%', path: [ 'async' ], type: 'INFO' },
        { evaluation: 'npm-scores', message: 'Quality: 77%', path: [ 'async', 'lodash' ], type: 'INFO' },
        { evaluation: 'npm-scores', message: 'Popularity: 97%', path: [ 'async', 'lodash' ], type: 'INFO' },
        { evaluation: 'npm-scores', message: 'Maintenance: 100%', path: [ 'async', 'lodash' ], type: 'INFO' }
      ]
    });
  });
});
