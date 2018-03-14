const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = {
  'headers': {
    'Client-Identifier': process.env.API_KEY
  }
}
const url = 'https://oslobysykkel.no/api/v1/stations'
const url2 = 'https://oslobysykkel.no/api/v1/stations/availability'

/* GET home page. */
router.get('/', function(req, res, next) {
  let stations;
  let available;
  let dict = [];
  axios.all([
    axios.get(url, config),
    axios.get(url2, config)
  ]).then(axios.spread((stations, available) => {
    stations = stations.data.stations;
    stations.sort((a,b) => {
      return a.id - b.id
    })
    available = available.data.stations;
    available.sort((a,b) => {
      return a.id - b.id
    })

    const data = stations.reduce(function(result, station) {
      const f = available.find(el => station.id == el.id)
      result.push({
              name: station.title,
              where: station.subtitle,
              locks: f.availability.locks,
              bikes: f.availability.bikes
      })
      return result;
    }, [])

    res.render('index', {
      data
    })
  })).catch(err => {
    console.log(err)
  })
})



module.exports = router;
