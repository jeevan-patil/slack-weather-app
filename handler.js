'use strict';
const weather = require('./module/weather');

function close(sessionAttributes, fulfillmentState, message, responseCard) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState,
      message,
      responseCard,
    },
  };
}

module.exports.cityWeather = (event, context, callback) => {
  const city = event.currentIntent.slots.city;

  const details = 'You want weather from ' + city;
  const outputSessionAttributes = event.sessionAttributes || {};

  weather.weatherFromCity(city, function (data) {
    if (data) {
      if (data.cod == '404') {
        callback(null, close(outputSessionAttributes, 'Fulfilled', {
          contentType: 'PlainText',
          content: 'Sorry! Could not gather weather information from the provided city. Please try again!'
        }));
      } else {
        var sky = data.weather[0].main;

        if(sky.indexOf('Clouds') === 0) {
          sky = 'Sky is Cloudy';
        } else if(sky.indexOf('Haze') === 0) {
          sky = 'Sky is Hazy';
        } else if(sky.indexOf('Rain') === 0) {
          sky = 'It is rainy';
        } else {
          sky = 'Sky is ' + sky;
        }

        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const windspeed = data.wind.speed;
        var report = "Weather information from " + city + ". " + sky + ".";
        report = report + " Temperature is " + temp + " degree celcius.";
        report = report + " Humidity is " + humidity + " percent.";
        report = report + " Wind speed is " + windspeed + " meters per second.";
        callback(null, close(outputSessionAttributes, 'Fulfilled', {
          contentType: 'PlainText',
          content: report
        }));
      }
    } else {
      callback(null, close(outputSessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: 'Sorry! Could not recognize the city. Please try again!'
      }));
    }
  });
};

module.exports.greetUser = (event, context, callback) => {
  const outputSessionAttributes = event.sessionAttributes || {};
  callback(null, close(outputSessionAttributes, 'Fulfilled', {
    contentType: 'PlainText',
    content: 'Hello. Ask me to provide weather information from any city.'
  }));
};

