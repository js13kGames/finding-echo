
import Clock from './clock';
import Collisions from './collisions';
import manager from './manager';
import Player from './player';
import Wall from './wall';


const player = new Player(8, 8);
player.move(1, 0);
const tW = new Wall(0, 0, 30, 2);
const rW = new Wall(30, 0, 2, 30);
const lW = new Wall(0, 0, 2, 30);
const bW = new Wall(0, 30, 30, 2);


manager.addEntity(tW);
manager.addEntity(rW);
manager.addEntity(lW);
manager.addEntity(bW);
manager.addEntity(player);

const collisionManager = new Collisions(manager.entities);

function debugPlayer() {
  console.log('update player', player.x);
}

Clock.onConstantly(manager.update);
Clock.onConstantly(debugPlayer);
Clock.onConstantly(collisionManager.checkCollisions.bind(collisionManager));
Clock.onEveryFrame(manager.render);
Clock.start();
