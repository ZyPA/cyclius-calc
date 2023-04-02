var slider = document.getElementById("timeOverride");
var output = document.getElementById("overrideTime");

function handleTimer(value) {
  var hour = Math.floor(value) < 10 ? "0" + Math.floor(value) : Math.floor(value);
  var min = Math.floor((value - hour)*60) < 10 ? "0" + Math.floor((value - hour)*60) : Math.floor((value - hour)*60);
  return `${hour}:${min} UTC`
}

output.innerHTML = handleTimer(slider.value);

slider.oninput = function() {
  output.innerHTML = handleTimer(this.value);
}