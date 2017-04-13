import * as d3 from "d3";
import images from '../dataLayer/images'

const animatedApp = {

  init: function (data) {

    const svg = d3.select("svg")
    svg.attr('width', window.innerWidth)
    svg.attr('height', window.innerHeight)
    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }).strength(1)
        .distance(200))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(svg.attr("width") / 2, svg.attr("height") / 2));
       //  .force("center", d3.forceCenter(svg.attr("width") / 2, svg.attr("height") / 2));
    // console.log(d3.forceCenter(svg.attr("width") / 2, svg.attr("height") / 2))

    this.internal = {
       svg,
       width: svg.attr("width"),
       height: svg.attr("height"),
       color:  d3.scaleOrdinal(d3.schemeCategory20),
       simulation,
       data,
       imageWidth: 48,
       imageHeight: 48,
       titleOffsetY: 6

    }
    this.drawNodes()
  },

  drawNodes: function () {

    let self = this

    d3.json("data.json", function(error, graph) {
      if (error) throw error;
      var title = 'this is a text for example'
      console.log(title.length)
      var link = self.internal.svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", function(d) { return 2 });

      // var node = self.internal.svg.selectAll("g.node")
      //   .data(graph.nodes)
      //   .enter()
      var node = self.internal.svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
                .on("start", self.dragstarted)
                .on("drag",self.dragged)
                .on("end", self.dragended));

        node.append("image")
          .attr("xlink:href", images.computer)
          .attr("x", -8)
          .attr("y", -8)
          .attr("width", self.internal.imageWidth)
          .attr("height", self.internal.imageHeight);

        node.append("text")
          .attr("dx", ((self.internal.imageWidth/2)-(title.length/2)*6.5))
          .attr("dy", self.internal.imageHeight + self.internal.titleOffsetY)
          .text(function(d) { return title });

        self.internal.simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

      // var nodes = self.internal.svg.append("g")
      //   .attr("class", "nodes")
      //   .selectAll("g");
      //
      // var nodeHolder = node.selectAll("g.node")
      //   .data(graph.nodes)
      //   .enter()
      //   .append()
      //   .append("circle")
      //   .attr("r", 20)
      //   .attr("fill", function(d) { return self.internal.color(d.group); })
      //   .call(d3.drag()
      //         .on("start", self.dragstarted)
      //         .on("drag",self.dragged)
      //         .on("end", self.dragended));

      // node.append("title")
      //     .text(function(d) { return d.id; });
      //
      // node.append("text")
      //     .text('testststs');

      self.internal.simulation.force("link")
          .links(graph.links);

      function ticked() {
        link
            .attr("x1", function(d) { return d.source.x+24; })
            .attr("y1", function(d) { return d.source.y+24; })
            .attr("x2", function(d) { return d.target.x+24; })
            .attr("y2", function(d) { return d.target.y+24; });

        node
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

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
    this.init(data)
  }
}

export default animatedApp
