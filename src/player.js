
import jsfxr from 'jsfxr';
import EventEmitter from 'event-emitter-es6';

import Dispatcher from './dispatcher';
import Vector from './vector';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const sfxDolphin = [2,0.16,0.19,0.27,0.17,0.35,0.31,0.3,0.24,0.37,0.41,0.72,0.22,0.87,-0.0239,0.61,-0.3,-0.54,0.84,-0.62,0.27,0.3,-0.6799,0.3];
const sfxSearch = [2,0.24,0.93,0.8,0.11,0.35,0.34,0.4199,-0.56,0.18,0.19,0.76,0.23,,-0.0367,0.19,-0.4599,-0.24,0.27,-0.4599,0.12,0.12,0.7,0.57];
const sfxBaby = [2,0.24,0.93,0.8,0.11,0.4,0.34,0.4199,-0.56,0.18,0.19,0.76,0.23,,-0.0367,0.19,-0.4599,-0.24,0.27,-0.4599,0.12,0.12,0.7,1];

const sfxDolphinURL = jsfxr(sfxDolphin);
const dolphinAudio = new Audio();
dolphinAudio.src = sfxDolphinURL;
dolphinAudio.crossOrigin = "anonymous";
const dolphinSource = audioCtx.createMediaElementSource(dolphinAudio);
const gainNode = audioCtx.createGain();
const convolverGain = audioCtx.createGain();
const convolver = audioCtx.createConvolver();
dolphinSource.connect(gainNode);
dolphinSource.connect(convolverGain);
gainNode.connect(audioCtx.destination);
convolverGain.connect(convolver);


const searchAudioUrl = jsfxr(sfxSearch);
const searchAudio = new Audio();
searchAudio.src = searchAudioUrl;
searchAudio.loop = false;
searchAudio.crossOrigin = "anonymous";

const babyAudioUrl = jsfxr(sfxBaby);
const babyAudio = new Audio();
babyAudio.src = babyAudioUrl;
babyAudio.loop = false;
babyAudio.crossOrigin = "anonymous";
const babyAudioSource = audioCtx.createMediaElementSource(babyAudio);
const panNode = audioCtx.createPanner();
panNode.coneOuterGain = 0.4;
panNode.coneOuterAngle = 240;
panNode.coneInnerAngle = 0;
panNode.refDistance = 20;
babyAudioSource.connect(panNode);
panNode.connect(audioCtx.destination);
audioCtx.listener.setPosition(0, 0, 0);
panNode.setPosition(0, 0, -0.4);



class Player extends EventEmitter {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.w = 4;
    this.h = 3;
    this.movement = new Vector(0, 0);
    this.angle = 180;
    this.isCollidable = true;
    this.isPlayer = true;
    this.el = document.getElementById('player');
    this.freeze = false;
    this.health = 5;

    this.onKey = this.onKey.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onEchoFound = this.onEchoFound.bind(this);
    this.onCallBack = this.onCallBack.bind(this);
    this.onPrize = this.onPrize.bind(this);
    this.on('collision', this.onCollision.bind(this));
    // TODO Figure out way to not have this dep
    Dispatcher.on('KEYDOWN', (ev) => this.onKey(ev.data));
    Dispatcher.on('KEYUP', (ev) => this.onKeyUp(ev.data));
    Dispatcher.on('CALLBACK', (ev) => this.onCallBack(ev.data));
    this.on('ECHO_FOUND', (ev) => this.onEchoFound(ev.data));
  }

  onKey(keyData) {
    switch (keyData['keyName']) {
      case 'w':
        this.orientMove(0.25);
        break;
      case 'd':
        this.rotate(-90);
        break;
      case 's':
        this.orientMove(-0.25);
        break;
      case 'a':
        this.rotate(90);
        break;
      case ' ':
        gainNode.gain.value = 1;
        convolverGain.gain.value = 0;
        dolphinAudio.play();
        Dispatcher.emitSync('ECHO');
        break;
      case 'f':
        searchAudio.play();
        Dispatcher.emitSync('SEARCH', { data: { pos: new Vector(this.x, this.y) }});
        break;

      default:
        break;
    }
  }

  onKeyUp(keyData) {
    switch (keyData['keyName']) {
      case 'w':
        this.stopMove()
        break;
      case 's':
        this.stopMove()
        break;

      default:
        break;
    }
  }

  onEchoFound(data) {
    this.timer = setTimeout(() => {
      gainNode.gain.value = 0.2;
      convolverGain.gain.value = 1;
      dolphinAudio.play();
    }, data.distance * 10);
  }

  move(x, y) {
    if (this.freeze) return;
    this.movement.x = x;
    this.movement.y = y;
    console.log('movement', x, y, this.angle);
    console.log('movement', this.x, this.y);
    Dispatcher.emit('MOVE', { data: { direction: new Vector(x, y) }});
  }

  stopMove() {
    this.movement.x = 0;
    this.movement.y = 0;
    Dispatcher.emit('STOP');
  }

  orientMove(force) {
    if (this.angle === 90) {
      this.move(force, 0);
    } else if (this.angle === 270) {
      this.move(-force, 0);
    } else if (this.angle === 180) {
      this.move(0, force);
    } else if (this.angle === 0) {
      this.move(0, -force);
    }
  }

  rotate(angle) {
    if (this.freeze) return;
    this.angle += angle;
    this.angle = this.angle % 360;

    if (this.angle < 0){
      this.angle += 360;
    }
    this.rotateEl(this.angle);
  }

  rotateEl(angle) {
    let fixedAngle = angle;
    if (angle === 0) {
      fixedAngle = 180;
    }
    if (angle === 180) {
      fixedAngle = 0;
    }
    this.el.setAttribute('style', 'transform: rotate(' + fixedAngle +'deg);');
  }

  update() {
    if (this.movement.x !== 0) this.x += this.movement.x;
    if (this.movement.y !== 0) this.y += this.movement.y;
  }

  injured() {
    this.health -= 1;
    Dispatcher.emitSync('INJURY', { data: { health: this.health }});
    if (this.health === 0) {
      Dispatcher.emit('DEATH');
    }
  }

  onPrize() {
    Dispatcher.emit('PRIZE');
  }

  onCollision(entityB) {
    if (entityB.isPrize) return this.onPrize();
    if (entityB.orientation === 'h') {
      if (this.angle === 180) {
        this.y -= 16;
      } else {
        this.y += 16;
      }
    } else {
      if (this.angle === 270) {
        this.x += 16;
      } else {
        this.x -= 16;
      }
    }
    this.freeze = true;
    const backup = new Vector(-this.movement.x, -this.movement.y);
    this.movement = backup;
    Dispatcher.emitSync('MOVE', { data: { direction: backup }});
    setTimeout(() => {
      this.movement = new Vector(0, 0);
      this.stopMove();
    }, 600);
    console.log('collision', this.x, this.y);
    setTimeout(() => { this.freeze = false; }, 1500);

    this.injured();
  }

  onCallBack(data) {
    const pos = data.position;
    console.log('panerd', pos.x, pos.y);
    audioCtx.listener.setPosition(this.x, this.y, 0);
    panNode.setPosition(pos.x, pos.y, 0);
    setTimeout(() => {
      babyAudio.play();
    }, 500);
  }
}

export default Player;
