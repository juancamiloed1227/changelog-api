const moment = require('moment-timezone')
moment.tz.setDefault('America/Bogota')

class Project {
  static nextId = 1;

  constructor(name, creator, updates) {
    this.id = Project.nextId++;
    this.name = name;
    this.creator = creator;
    this.date = this.getCurrentDate();
    this.updates = updates;
  }

  getCurrentDate() {
    return moment().format('YYYY-MM-DD');
  }
}

module.exports = Project