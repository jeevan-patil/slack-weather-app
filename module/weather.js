var Client = require('node-rest-client').Client;
var client = new Client();

const API_KEY = "appid=****";
const UNIT_SYSTEM = "units=metric";
const ENDPOINT = "http://api.openweathermap.org/data/2.5/weather?";

var Weather = {
  weatherFromCity: function(city, callback) {
    const apiUrl = buildApiUrl() + 'q=' + city;
    client.get(apiUrl, function (data, response) {
      callback(data);
    });
  }
};

var buildApiUrl = function() {
  return ENDPOINT + API_KEY + "&" + UNIT_SYSTEM + "&";
};

module.exports = Weather;