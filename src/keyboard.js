
import EventEmitter from 'event-emitter-es6';


function init(container) {
  const EM = new EventEmitter();
  container.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'Control') {
      return;
    }

    console.log(`KEY-${keyName}`);
    EM.emit('KEYDOWN', { data: { keyName } });
  }, false);

  return EM;
}

export default init;
