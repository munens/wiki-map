$(document).ready(function() {
  $('#sign-up-button').on("click", function() {
    $(".sign-up").toggle("slow");
    $( ".username" ).focus();
  });
});

