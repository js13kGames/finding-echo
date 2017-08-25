
const entities = [];

export default {
  addEntity(entity) {
    entities.push(entity);
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
