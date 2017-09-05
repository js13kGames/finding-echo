
import Vector from './vector';

class BubbleManager {
  constructor() {
    this.bubbles = [];
    this.numBubbles = 30;
    this.minSize = 5;
    this.maxSize = 10;
    this.minPos = 5;
    this.maxPos = 80;

    for (let i = 0; i < this.numBubbles; i++) {
      let size = this.minSize + Math.floor(Math.random() * (this.maxSize + 1));
      let pos = new Vector(
        this.minPos + Math.floor(Math.random() * (this.maxPos + 1)),
        this.minPos + Math.floor(Math.random() * (this.maxPos + 1))
      );
      this.initBubble(size, pos);
    }
  }

  initBubble(size, pos) {
    // 'filter' : 'blur(' + blur_rand  + 'px)',
    const el = document.createElement('div');
    el.classList.add('bubble');
    el.setAttribute('style',
      'height: ' + size + 'px;' +
      'left: ' + pos.x + '%;' +
      'top: ' + pos.y + '%;' +
      'width: ' + size + 'px;'
    );
    document.body.appendChild(el);
    this.bubbles.push(el);
  }
}

export default BubbleManager;
