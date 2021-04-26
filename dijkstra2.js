class Edge{
    constructor(weight){
        this.weight = weight;
        this.src = null;
        this.dest = null;
    }
}

class Graph{
    constructor(numOfNodes){
        this.vertex = numOfNodes;
        this.nodes = new Map()
    }

addEdge(src,dest,weight){
    const edge = new Edge(weight);
    edge.src = src;
    edge.dest = dest;
    this.nodes.get(src) = [...this.nodes[src], edge]
    edge.src = dest;
    edge.dest = src;
    this.nodes[dest] = [...this.nodes[dest], edge]
}

printGraph(){
    console.log(this.nodes)
}

}


const myGraph = new Graph(5)
myGraph.addEdge('A','B',2)
myGraph.printGraph()

