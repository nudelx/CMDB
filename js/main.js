import * as d3 from "d3";
import animatedApp from './animated/app'
import dataProvider from './dataLayer/dataProvider'


dataProvider.getData(function () {console.log(arguments)})
const data = dataProvider.getData()
animatedApp.run(data)
