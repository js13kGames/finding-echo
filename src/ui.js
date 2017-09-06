
import Dispatcher from './dispatcher';

function onInjury(data) {
  const health = data.health;
  const healthEls = document.querySelectorAll('.healthDot');
  healthEls.forEach((el) => {
    el.setAttribute('style', 'visibility: visible;');
  });
  if (health < 5) {
    const max = 5 - health;
    for (let i = 0; i < max; i++) {
      healthEls[i].setAttribute('style', 'visibility: hidden;');
    }
  }
}

function init() {
  Dispatcher.on('INJURY', (ev) => { onInjury(ev.data) });
}

export default init;
