
import jsfxr from 'jsfxr';

import EventEmitter from 'event-emitter-es6';
import KeyboardInit from './keyboard';
import Vector from './vector';

const KEM = KeyboardInit(window);

const sfxDolphin = [2,,0.1199,0.28,0.2837,0.68,0.05,,-0.92,0.8,0.4499,-0.4399,,,,0.6,-0.1599,-0.62,0.28,-0.5799,0.1,0.2399,-0.3799,0.5]
const sfxBaby = [0,,0.1812,,0.1349,0.4524,,0.2365,,,,,,0.0819,,,,,1,,,,,0.5];
const sfxBabyURL = jsfxr(sfxBaby);

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const audio = new Audio();
audio.src = sfxBabyURL;
audio.loop = true;
audio.crossOrigin = "anonymous";

const source = audioCtx.createMediaElementSource(audio);

const panNode = audioCtx.createPanner();
panNode.coneOuterGain = 0.4;
panNode.coneOuterAngle = 240;
panNode.coneInnerAngle = 0;
panNode.refDistance = 20;

source.connect(panNode);
panNode.connect(audioCtx.destination);

audioCtx.listener.setPosition(0, 0, 0);
panNode.setPosition(40, 40, -0.5);

class Player extends EventEmitter {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.w = 4;
    this.h = 3;
    this.movement = new Vector(0, 0);
    this.angle = 0;
    this.isCollidable = true;

    this.onKey = this.onKey.bind(this);
    this.on('collision', this.onCollision.bind(this));
    // TODO Figure out way to not have this dep
    KEM.on('KEYDOWN', (ev) => this.onKey(ev.data));
  }

  onKey(keyData) {
    switch (keyData['keyName']) {
      case 'w':
        this.orientMove(0.25);
        break;
      case 'd':
        this.rotate(90);
        break;
      case 's':
        this.orientMove(-0.25);
        break;
      case 'a':
        this.rotate(-90);
        break;

      default:
        break;
    }
  }

  move(x, y) {
    this.movement.x += x;
    this.movement.y += y;
    console.log('movement', x, y, this.angle);
    console.log(this.x, this.y);
  }

  orientMove(force) {
    if (this.angle === 90) {
      this.move(force, 0);
    } else if (this.angle === 270) {
      this.move(-force, 0);
    } else if (this.angle === 180) {
      this.move(0, -force);
    } else if (this.angle === 0) {
      this.move(0, force);
    }
  }

  rotate(angle) {
    this.angle += angle;
    this.angle = this.angle % 360;

    if (this.angle < 0){
      this.angle += 360;
    }
    console.log('rotate', this.angle);
  }

  update() {
    if (this.movement.x !== 0) this.x += this.movement.x;
    if (this.movement.y !== 0) this.y += this.movement.y;
    panNode.setPosition(this.x / 10, this.y / 10, -0.5);
  }

  onCollision(entityB) {
    this.movement = new Vector(0, 0);
    if (entityB.orientation === 'h') {
      this.y -= 10;
    } else {
      this.x -= 10;
    }
    console.log('collision', this.x, this.y);
  }
}

export default Player;
