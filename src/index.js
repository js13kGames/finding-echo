
import Clock from './clock';
import manager from './manager';
import Player from './player';
import Wall from './wall';

console.log('it works');

const player = new Player(10, 10);
const tW = new Wall(0, 0, 20, 2);
const rW = new Wall(20, 0, 2, 20);
const lW = new Wall(0, 0, 2, 20);
const bW = new Wall(0, 20, 20, 2);

manager.addEntity(tW);
manager.addEntity(rW);
manager.addEntity(lW);
manager.addEntity(bW);
manager.addEntity(player);

Clock.onConstantly(manager.update);
Clock.onEveryFrame(manager.render);
Clock.run();
