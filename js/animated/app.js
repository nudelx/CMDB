import * as d3 from "d3";

const animatedApp = {

  init: function () {
    // console.log(this)
    const svg = d3.select("svg")
    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }).strength(1)
        .distance(200))
        .force("charge", d3.forceManyBody());
       //  .force("center", d3.forceCenter(width / 2, height / 2));
    // console.log(d3.forceCenter(1000 / 2, 1000 / 2))

    this.internal = {
       svg,
       width: svg.attr("width"),
       height: svg.attr("height"),
       color:  d3.scaleOrdinal(d3.schemeCategory20),
       simulation
    }
    this.drawNodes()
  },

  drawNodes: function () {

    let self = this

    d3.json("data.json", function(error, graph) {
      if (error) throw error;
      // console.log('dddd', self)
      var link = self.internal.svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", function(d) { return 2 });
      //
      var node = self.internal.svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 20)
        .attr("fill", function(d) { return self.internal.color(d.group); })
        .call(d3.drag()
              .on("start", self.dragstarted)
              .on("drag",self.dragged)
              .on("end", self.dragended));

      node.append("title")
          .text(function(d) { return d.id; });

      node.append("text")
          .text('testststs');
      self.internal.simulation
          .nodes(graph.nodes)
          .on("tick", ticked);

      self.internal.simulation.force("link")
          .links(graph.links);
      //
      function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
      }
    });
  },
  dragstarted: (d) => {
    if (!d3.event.active) animatedApp.internal.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  },

  dragged: (d) =>  {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  },

  dragended: (d) => {
    if (!d3.event.active) animatedApp.internal.simulation.alphaTarget(0.3);
    d.fx = null;
    d.fy = null;
  },

  run: function (data) {
    // console.log(this)
    this.init()
    // var svg = d3.select("svg"),
    //     width = +svg.attr("width"),
    //     height = +svg.attr("height");
  }
}

export default animatedApp
