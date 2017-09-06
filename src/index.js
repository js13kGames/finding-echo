
import BubbleManager from './bubbles';
import Clock from './clock';
import Collisions from './collisions';
import keyboardInit from './keyboard';
import manager from './manager';
import Player from './player';
import UI from './ui';
import Wall from './wall';


const player = new Player(90, 90);
const tW = new Wall(0, 0, 180, 2);
const rW = new Wall(180, 0, 2, 180);
const lW = new Wall(0, 0, 2, 180);
const bW = new Wall(0, 180, 180, 2);


manager.addEntity(tW);
manager.addEntity(rW);
manager.addEntity(lW);
manager.addEntity(bW);
manager.addEntity(player);

const collisionManager = new Collisions(manager.entities);

function debugPlayer() {
}

keyboardInit(window);
const bubbles = new BubbleManager();

UI();

Clock.onConstantly(manager.update);
Clock.onConstantly(debugPlayer);
Clock.onConstantly(collisionManager.checkCollisions.bind(collisionManager));
Clock.onEveryFrame(bubbles.update.bind(bubbles));
Clock.onEveryFrame(manager.render);
Clock.start();
