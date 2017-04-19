
const dataProvider = {
  getData: function (cb) {
    debugger
    if ( window.getCmdbData ) {
      window.getCmdbData(cb)
    } else {
      return {}
    }
  }
}

export default dataProvider
