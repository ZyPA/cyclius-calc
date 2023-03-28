const slots = {
  diamond: {
    e: document.querySelector('.diamond .value'),
    cycle: 3,
  },
  ruby: {
    e: document.querySelector('.ruby .value'),
    cycle: 12,
  },
  jade: {
    e: document.querySelector('.jade .value'),
    cycle: 24,
  },
};

getAverage = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

function getMult(time, cycle, formatted = false) {
  var floatingPoint = 2;
  var _result = Math.sin(time * (Math.PI / cycle) * 2) * 15;
  if (formatted) {
    if (_result > 0) {
      return `+${_result.toFixed(floatingPoint)}%`;
    } else {
      return `${_result.toFixed(floatingPoint)}%`;
    }
  } else {
    return _result;
  }
}

function getBest(time) {
  var diamondAvg = [],
    rubyAvg = [],
    jadeAvg = [];

  for (let i = 1; i <= 60; i++) {
    diamondAvg.push(getMult(time + i / 60, slots.diamond.cycle));
    rubyAvg.push(getMult(time + i / 60, slots.ruby.cycle));
    jadeAvg.push(getMult(time + i / 60, slots.jade.cycle));
  }

  diamondAvg = getAverage(diamondAvg);
  rubyAvg = getAverage(rubyAvg);
  jadeAvg = getAverage(jadeAvg);

  if (diamondAvg > rubyAvg && diamondAvg > jadeAvg && diamondAvg > 0) {
    return 'diamond';
  } else if (rubyAvg > diamondAvg && rubyAvg > jadeAvg && rubyAvg > 0) {
    return 'ruby';
  } else if (jadeAvg > diamondAvg && jadeAvg > rubyAvg && jadeAvg > 0) {
    return 'jade';
  } else {
    return 'none';
  }
}

function update() {
  const now = new Date().getTime() / 3600000;
  for (const [key, slot] of Object.entries(slots)) {
    rawValue = getMult(now, slot.cycle);
    nextValue = getMult(now + 1 / 3600000, slot.cycle);
    value = getMult(now, slot.cycle, true);
    if (
      getBest(now) == key &&
      !slot.e.parentElement.classList.contains('isBest')
    ) {
      slot.e.parentElement.classList.add('isBest');
    } else if (
      getBest(now) != key &&
      slot.e.parentElement.classList.contains('isBest')
    ) {
      slot.e.parentElement.classList.remove('isBest');
    }
    if (slot.e.innerHTML != value) slot.e.innerHTML = value;
    switch (rawValue < nextValue) {
      case false:
        slot.e.setAttribute('data-state', 'decreasing');
        break;
      case true:
        slot.e.setAttribute('data-state', 'increasing');
        break;
      default:
        slot.e.setAttribute('data-state', '');
        break;
    }
    if (rawValue < 0) {
      if (!slot.e.classList.contains('clr-red')) {
        slot.e.classList.remove('clr-green');
        slot.e.classList.add('clr-red');
      }
    } else if (rawValue > 0) {
      if (!slot.e.classList.contains('clr-green')) {
        slot.e.classList.remove('clr-red');
        slot.e.classList.add('clr-green');
      }
    }
  }
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
