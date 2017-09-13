

import BubbleManager from './bubbles';
import Clock from './clock';
import Collisions from './collisions';
import Dispatcher from './dispatcher';
import Player from './player';
import Prize from './prize';
import Wall from './wall';
import levels from './levels';
import manager from './manager';

class StateManager {
  constructor() {
    this.level = 0;
    this.collisionManager = new Collisions(manager.entities);
    this.bubbles = new BubbleManager();
    Clock.onConstantly(manager.update);
    Clock.onConstantly(this.collisionManager.checkCollisions.bind(this.collisionManager));
    Clock.onEveryFrame(this.bubbles.update.bind(this.bubbles));
    Clock.onEveryFrame(manager.render);
    this.changeLevel(0);
    this.onPrize = this.onPrize.bind(this);
    this.onDeath = this.onDeath.bind(this);
    Dispatcher.on('PRIZE', this.onPrize);
    Dispatcher.on('DEATH', this.onDeath);
    this.openUI('modal-start');
  }

  openUI(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('hide');
    setTimeout(() => {
      modal.classList.add('hide');
    }, 5000);
  }

  changeLevel(level) {
    const l = levels[level];
    console.log('changeLevel', l);

    manager.removeEntities();

    const player = new Player(l.playerX, l.playerY);
    player.freeze = true;
    const prize = new Prize(l.prizeX, l.prizeY);
    const walls = l.walls.map((dwall) => {
      const wall = new Wall(dwall.x, dwall.y, dwall.w, dwall.h)
      manager.addEntity(wall);
      return wall;
    });
    manager.addEntity(player);
    manager.addEntity(prize);
    function debug() {

    }
    Clock.onConstantly(debug);
    if (level === 0) Clock.start();
    setTimeout(() => {
      player.freeze = false;
    }, 2000);
  }

  onDeath() {
    this.openUI('modal-died');
    this.changeLevel(this.level);
  }

  onPrize() {
    this.level++;
    if (levels[this.level]) {
      this.openUI('modal-next');
      this.changeLevel(this.level);
    } else {
      this.openUI('modal-end');
      this.changeLevel(0);
    }
  }
}

export default StateManager;
