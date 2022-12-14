const moment = require('moment-timezone')
moment.tz.setDefault('America/Bogota')

class Update {
    static nextId = 1;

    constructor(name, points) {
        this.id = Update.nextId++;
        this.date = this.getCurrentDate();
        this.name = name;
        this.points = points;
    }

    getCurrentDate() {
        return moment().format('YYYY-MM-DD');
    }
}

module.exports = Update