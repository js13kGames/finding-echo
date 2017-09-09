
let entities = [];

export default {
  addEntity(entity) {
    entities.push(entity);
  },

  removeEntities() {
    entities.length = 0;
  },

  update() {
    entities.forEach(entity => {
      if (entity.update) {
        entity.update();
      }
    });
  },

  render(offset) {
    entities.forEach(entity => {
      if (entity.render) {
        entity.render();
      }
    });
  },

  get entities() {
    return entities;
  }
};
