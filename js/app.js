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
    var countryUrl = "https://restcountries.eu/rest/v2/name/" + country;
    $(this).css({fill:'red'})
    $('.land').not($(this)).css({fill:"#CCCCCC"});
    $('.popup').fadeIn(350);

    function insertCountry(country) {
      $('.one-country').remove();
      var paragraph = $('<p>', {class: 'one-country'}).text(country.name);
      div.prepend(paragraph);
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
    $('.popup').fadeIn(350);

    function insertCountry(country) {
      $('.one-country').remove();
      var paragraph = $('<p>', {class: 'one-country'}).text(country.name);
      div.prepend(paragraph);
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
