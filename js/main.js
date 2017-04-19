import * as d3 from "d3";
import animatedApp from './animated/app'
import dataProvider from './dataLayer/dataProvider'

dataProvider.getData(function (data) {
  data.result.nodes.forEach( function (node) {
     node.id = node.Id
  })
  animatedApp.run(data.result)
})
