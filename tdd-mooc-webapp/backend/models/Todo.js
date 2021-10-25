const { Model } = require("objection");

class Todo extends Model {
  static get tableName() {
    return 'todos';
  }

  static get relationMappings() {
    return {
    };
  }
}

module.exports = Todo