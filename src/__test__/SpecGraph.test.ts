import { SpecGraph } from '../SpecGraph';

describe('spec graph test', () => {
  let graph: SpecGraph;
  const specList = [
    {
      id: 1,
      name: 'Color',
      list: [
        { id: 1, name: '红' },
        { id: 2, name: '绿' },
      ],
    },
    {
      id: 2,
      name: 'Size',
      list: [
        { id: 3, name: '32G' },
        { id: 4, name: '128G' },
      ],
    },
    {
      id: 3,
      name: 'Model',
      list: [
        { id: 5, name: '套餐一' },
        { id: 6, name: '套餐二' },
      ],
    },
  ];
  const combine = [
    [
      { id: 1, name: '红' },
      { id: 3, name: '32G' },
      { id: 5, name: '套餐一' },
    ],
    [
      { id: 1, name: '红' },
      { id: 4, name: '128G' },
      { id: 6, name: '套餐二' },
    ],
    [
      { id: 2, name: '绿' },
      { id: 3, name: '32G' },
      { id: 6, name: '套餐二' },
    ],
  ];
  beforeEach(() => {
    graph = new SpecGraph(specList, combine);
  });

  test('usecase test', () => {
    const result = graph.getSpecOptions([1, 3]);

    expect(result).toEqual([
      { id: 2, name: '绿' },
      { id: 4, name: '128G' },
      { id: 5, name: '套餐一' },
    ]);
  });
  test('未选择任何spec状态下应该返回所有可选项', () => {
    const result = graph.getSpecOptions([]);

    expect(result).toEqual([
      { id: 1, name: '红' },
      { id: 2, name: '绿' },
      { id: 3, name: '32G' },
      { id: 4, name: '128G' },
      { id: 5, name: '套餐一' },
      { id: 6, name: '套餐二' },
    ]);
  });
});
