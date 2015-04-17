var AMODULE = (function (){
  var controls = $('.controls');
  var element = "<div class='navigate-home'/>";
  var button;
  var add = function () {
    controls.prepend(element);
    button = $('.navigate-home');
  };
  var activate = function () {
    button.addClass('enabled');
  };
  var deactivate = function () {
    button.removeClass('enabled');
  };
  var check_status = function (event) {
    if (event.indexh > 0) {
      activate();
    } else {
      deactivate();
    }
  };
  var click = function () {
    controls.on('click', '.navigate-home', function () {
      Reveal.slide(0);
    });
  };
  return {
    add: add,
    check_status: check_status,
    click: click
  };
}());
