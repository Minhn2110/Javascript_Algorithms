/* eslint-disable import/prefer-default-export */
export const arr = [
  {
    id: 1,
    name: 'Parent cb 1',
    value: 'parent1',
    checked: false,
    child: [
      {
        id: 1,
        name: 'Child cb 1',
        value: 'child1',
        checked: false,
      }, {
        id: 2,
        name: 'Child cb 2',
        value: 'child2',
        checked: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Parent cb 2',
    value: 'parent2',
    checked: false,
    child: [
      {
        id: 3,
        name: 'Child cb 1',
        value: 'child3',
        checked: false,
        child: [
          {
            id: 1,
            name: 'sub child 1',
            value: 'subchild1',
            checked: false,
          }, {
            id: 2,
            name: 'sub child 2',
            value: 'subchild2',
            checked: false,
          },
        ],
      }, {
        id: 4,
        name: 'Child cb 2',
        value: 'child4',
        checked: false,
        child: [
          {
            id: 3,
            name: 'sub child 1',
            value: 'subchild3',
            checked: false,
          }, {
            id: 4,
            name: 'sub child 2',
            value: 'subchild4',
            checked: false,
          },
        ],
      },
    ],
  },
];
