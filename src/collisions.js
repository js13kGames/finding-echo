
import Dispatcher from './dispatcher';
import Vector from './vector';

function intersectsWith(eA, eB) {
  const a = eA.points[0];
  const b = eA.points[1];
  const c = eB.points[0];
  const d = eB.points[1];
  const cmp = new Vector(c.x - a.x, c.y - a.y);
  const r = new Vector(b.x - a.x, b.y - a.y);
  const s = new Vector(d.x - c.x, d.y - c.y);

  const cmpxr = cmp.x * r.y - cmp.y * r.x;
  const cmpxs = cmp.x * s.y - cmp.y * s.x;
  const rxs = r.x * s.y - r.y * s.x;
  if (cmpxr === 0) {
    return ((c.x - a.x < 0) !== (c.x - b.x < 0)) ||
           ((c.y - a.y < 0) !== (c.y - b.y < 0));
  }
  if (rxs === 0) {
    return false;
  }

  const rxsr = 1 / rxs;
  const t = cmpxs * rxsr;
  const u = cmpxr * rxsr;
  return (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1);
}

function getIntersectionPoint(eA, eB) {
  const a = eA.points[0];
  const b = eB.points[1];
  const c = eB.points[0];
  const d = eB.points[1];

  const divider = ((a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x));
  if (divider === 0) {
    return new Vector(0, 0);
  }
  const intersectionX = ((a.x * b.y - a.y * b.x) * (c.x - d.x) - (a.x - b.x) *
    (c.x * d.y - c.y * d.x)) / divider;
  const intersectionY = ((a.x * b.y - a.y * b.x) * (c.y - d.y) - (a.y - b.y) *
    (c.x * d.y - c.y * d.x)) / divider;

  return new Vector(intersectionX, intersectionY);
}

class Collisions {
  constructor(entities) {
    this.entities = entities;
    this.checkEcho = this.checkEcho.bind(this);
    Dispatcher.on('ECHO', () => this.checkEcho());
  }

  update() {
    this.checkCollisions();
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

  checkEcho() {
    const player = this.entities.find((entity) => entity.isPlayer);
    const walls = this.checkRayCasting(player.x, player.y);
    const wall = this.findFacingWall(walls, player.x, player.y, player.angle);
    if (wall) {
      const distance = this.distanceOriented(player, wall);
      player.emitSync('ECHO_FOUND', { data: { wall, distance } });
    }
  }

  distanceOriented(player, wall) {
    const wallPoint = new Vector(wall.x, wall.y);
    const playerCenter = new Vector(player.x + player.w / 2,
                                player.y + player.h / 2);
    if (wall.orientation === 'v') {
      wallPoint.y = playerCenter.y;
    } else {
      wallPoint.x = playerCenter.x;
    }
    return this.distance(playerCenter, wallPoint);
  }

  distance(pointA, pointB) {
    return Math.sqrt(Math.pow(pointB.x -pointA.x, 2) +
              Math.pow(pointB.y - pointA.y, 2));
  }

  checkRayCasting(cX, cY) {
    const hitpoints = [];
    const wallPoints = [];
    const walls = this.entities.filter((entity) => entity.isWall);
    // TODO bad naming, differeniate wall
    walls.forEach((wall) => {
      let closestWall;
      wall.points.forEach((point, jdx) => {
        let closestPoint;
        if (jdx === 0) {
          closestPoint = wall.points[0];
        }
        if (jdx === 1) {
          closestPoint = wall.points[1];
        }
        closestWall = wall;
        const ray = { points: [
          new Vector(cX, cY),
          new Vector(closestPoint.x, closestPoint.y)] };
        let minDistance = Math.sqrt(Math.pow(ray.points[1].x - ray.points[0].x, 2) +
          Math.pow(ray.points[1].y - ray.points[0].y, 2));

        walls.forEach((wallK) => {
          if (wall !== wallK) {
            if (intersectsWith(wallK, ray)) {
              const intersectionPoint = getIntersectionPoint(wallK, ray);
              const tempRay = {
                points: [new Vector(cX, cY),
                  new Vector(intersectionPoint.x, intersectionPoint.y)]
              };
              const tempRayLength = Math.sqrt(Math.pow(tempRay.points[1].x -
                tempRay.points[0].x, 2) +
                Math.pow(tempRay.points[1].y - tempRay.points[0].y, 2));
              if (tempRayLength < minDistance) {
                closestPoint = intersectionPoint;
                minDistance = tempRayLength;
                closestWall = wallK;
              }
            }
          }
        });
        hitpoints.push(closestPoint);
      });
      wallPoints.push(closestWall);
    });
    return wallPoints;
  }

  findFacingWall(walls, cX, cY, angle) {
    let closestWall;
    if (angle === 0) {
      closestWall = walls.find((wall) => wall.orientation === 'h' && wall.y <= cY);
    }
    if (angle === 90) {
      closestWall = walls.find((wall) => wall.orientation === 'v' && wall.x >= cX);
    }
    if (angle === 180) {
      closestWall = walls.find((wall) => wall.orientation === 'h' && wall.y >= cY);
    }
    if (angle === 240) {
      closestWall = walls.find((wall) => wall.orientation === 'v' && wall.y <= cX);
    }

    return closestWall;
  }
}


export default Collisions;
