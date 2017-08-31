

class Collisions {
  constructor(entities) {
    this.entities = entities;
  }

  checkCollisions() {
    this.entities.forEach((entityA) => {
      this.entities.forEach((entityB) => {
        if (entityA !== entityB) {
          if (this.detectRectangles(entityA, entityB)) {
            if (entityA.isCollidable) {
              entityA.emitSync('collision', entityB);
            }
            if (entityB.isCollidable) {
              entityB.emitSync('collision', entityA);
            }
          }
        }
      });
    });
  }

  detectRectangles(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
       rect1.x + rect1.w > rect2.x &&
       rect1.y < rect2.y + rect2.h &&
       rect1.h + rect1.y > rect2.y) {
      return true;
    }
    return false;
  }
}

export default Collisions;
