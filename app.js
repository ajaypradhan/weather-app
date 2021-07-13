const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.post('/', function (req, res) {
    const query = req.body.cityName;
    const apiKey = '533ea3e82b4e25a188ad3eff4ba63875';
    const units = 'metric';
    const url =
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        query +
        '&appid=' +
        apiKey +
        '&units=' +
        units;

    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on('data', function (data) {
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const iconID = weatherData.weather[0].icon;
            const imgUrl =
                'http://openweathermap.org/img/wn/' + iconID + '@2x.png';
            // console.log(weatherDescription);
            res.write(
                '<p>The current weather in ' +
                    query +
                    ' is ' +
                    weatherDescription +
                    '</p>'
            );
            res.write(
                '<h1>The temperature in ' +
                    query +
                    ' is : ' +
                    weatherData.main.temp +
                    '° Celsius</h1>'
            );
            res.write('<img src =' + imgUrl + '>');
            res.send();
        });
    });
});


app.listen(3000, function () {
    console.log('server is running on port 3000');
});
