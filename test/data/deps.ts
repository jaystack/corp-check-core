import { NodeEvaluation } from '../../src/types';

export default {
  nodeName: 'async',
  nodeVersion: '2.5.0',
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
      score: 0.842960567450092,
      logs: [
        {
          type: 'INFO',
          message: 'Quality: 90%'
        },
        {
          type: 'INFO',
          message: 'Popularity: 96%'
        },
        {
          type: 'INFO',
          message: 'Maintenance: 67%'
        }
      ]
    }
  ],
  nodeScore: 0.842960567450092,
  dependencies: [
    {
      nodeName: 'lodash',
      nodeVersion: '4.17.4',
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
          score: 0.91390850930879,
          logs: [
            {
              type: 'INFO',
              message: 'Quality: 77%'
            },
            {
              type: 'INFO',
              message: 'Popularity: 97%'
            },
            {
              type: 'INFO',
              message: 'Maintenance: 100%'
            }
          ]
        }
      ],
      nodeScore: 0.91390850930879,
      dependencies: []
    }
  ]
} as NodeEvaluation;
