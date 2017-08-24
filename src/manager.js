
export default {
  entities: [],

  addEntity(entity) {
    this.entities.push(entity);
  },

  update() {
    this.entities.forEach(entity => {
      entity.update();
    });
  }

  render() {
    this.entities.forEach(entity => {
      entity.render();
    });
  }
}
