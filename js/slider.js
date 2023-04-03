var slider = document.getElementById('timeOverride');
var output = document.getElementById('overrideTime');

const leadingZero = (n) => (n < 10 ? '0' + n : n);

function handleTimer(value) {
  var hh = Math.floor(value);
  var mm = Math.floor((value - hh) * 60);
  var ss = Math.floor(((value - hh) * 60 - mm) * 60);
  return `${leadingZero(hh)}:${leadingZero(mm)}:${leadingZero(ss)}`;
}

output.innerHTML = handleTimer(slider.value);

slider.oninput = function () {
  output.innerHTML = handleTimer(this.value);
};
