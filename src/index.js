
import BubbleManager from './bubbles';
import Clock from './clock';
import Collisions from './collisions';
import keyboardInit from './keyboard';
import manager from './manager';
import Player from './player';
import Prize from './prize';
import UI from './ui';
import Wall from './wall';
import StateManager from './state_manager';


function debugPlayer() {
}


const stateManager = new StateManager();
console.log(stateManager);
keyboardInit(window);
UI();
