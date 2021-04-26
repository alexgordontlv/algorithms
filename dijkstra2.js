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
        this.nodes = {}
    }

addEdge(src,dest,weight){
    const edge = new Edge(weight);
    edge.src = src;
    edge.dest = dest;
    this.nodes[src] = [...this.modes[src], edge]
    edge.src = dest;
    edge.dest = src;
    this.nodes[dest] = [...this.modes[dest], edge]
}

printGraph(){
    console.log(this.nodes)
}

}


const myGraph = new Graph(5)
myGraph.addEdge('A','B',2)
myGraph.printGraph()

