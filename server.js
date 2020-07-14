/* eslint-disable no-undef */
'use strict';
// Art by Hayley Jane Wakenshaw

//     __
// ___( o)>   <Rubber duck says: Settup the dependencies and call your EVN file for the port
// \ <_. )
//  `---'   hjw

const express = require('express');

const app = express();

require('dotenv').config();

const cors = require('cors');
// const { request, response } = require('express'); Chase said we might not need this but its one everyones code.

app.use(cors());

const PORT = process.env.PORT || 3001;

// Art by Hayley Jane Wakenshaw

//     __
// ___( o)>   <Rubber duck says: the path just for the location.
// \ <_. )
//  `---'   hjw

app.get('/location', (request, response) => {

  try{
    let city = request.query.city;
    let geoData = require('./data/location.json');

    const obj = new Location(city, geoData);
    response.status(200).send(obj);
  } catch(error){
    console.log('ERROR', error);
    response.status(500).send('Sorry, something went wrong with your city');

    // Art by Hayley Jane Wakenshaw

//     __
// ___( o)>   <Rubber duck says: We wont get this is the location is outside the scope of the json data
// \ <_. )
//  `---'   hjw

  }
});

function Location(city, geoData){

  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

//     __
// ___( o)>   <Rubber duck says: This is for the weather, and its associated by the city data: no data
// \ <_. )    in JSON nothing to display and an error.
//  `---'   hjw

app.get('/weather', (request, response) => {

  let weatherData = require('./data/weather.json');
  let info = [];

  weatherData['data'].forEach(date => {
    info.push(new Weather(date));
  });

  response.status(200).send(info);

});

function Weather(obj) {
  this.forecast = obj.weather.description;
  this.time = obj.datetime;
}

//==============================Errors=================================

app.get('*', (request, response) => {
  response.status(500).send('Sorry, we have an internal server error');
  //     __
// ___( o)>   <Rubber duck says: This wont work on firefox, and thus it might be working and not show up
// \ <_. )     unless we use google chrome as a browser
//  `---'   hjw
});

// ====================================================================
// Turn on Server and Confirm Port

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
//     __
// ___( o)>   <Rubber duck says: this sets up the listener on the port AND we can see it in the terminal real time.
// \ <_. )
//  `---'   hjw
