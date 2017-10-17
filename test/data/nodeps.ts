import { NodeEvaluation } from '../../src/types';

export default {
  nodeName: 'repatch',
  nodeVersion: '1.3.11',
  evaluations: [
    {
      name: 'license',
      description: '',
      score: 1,
      logs: []
    },
    {
      name: 'version',
      description: '',
      score: 1,
      logs: []
    },
    {
      name: 'npm-scores',
      description: '',
      score: 0.668890964541274,
      logs: [
        {
          type: 'INFO',
          message: 'Quality: 82%'
        },
        {
          type: 'WARNING',
          message: 'Popularity: 18%'
        },
        {
          type: 'INFO',
          message: 'Maintenance: 100%'
        }
      ]
    }
  ],
  nodeScore: 0.668890964541274,
  dependencies: []
} as NodeEvaluation;
