const l = (what) => document.getElementById(what);
const leadingZero = (n) => (n < 10 ? '0' + n : n);

var slider = l('slider');
var output = l('clock');
var sliderToggle = l('sliderToggle');

slider.step = (1 / 60).toFixed(15);

function handleSlider() {
  var sliderPercent = (slider.value / slider.max) * 100;

  slider.style.background = `linear-gradient(to right, var(--clr-form) ${sliderPercent}%, #ccc ${sliderPercent}%)`

}

function handleClock() {
  var d = new Date();
  if (sliderToggle.checked) {
    var hh = Math.floor(slider.value);
    var mm = Math.floor((slider.value - hh) * 60);
    var ss = Math.floor(((slider.value - hh) * 60 - mm) * 60);

    d.setHours(hh);
    d.setMinutes(mm);
    d.setSeconds(ss);
  } else {
    slider.value = d.getHours() + d.getMinutes() / 60;
  }
  handleSlider()

  var time = d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (output.innerHTML != time) output.innerHTML = time;

  requestAnimationFrame(handleClock);
}

requestAnimationFrame(handleClock);