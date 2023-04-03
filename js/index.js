const slots = {
  diamond: {
    e: document.querySelector('.slot.diamond .slot-value'),
    bestE: document.querySelector('.slot.diamond .slot-isBest'),
    cycle: 3,
  },
  ruby: {
    e: document.querySelector('.slot.ruby .slot-value'),
    bestE: document.querySelector('.slot.ruby .slot-isBest'),
    cycle: 12,
  },
  jade: {
    e: document.querySelector('.slot.jade .slot-value'),
    bestE: document.querySelector('.slot.jade .slot-isBest'),
    cycle: 24,
  },
};

var slider = document.getElementById('slider');
var sliderToggle = document.getElementById('sliderToggle');

let activeSlot = 'none';
document.querySelectorAll('.slot-isActive').forEach((item) => {
  item.addEventListener('click', () => {
    activeSlot = document.querySelector('.slot-isActive:checked').id;
  });
});

const avg = (arr) => arr.reduce((acc, curr) => acc + curr) / arr.length;

function beautify(num) {
  var _num = Math.abs(num).toFixed(2);
  return num >= 0 ? `+${_num}%` : `-${_num}%`;
}

function getMult(time, slot) {
  if (slots.hasOwnProperty(slot)) {
    var cycle = slots[slot].cycle;
  } else {
    return 0;
  }
  return Math.sin(time * (Math.PI / cycle) * 2) * 15;
}

function getBest(time) {
  var diaAvg = [],
    rubyAvg = [],
    jadeAvg = [];
  const current = getMult(time, activeSlot),
    dia = getMult(time, 'diamond'),
    ruby = getMult(time, 'ruby'),
    jade = getMult(time, 'jade');

  for (let i = 1; i <= 60; i++) {
    diaAvg.push(getMult(time + i / 60, 'diamond'));
    rubyAvg.push(getMult(time + i / 60, 'ruby'));
    jadeAvg.push(getMult(time + i / 60, 'jade'));
  }

  diaAvg = avg(diaAvg);
  rubyAvg = avg(rubyAvg);
  jadeAvg = avg(jadeAvg);

  if (
    jadeAvg >= rubyAvg &&
    jadeAvg >= diaAvg &&
    jadeAvg >= 0 &&
    jade >= current &&
    jade >= 0
  )
    return 'jade';
  else if (
    rubyAvg >= jadeAvg &&
    rubyAvg >= diaAvg &&
    rubyAvg >= 0 &&
    ruby >= current &&
    ruby >= 0
  )
    return 'ruby';
  else if (
    diaAvg >= jadeAvg &&
    diaAvg >= rubyAvg &&
    diaAvg >= 0 &&
    dia >= current &&
    dia >= 0
  )
    return 'diamond';
  else if (current >= 0) return activeSlot;
  else return 'none';
}

function update() {
  var d = new Date();
  if (sliderToggle.checked == true) var t = parseFloat(slider.value) + d.getTimezoneOffset() / 60;
  else var t = d.getTime() / 1000 / 60 / 60;
  var currBest = getBest(t);
  for ([key, item] of Object.entries(slots)) {
    var mult = getMult(t, key);
    var multNext = getMult(t + 1 / 1000, key);
    item.e.setAttribute('data-increasing', mult < multNext ? 'true' : 'false');
    if (currBest == key) {
      item.bestE.setAttribute('data-is-best', 'true');
    } else {
      item.bestE.setAttribute('data-is-best', 'false');
    }
    if (item.e.innerHTML != beautify(mult)) item.e.innerHTML = beautify(mult);
    if (mult >= 0) {
      if (item.e.classList.contains('clr-red'))
        item.e.classList.remove('clr-red');
      item.e.classList.add('clr-green');
    } else if (mult < 0) {
      if (item.e.classList.contains('clr-green'))
        item.e.classList.remove('clr-green');
      item.e.classList.add('clr-red');
    }
  }
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
