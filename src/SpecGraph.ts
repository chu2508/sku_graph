import { Graph, Vertex } from "./Graph";
export interface Spec {
  id: Vertex;
}

export type SpecList = Spec[][]

export class SpecGraph {
  /**
   * 根据已选的spec计算出还有那些spec是可以被选中的
   * @param selectedVertices 已经选择的spec的id数组
   * @returns 还可选择的spec数组
   */
  public getSpecOptions(selectedVertices: number[]): Spec[] {
    if (selectedVertices.length > 0) {
      return this._graph
        .getIntersectionVertices(selectedVertices)
        .map((id) => this._specs.find((spec) => spec.id === id))
        .filter((item) => item) as Spec[];
    } else {
      return this._graph
        .getUnionVertices(this._graph.vertices)
        .map((id) => this._specs.find((spec) => spec.id === id))
        .filter((item) => item) as Spec[];
    }
  }
  private _graph: Graph;
  private _specs: Spec[];

  constructor(specSimilarList: SpecList, specCombineList: Spec[][]) {
    const specs = specSimilarList.reduce(
      (result, current) => result.concat(current),
      [] as Spec[]
    );

    this._graph = new Graph(specs.map((spec) => spec.id));

    // 初始化顶点位置
    this._initSpecCombineAdjoinVertex(specCombineList);
    this._initSimilarSpecAdjoinVertex(specSimilarList);

    this._specs = specs;
  }
  // 初始化SKU规格相邻顶点
  private _initSpecCombineAdjoinVertex(specCombines: Spec[][]) {
    const adjoinVertexes = specCombines.map((combine) =>
      combine.map((spec) => spec.id)
    );

    adjoinVertexes.forEach((adjoinVertex, index) =>
      this._applySetAdjoin(adjoinVertex, index + 2)
    );
  }

  // 初始化同类规格顶点
  private _initSimilarSpecAdjoinVertex(specList: SpecList) {
    const options = this._graph.getUnionVertices(this._graph.vertices);
    specList.forEach((specs) => {
      const vertexes: Vertex[] = [];
      specs.forEach(({ id }) => {
        if (options.includes(id)) vertexes.push(id);
      });
      this._applySetAdjoin(vertexes, Graph.SIMILAR);
    });
  }
  // 执行相邻顶点设置工作
  private _applySetAdjoin(adjoinVertex: (number | string)[], weight: number): void {
    adjoinVertex.forEach((vertex) => {
      this._graph.setEdges(vertex, adjoinVertex, weight);
    });
  }
}
