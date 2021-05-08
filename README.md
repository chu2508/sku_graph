# SKU_Graph

一个使用图数据结构来计算商品规格可选项的项目

# 示例

```ts
// 假设有如下商品规格数据
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
  const skuSpecCombines =  [
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

  // 实例化一个graph
  const graph = new SpecGraph(specList.map(({list}) => (list)), combine);

  // 传入已被选中的规格id
  const options = graph.getSpecOptions([1, 3])
  console.log(options) // [{ id: 2, name: '绿' }, { id: 4, name: '128G' }, { id: 5, name: '套餐一' },]
```