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
router.get('/', (req, res, next) => {
  let stations;
  let available;
  let result;
  axios.all([
    axios.get(url, config),
    axios.get(url2, config)
  ]).then(axios.spread((stations, available) => {
    stations = stations.data.stations;
    available = available.data.stations;
    const data = stations.reduce((result, station) => {
      const status = available.find(el => station.id == el.id)
      result.push({
        name: station.title,
        where: station.subtitle,
        locks: status.availability.locks,
        bikes: status.availability.bikes,
        lat: station.center.latitude,
        long: station.center.longitude
      })
      return result;
    }, [])
    // console.log(data)
    res.render('index', {
      data
    })
  })).catch(err => {
    console.log(err)
  })
})



module.exports = router;
