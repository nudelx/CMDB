import * as d3 from "d3";
import images from '../dataLayer/images'

var nameSpace = "SamanageCMDB__"
//var nameSpace = "SamanageAgent__"

const animatedApp = {

  init: function (dataset) {
    var popUpOffsetTop = 0,
        popUpOffsetLeft = 0;

    // In iframe (SF env) we have toolbars that add offsets
    if (window.sforce) {
      popUpOffsetTop = 112
      popUpOffsetLeft = 240
    }
    popUpOffsetLeft += 60

    var h = Math.max(
      document.body.scrollHeight,
      document.body.clientHeight,
      document.body.offsetHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight);

    var w = Math.max(
      document.body.scrollWidth,
      document.body.clientWidth,
      document.body.offsetWidth,
      document.documentElement.scrollWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth);

    var linkDistance = 200;

    var svg = d3.select("svg").attr({"width": w,"height": h});

    var force = d3.layout.force()
        .nodes(dataset.nodes)
        .links(dataset.links)
        .size([w,h])
        .linkDistance([linkDistance])
        .charge([-360])
        .theta(0.1)
        .gravity(0.03)
        .start();

    this.internal = {
       svg,
       force,
       dataset,
       imageWidth: 48,
       imageHeight: 48,
       imageOffsetX: -8,
       imageOffsetY: -8,
       titleOffsetY: 6,
       popUpOffsetTop,
       popUpOffsetLeft
    }

    this.drawGraph()
  },
  drawGraph: function () {
    var self = this

    var edges = self.internal.svg.selectAll("line")
      .data(self.internal.dataset.links)
      .enter()
      .append("line")
      .attr("id", function(d, i) { return 'edge' + i })
      .attr('marker-end','url(#arrowhead)')
      .style("stroke","#ccc")
      .style("pointer-events", "none");

    var nodes = self.internal.svg.selectAll(".node")
      .data(self.internal.dataset.nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .on('mouseenter', function (d) {
        var tip = d3.select("body")
        .append("div")
        .attr('class', 'tipPopup')
        .style("position", "absolute")
        .style("z-index", "10")
        .style("top", d.y + self.internal.popUpOffsetTop + "px")
        .style("left", d.x + self.internal.popUpOffsetLeft + "px")
        .html(self.buildToolTip(d));
        d.tip = tip
      })
      .on('mouseleave', function (d) {
        d.tip.remove()
      })
      .call(self.internal.force.drag);

    nodes.append("image")
      .attr("xlink:href", function (d) {
        var recordType = d[nameSpace + "RecordType__c"] || 'default';
        return images[recordType.toLowerCase().replace(' ', '_')] || images.default
      })
      .attr("x", self.internal.imageOffsetX)
      .attr("y", self.internal.imageOffsetY)
      .attr("width", self.internal.imageWidth)
      .attr("height", self.internal.imageHeight);

    nodes.append("text")
      .attr("dx", function (d) {
        return (self.internal.imageWidth / 2) - (d.Name.length / 2) * 6.5
      })
      .attr("dy", self.internal.imageHeight + self.internal.titleOffsetY)
      .text(function(d) { return d.Name });

    var edgepaths = self.internal.svg.selectAll(".edgepath")
        .data(self.internal.dataset.links)
        .enter()
        .append('path')
        .attr({ 'd': function(d) {
              return 'M '+ d.source.x + ' ' + d.source.y
                  + ' L ' + d.target.x + ' ' +d.target.y
            },
            'class':'edgepath',
            'fill-opacity':0,
            'stroke-opacity':0,
            'fill':'blue',
            'stroke':'red',
            'id': function(d, i) { return 'edgepath' + i }})
        .style("pointer-events", "none");

    var edgelabels = self.internal.svg.selectAll(".edgelabel")
        .data(self.internal.dataset.links)
        .enter()
        .append('text')
        .style("pointer-events", "none")
        .attr({'class':'edgelabel',
               'id': function(d, i) { return 'edgelabel' + i },
               'dx':80,
               'dy':0,
               'font-size':13,
               'fill':'#aaa'});

    edgelabels.append('textPath')
        .attr('xlink:href', function(d, i) { return '#edgepath' + i })
        .style("pointer-events", "none")
        .text(function(d, i){ return d.type });

    self.internal.svg.append('defs').append('marker')
        .attr({'id':'arrowhead',
               'viewBox':'-0 -5 10 10',
               'refX':25,
               'refY':0,
               //'markerUnits':'strokeWidth',
               'orient':'auto',
               'markerWidth':10,
               'markerHeight':10,
               'xoverflow':'visible'});


    self.internal.force.on("tick", function() {
        edges.attr({ "x1": function(d) { return d.source.x; },
                     "y1": function(d) { return d.source.y; },
                     "x2": function(d) { return d.target.x; },
                     "y2": function(d) { return d.target.y; }
        });

        nodes.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

        edgepaths.attr('d', function(d) {
          var path='M '+ d.source.x +' '+ d.source.y +' L '+ d.target.x +' '+ d.target.y;
          return path
        });

    });
  },
  run: function (data) {
    console.log('run', data)
    this.init(data)
  },
  buildToolTip: function (d) {
    const blackList = ['ModelsHash', 'HardwareID', 'ObjectHash']

    return '<ul class="tool-tip-hover">'+
      Object.keys(d).map(function (field) {
        const fieldName = field.split('__')[1] || ''
        if (field.toLowerCase().indexOf('samanage') !== -1 && !blackList.includes(fieldName)) {
          return '<li><span class="key">'+fieldName.trim()+':</span><span class="value">'+d[field].toString().trim()+'</span></li>'
        }
      }).join('')
    + '</ul>'
  }
}

export default animatedApp
