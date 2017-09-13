
export default [
  {
    playerX: 40,
    playerY: 40,
    prizeX: 120,
    prizeY: 130,
    walls: [
      { x: 1, y: 1, w: 179, h: 1 },
      { x: 179, y: 1, w: 1, h: 179 },
      { x: 1, y: 1, w: 1, h: 179 },
      { x: 1, y: 179, w: 179, h: 1 }
    ]
  },
  {
    playerX: 20,
    playerY: 20,
    prizeX: 120,
    prizeY: 120,
    walls: [
      { x: 0, y: 0, w: 149, h: 1 },
      { x: 150, y: 0, w: 1, h: 149 },
      { x: 1, y: 150, w: 149, h: 1 },
      { x: 0, y: 1, w: 1, h: 149 }
    ]
  },
  {
    playerX: 20,
    playerY: 100,
    prizeX: 100,
    prizeY: 20,
    walls: [
      { x: 0, y: 0, w: 119, h: 1 },
      { x: 120, y: 0, w: 1, h: 119 },
      { x: 1, y: 120, w: 119, h: 1 },
      { x: 0, y: 1, w: 1, h: 119 },
      { x: 40, y: 60, w: 1, h: 59 },
      { x: 80, y: 1, w: 1, h: 59 }
    ]
  }
]
