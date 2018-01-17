document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  var div = $("#selectedCountry");
  $('.land').click(function() {
    var country = $(this).attr('title');
    var countryUrl = "https://restcountries.eu/rest/v2/name/" + country;
    $(this).css({fill:'red'})
    $('.land').not($(this)).css({fill:"#CCCCCC"});
    if (div.children().length > 0) {
      div.empty();
    }

    function insertCountry(country) {
      var paragraph = $('<p>').text(country.name);
      div.append(paragraph);
    }

    function loadDays() {
      $.ajax({url: countryUrl}).done(function(response) {
        console.log(response[0]);
        insertCountry(response[0]);
      }).fail(function(error) {
        console.log(error);
      })
    }
    loadDays();
  });

  $('form').submit(function(event) {
    event.preventDefault();
  });

  $("#hit").click(function(event) {
    event.preventDefault();
    var state = $('#country').val();
    var stateUrl = "https://restcountries.eu/rest/v2/name/" + state;
    if (div.children().length > 0) {
      div.empty();
    }

    function insertCountry(country) {
      var paragraph = $('<p>').text(country.name);
      div.append(paragraph);
      var country = $("#" + country.alpha2Code).selector;
      $(country).css({fill:'red'})
      $('.land').not($(country)).css({fill:"#CCCCCC"});
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
  })

});
