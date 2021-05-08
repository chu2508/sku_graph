import { Graph } from '../Graph';

describe('graph instantiation test', () => {
  test('如果有6个顶点，应该正确设置graph的vertices和quantity', () => {
    const tVertices = [1, 2, 3, 4, 5, 6];
    const graph = new Graph(tVertices);

    expect(graph.vertices).toEqual(tVertices);
    expect(graph.quantity).toEqual(6);
  });

  test('应该正确的设置初始化edges', () => {
    const tVertices = [1, 2, 3, 4, 5, 6];
    const graph = new Graph(tVertices);

    expect(graph.getEdges(1)).toEqual([0, 0, 0, 0, 0, 0]);
  });
});

describe('graph setEdges test', () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph([1, 2, 3, 4, 5, 6]);
  });

  test('应该正确的设置edge与weight', () => {
    const tResult = [0, 1, 1, 1, 0, 0];
    graph.setEdges(1, [2, 3, 4], 1);

    expect(graph.getEdges(1)).toEqual(tResult);
  });

  test('如果多次设置vertex的edge，应该将weight保存为数组', () => {
    const tResult = [0, [2, 4], [2, 4], [2, 4], 0, 0];
    graph.setEdges(1, [2, 3, 4], 2);
    graph.setEdges(1, [2, 3, 4], 4);

    expect(graph.getEdges(1)).toEqual(tResult);
  });

  test('如果设置vertex自身的weight，应该忽略该weight', () => {
    const tResult = [0, [2, 4], [2, 4], [2, 4], 0, 0];
    graph.setEdges(1, [1, 2, 3, 4], 2);
    graph.setEdges(1, [1, 2, 3, 4], 4);

    expect(graph.getEdges(1)).toEqual(tResult);
  });
});

describe('graph operation test', () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph([1, 2, 3, 4, 5, 6]);
    graph.setEdges(1, [2, 3, 4], Graph.SIMILAR);
    graph.setEdges(2, [4, 5, 6], 4);
    graph.setEdges(3, [1, 4, 5, 6], 4);
    graph.setEdges(4, [3, 4, 5, 6], 4);
    graph.setEdges(5, [2, 3, 4], 5);
    graph.setEdges(6, [2, 3, 4], 6);
  });

  test('应该正确获得vertex的intersection数组', () => {
    expect(graph.getIntersection([1, 2])).toEqual([0, 0, 0, 1, 0, 0]);
    expect(graph.getIntersection([2, 3, 4])).toEqual([0, 0, 0, 0, 1, 1]);
    expect(graph.getIntersection([5, 6])).toEqual([0, 0, 0, 0, 0, 0]);
  });

  test('应该正确获得vertex的union数组', () => {
    expect(graph.getUnion([1, 2])).toEqual([0, 1, 1, 1, 1, 1]);
    expect(graph.getUnion([2, 3, 4])).toEqual([1, 0, 1, 1, 1, 1]);
    expect(graph.getUnion([5, 6])).toEqual([0, 1, 1, 1, 0, 0]);
  });
});
