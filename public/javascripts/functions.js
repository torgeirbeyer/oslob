'use strict';

const axios = require('axios')

const endpoint = 'https://oslobysykkel.no/api/v1/stations';
const config = {
  'headers': {
    'Client-Identifier': '66949ff070169324775777b287511e7e'
  }
}

class Functions{
  constructor(){}
  
  getStations() {
    axios.get(url, config)
    .then(response => {
      const stations = response.data.stations;
      return stations;
    })
  }

  getAvailiable() {
    axios.get(url + '/availiabilty', config)
      .then(response => {
        const availiable = response.data.stations
        return availiable;
      })
  }
}

module.exports = {functions: Functions}

