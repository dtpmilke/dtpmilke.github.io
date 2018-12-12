$(function() {

	// Custom JS
$('#clock').countdown("2018/12/14", function(event) {
  var totalHours = event.offset.totalDays * 24 + event.offset.hours;
  $(this).html(event.strftime('<div class="item">' + totalHours + '<span>Часов</span></div><div class="divider">:</div><div class="item">%M<span>Минут</span></div><div class="divider">:</div><div class="item">%S<span>Секунд</span></div>'));
});

});