'use strict';

const axios = require('axios')

const endpoint = 'https://oslobysykkel.no/api/v1/stations';
const config = {
  'headers': {
    'Client-Identifier': process.env.API_KEY
  }
}

class Functions {
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

