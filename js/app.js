document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");


  var div = $(".popup-show");
  $('.popup-close').on('click', function(e)  {
    e.preventDefault();
    $('.popup').fadeOut(350);
  });

  $('.land').click(function(e) {
    e.preventDefault();
    var country = $(this).attr('title');
    console.log(country);
    if (country == 'United States') {
      country = 'USA';
    }
    console.log(country);
    var countryUrl = "https://restcountries.eu/rest/v2/name/" + country;
    var countryId  = $(this).attr('id');
    $('.land').not($(this)).css({fill:"#CCCCCC"});
    $('.popup').fadeIn(350);

    function insertCountry(country) {
      $('.one-country').remove();
      var oneCountry = $('<div>', {class: 'one-country'});
      var name = $('<h1>').text(country.name);
      var capital = $('<h2>Capital city: <span>'+ country.capital + '</span></h2>')
      var flag = $('<img>', {src:country.flag});
      name.prepend(flag);
      var region = $('<p>Region: <span>'+country.subregion+'</span></p>')
      var area = $('<p>Area: <span>'+country.area +' km2</span></p>')
      var nativName = $('<p>Native country name: <span>'+country.nativeName+'</span></p>')
      var population = $('<p>Population: <span>'+(country.population.toLocaleString())+'</span></p>')
      div.append(oneCountry);
      oneCountry.append(name,capital,region,nativName,population,area);

      function insertWeather(city) {
        $('.one-weather').remove();
        var oneWeather = $('<div>', {class: 'one-weather'});
        var capital = $('<h2>Actual conditions in <span>'+city.name+'</span></h2>');
        var icon = $('<img>', {src: 'http://openweathermap.org/img/w/'+city.weather[0].icon+'.png'});
        var description = $('<span>'+city.weather[0].description+'</span>')
        var iconP = $('<p>',{class: 'iconP'}).append(icon,description);
        var claudiness = $('<p>Claudiness: <span>'+city.clouds.all+'%</span></p>')
        var temp = $('<p>Temperature: <span>'+city.main.temp+' &deg; C</span></p>');
        var pressure = $('<p>Pressure: <span>'+city.main.pressure+' hPa</span></p>');
        var humidity = $('<p>Humidity: <span>'+city.main.humidity+'%</span></p>');
        var DirTable = ["N","NNE","NE","ENE","E","ESE", "SE","SSE","S","SSW","SW","WSW", "W","WNW","NW","NNW","N"];
        windDirection= DirTable[Math.floor((Number(city.wind.deg)+11.25)/22.5)];
        var wind = $('<p>Wind: <span>speed: </span>'+city.wind.speed+' m/s <span>direction: </span>'+ windDirection+'</p>');
        div.append(oneWeather);
        oneWeather.append(capital,iconP,claudiness,temp,pressure, humidity,wind);
      }

      var capitalUrl = "http://api.openweathermap.org/data/2.5/weather?q="+country.capital+","+country.aplha2Code+"&units=metric"+"&APPID=bd5e378503939ddaee76f12ad7a97608";
      function loadWeather() {
        $.ajax({url: capitalUrl}).done(function(response){
          console.log(response);
          insertWeather(response)
        }).fail(function(error){
          console.log(error);
        })
      }
      loadWeather();
    }

    function loadCountry() {
      $.ajax({url: countryUrl}).done(function(response) {
        console.log(response[0]);
        insertCountry(response[0]);
      }).fail(function(error) {
        console.log(error);
      })
    }
    loadCountry();
  });

  $('form').submit(function(event) {
    event.preventDefault();
  });

  $("#hit").click(function(event) {
    event.preventDefault();
    var state = $('#country').val();
    var stateUrl = "https://restcountries.eu/rest/v2/name/" + state;
    $('.popup').fadeIn(350);

    function insertCountry(country) {

      $('.one-country').remove();
      var oneCountry = $('<div>', {class: 'one-country'});
      var name = $('<h1>').text(country.name);
      var capital = $('<h2>Capital city: <span>'+ country.capital + '</span></h2>')
      var flag = $('<img>', {src:country.flag});
      name.prepend(flag);
      var region = $('<p>Region: <span>'+country.subregion+'</span></p>')
      var area = $('<p>Area: <span>'+country.area +' km2</span></p>')
      var nativName = $('<p>Native country name: <span>'+country.nativeName+'</span></p>')
      var population = $('<p>Population: <span>'+(country.population.toLocaleString())+'</span></p>')
      div.append(oneCountry);
      oneCountry.append(name,capital,region,nativName,population,area);

      var selected = country.alpha2Code;
      $('#'+selected).css({fill:'red'})
      $('.land').not($('#'+selected)).css({fill:"#CCCCCC"});

      function insertWeather(city) {
        $('.one-weather').remove();
        var oneWeather = $('<div>', {class: 'one-weather'});
        var capital = $('<h2>Actual conditions in <span>'+city.name+'</span></h2>');
        var icon = $('<img>', {src: 'http://openweathermap.org/img/w/'+city.weather[0].icon+'.png'});
        var description = $('<span>'+city.weather[0].description+'</span>')
        var iconP = $('<p>',{class: 'iconP'}).append(icon,description);
        var claudiness = $('<p>Claudiness: <span>'+city.clouds.all+'%</span></p>')
        var temp = $('<p>Temperature: <span>'+city.main.temp+' &deg; C</span></p>');
        var pressure = $('<p>Pressure: <span>'+city.main.pressure+' hPa</span></p>');
        var humidity = $('<p>Humidity: <span>'+city.main.humidity+'%</span></p>');
        var DirTable = ["N","NNE","NE","ENE","E","ESE", "SE","SSE","S","SSW","SW","WSW", "W","WNW","NW","NNW","N"];
        windDirection= DirTable[Math.floor((Number(city.wind.deg)+11.25)/22.5)];
        var wind = $('<p>Wind: <span>speed: </span>'+city.wind.speed+' m/s <span>direction: </span>'+ windDirection+'</p>');
        div.append(oneWeather);
        oneWeather.append(capital,iconP,claudiness,temp,pressure, humidity,wind);
      }

      var capitalUrl = "http://api.openweathermap.org/data/2.5/weather?q="+country.capital+","+country.aplha2Code+"&units=metric"+"&APPID=bd5e378503939ddaee76f12ad7a97608";
      function loadWeather() {
        $.ajax({url: capitalUrl}).done(function(response){
          console.log(response);
          insertWeather(response)
        }).fail(function(error){
          console.log(error);
        })
      }
      loadWeather();
    }

    function loadDays() {
      $.ajax({url: stateUrl}).done(function(response) {
        console.log(response[0]);
        insertCountry(response[0]);
      }).fail(function(error) {
        console.log(error);
      })
    }

    loadDays();
  });
  // zooming
  var svgElement = document.querySelector('svg');
  var panZoomMap = svgPanZoom(svgElement);
  panZoomMap.fit();
});
