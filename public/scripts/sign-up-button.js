$(document).ready(function() {
  $(".sign-up").hide();
  $('#sign-up-button').on("click", function() {
    $(".sign-up").toggle("slow");
    $( ".username" ).focus();
  });
});

