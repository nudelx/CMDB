const defaultData = {
  "nodes": [
    {"id": "AAA", "group": 1},
    {"id": "BBB", "group": 1},
    {"id": "CCC", "group": 1},
    {"id": "DDD", "group": 1},
    {"id": "EEE", "group": 1},
    {"id": "UUU", "group": 1},
    {"id": "GGG", "group": 1},
  ],
  "links": [
    {"source": "AAA", "target": "BBB", "value": 1},
    {"source": "BBB", "target": "CCC", "value": 8},
    {"source": "BBB", "target": "DDD", "value": 10},
    {"source": "EEE", "target": "DDD", "value": 6},
    {"source": "UUU", "target": "GGG", "value": 6},
  ]
}

const dataProvider = {
  getData: function (cb) {
    if ( window.getCmdbData ) {
      window.getCmdbData(cb)
    } else {

    }
  }
}


export default dataProvider
