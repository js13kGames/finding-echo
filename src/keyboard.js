
import EventEmitter from 'event-emitter-es6';
import Dispatcher from './dispatcher';


function init(container) {
  container.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'Control') {
      return;
    }

    Dispatcher.emit('KEYDOWN', { data: { keyName } });
  }, false);

  container.addEventListener('keyup', (event) => {
    const keyName = event.key;

    if (keyName === 'Control') {
      return;
    }

    Dispatcher.emit('KEYUP', { data: { keyName } });
  }, false);
}

export default init;
