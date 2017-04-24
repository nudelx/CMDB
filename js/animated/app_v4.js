import * as d3 from "d3";
//import * as tip from "d3-tip";
import images from '../dataLayer/images'

const animatedApp = {

  init: function (data) {

    const svg = d3.select("svg")
    svg.attr('width', window.innerWidth)
    svg.attr('height', window.innerHeight)
    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }).strength(1)
        .distance(300))
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
       imageOffsetX: -8,
       imageOffsetY: -8,
       titleOffsetY: 6

    }
    this.drawNodes()
  },

  drawNodes: function () {
    let self = this

    // var tip = tip.tip()
    //   .attr('class', 'd3-tip')
    //   .offset([-10, 0])
    //   .html(function(d) {
    //     return "<strong>Name:</strong> <span style='color:red'>" + d.Name + "</span>";
    //   });

    //self.internal.svg.call(tip);

    // var link = self.internal.svg.selectAll(".link")
    //   .data(self.internal.data.links)
    //   .enter().append("g")
    //   .attr("class", "links");
    //
    // link.append("line")
    // //.attr("class", "links")
    // .attr("x1", function(d) { return d.source.x; })
    // .attr("y1", function(d) { return d.source.y; })
    // .attr("x2", function(d) { return d.target.x; })
    // .attr("y2", function(d) { return d.target.y; })
    // .attr("stroke-width", function(d) { return 2 });
    //
    // link.append("text")
    //   // .attr("dx", function(d) {
    //   //   console.log(d)
    //   //   return d.target.x - d.source.x; })
    //   // .attr("dy", function(d) { return d.target.y - d.source.y; })
    //   .text(function(d) { return d.type });

    var link = self.internal.svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(self.internal.data.links)
      .enter().append("line")
      .attr("stroke-width", function(d) { return 2 });

    //link.append("text")
      // .attr("dx", function(d) {
      //   console.log(d)
      //   console.log(d.target.x, d.source.x)
      //   return d.target.x - d.source.x; })
      // .attr("dy", function(d) { return d.target.y - d.source.y; })
      //.text(function(d) { return d.type });

    // var text = self.internal.svg.append("g")
    //   .attr("class", "links")
    //   .selectAll("line")
    //   .data(self.internal.data.links)
    //   .enter().append("line")
    //   .attr("stroke-width", function(d) { return 2 });

    var node = self.internal.svg.selectAll(".node")
      .data(self.internal.data.nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(d3.drag()
              .on("start", self.dragstarted)
              .on("drag",self.dragged)
              .on("end", self.dragended));

      // node.on('mouseover', tip.show)
      //   .on('mouseout', tip.hide);
      // node.on('mouseover', function(d) {
      //   console.log(d)
      //   d3.select(this).append("text")
      //   .text(function(d) {return d.SamanageAgent__RecordType__c;})
      // });

      node.append("image")
        .attr("xlink:href", images.computer)
        .attr("x", self.internal.imageOffsetX)
        .attr("y", self.internal.imageOffsetY)
        .attr("width", self.internal.imageWidth)
        .attr("height", self.internal.imageHeight);

      node.append("text")
        .attr("dx", function (d) { return (self.internal.imageWidth/2)-(d.Name.length/2)*6.5})
        .attr("dy", self.internal.imageHeight + self.internal.titleOffsetY)
        .text(function(d) { return d.Name });

      self.internal.simulation
          .nodes(self.internal.data.nodes)
          .on("tick", ticked);

      self.internal.simulation.force("link")
          .links(self.internal.data.links);

      function ticked() {

        link
            .attr("x1", function(d) { return d.source.x+24; })
            .attr("y1", function(d) { return d.source.y+24; })
            .attr("x2", function(d) { return d.target.x+24; })
            .attr("y2", function(d) { return d.target.y+24; });
            //.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        node
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      }
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
    if (!d3.event.active) animatedApp.internal.simulation.alphaTarget(0.1);
    d.fx = null;
    d.fy = null;
  },

  run: function (data) {
    console.log(data)
    this.init(data)
  }
}

export default animatedApp
