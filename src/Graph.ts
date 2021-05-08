export type Vertex = number | string;
export type Vertices = Vertex[];
export type UnlinkWeight = 0;
export type SimilarWeight = 1;
export type Edge = UnlinkWeight | SimilarWeight | number[];

export class Graph {
  public static UNLINK: UnlinkWeight = 0;
  public static SIMILAR: SimilarWeight = 1;

  public getUnionVertices(vertices: Vertices) {
    return this._mapToVertex(this.getUnion(vertices));
  }

  public getIntersectionVertices(vertices: Vertices) {
    return this._mapToVertex(this.getIntersection(vertices));
  }
  /**
   * 获取所选顶点的并集数组
   * @param vertices 顶点数组
   * @returns 表示是否邻接的数组 1为邻接 0为不邻接
   */
  public getUnion(vertices: Vertices): number[] {
    return this._getOperationSet(vertices, (flagList) =>
      flagList.some((v) => v !== 0)
    );
  }
  /**
   * 获取所选顶点的交集数组
   * @param vertices 顶点数组
   * @returns 表示是否邻接的数组 1为邻接 0为不邻接
   */
  public getIntersection(vertices: Vertices): number[] {
    return this._getOperationSet(vertices, (flagList) => {
      let flag: boolean;
      if (flagList.includes(0)) {
        flag = false;
      } else if (flagList.includes(1)) {
        flag = true;
      } else {
        flag = flagList.every((v, _, arr) => v === arr[0]);
      }
      return flag;
    });
  }

  public setEdges(
    vertex: number,
    vertices: number[],
    weight: UnlinkWeight | SimilarWeight | number
  ) {
    const vertexIdx = this.vertices.indexOf(vertex);
    if (vertexIdx === -1) return;
    vertices.forEach((ver) => {
      const idx = this.vertices.indexOf(ver);
      if (idx === -1 || idx === vertexIdx) return;
      if (weight === Graph.UNLINK || weight === Graph.SIMILAR) {
        this._edges[vertexIdx][idx] = weight;
      } else {
        const old = this._edges[vertexIdx][idx];
        if (!Array.isArray(old)) {
          this._edges[vertexIdx][idx] = [weight];
        } else {
          old.push(weight);
        }
      }
    });
  }

  public getEdges(vertex: Vertex): Edge[] {
    const idx = this.vertices.indexOf(vertex);

    if (idx === -1) return [];
    return this._edges[idx];
  }
  public readonly vertices: Vertices;
  public readonly quantity: number;
  private _edges: Edge[][];

  constructor(vertices: Vertices) {
    this.vertices = vertices;
    this.quantity = vertices.length;
    Object.freeze(this.vertices);
    this._init();
  }

  private _mapToVertex(array: number[]) {
    return array
      .map((val, i) => (val === 1 ? this.vertices[i] : ''))
      .filter(Boolean);
  }

  private _getOperationSet(
    vertices: Vertices,
    judgment: (weights: number[]) => boolean
  ) {
    const edgesList = vertices.map((vertex) => this.getEdges(vertex));
    const result: number[] = [];
    for (let index = 0; index < this.quantity; index++) {
      const flagList = edgesList
        .map((edges) => edges[index])
        .reduce((res: number[], cur) => {
          if (Array.isArray(cur)) {
            return res.concat(cur);
          } else {
            res.push(cur);
            return res;
          }
        }, []) as number[];
      const flag = judgment(flagList);
      result[index] = flag ? 1 : 0;
    }
    return result;
  }

  private _init() {
    this._edges = Array.from({ length: this.quantity })
      .fill(0)
      .map(() => Array.from<Edge>({ length: this.quantity }).fill(0));
  }
}
