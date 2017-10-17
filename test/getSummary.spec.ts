import 'jest';
import noDeps from './data/nodeps';
import deps from './data/deps';
import { getSummary } from '../src/evaluationTransformations/getSummary';

describe('getSummary', () => {
  it('creates summary by rootEvaluation without dependencies', () => {
    const rootEvaluation = noDeps;
    expect(getSummary(rootEvaluation)).toEqual([
      {
        items: [ { items: [], name: 'ERROR' }, { items: [], name: 'WARNING' }, { items: [], name: 'INFO' } ],
        name: 'license'
      },
      {
        items: [ { items: [], name: 'ERROR' }, { items: [], name: 'WARNING' }, { items: [], name: 'INFO' } ],
        name: 'version'
      },
      {
        items: [
          { items: [], name: 'ERROR' },
          {
            items: [ { evaluation: 'npm-scores', message: 'Popularity: 18%', path: [ 'repatch' ], type: 'WARNING' } ],
            name: 'WARNING'
          },
          {
            items: [
              { evaluation: 'npm-scores', message: 'Quality: 82%', path: [ 'repatch' ], type: 'INFO' },
              { evaluation: 'npm-scores', message: 'Maintenance: 100%', path: [ 'repatch' ], type: 'INFO' }
            ],
            name: 'INFO'
          }
        ],
        name: 'npm-scores'
      }
    ]);
  });

  it('creates summary by rootEvaluation with dependencies', () => {
    const rootEvaluation = deps;
    expect(getSummary(rootEvaluation)).toEqual([
      {
        items: [ { items: [], name: 'ERROR' }, { items: [], name: 'WARNING' }, { items: [], name: 'INFO' } ],
        name: 'license'
      },
      {
        items: [ { items: [], name: 'ERROR' }, { items: [], name: 'WARNING' }, { items: [], name: 'INFO' } ],
        name: 'version'
      },
      {
        items: [
          { items: [], name: 'ERROR' },
          { items: [], name: 'WARNING' },
          {
            items: [
              { evaluation: 'npm-scores', message: 'Quality: 90%', path: [ 'async' ], type: 'INFO' },
              { evaluation: 'npm-scores', message: 'Popularity: 96%', path: [ 'async' ], type: 'INFO' },
              { evaluation: 'npm-scores', message: 'Maintenance: 67%', path: [ 'async' ], type: 'INFO' },
              { evaluation: 'npm-scores', message: 'Quality: 77%', path: [ 'async', 'lodash' ], type: 'INFO' },
              { evaluation: 'npm-scores', message: 'Popularity: 97%', path: [ 'async', 'lodash' ], type: 'INFO' },
              { evaluation: 'npm-scores', message: 'Maintenance: 100%', path: [ 'async', 'lodash' ], type: 'INFO' }
            ],
            name: 'INFO'
          }
        ],
        name: 'npm-scores'
      }
    ]);
  });
});
