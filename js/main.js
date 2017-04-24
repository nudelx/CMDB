import * as d3 from "d3";
import animatedApp from './animated/app'
import dataProvider from './dataLayer/dataProvider'

// var dataset = {
// nodes: [
//   {Name: "Adam", id:'rrr', '__samanage1__': 'gfgfdgfdhfdhb', test: 'dddddddddddd' ,'samanage2': 'gfgfdgffrfeffdhfdhb', 'samanage3': 'gfgfd657676765865765765gfdhfdhb'},
//   {Name: "Bob", id:'rrr'},
//   {Name: "Carrie", id:'rrr'},
//   ],
// links: [
//   {source: 0, target: 1, type: 'bla'},
//   {source: 0, target: 2, type: 'bla2'},
// ]
// };
// animatedApp.run(dataset)

dataProvider.getData(function (data) {
  // add id field with the same value of Id
  data.result.nodes.forEach( function (node) {
     node.id = node.Id
  })
  // update the links so they will have an index to the relevant node instead of the id
  data.result.links.forEach (function (item ) {
    item.source = data.result.nodes.indexOf((data.result.nodes.find(node => node.Id === item.source)))
    item.target = data.result.nodes.indexOf((data.result.nodes.find(node => node.Id === item.target)))
  })

  animatedApp.run(data.result)
})
