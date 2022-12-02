const moment = require('moment-timezone')
moment.tz.setDefault('America/Bogota')

class Update {
    static nextId = 1;

    constructor(points) {
        this.id = Update.nextId++;
        this.date = this.getCurrentDate();
        this.points = points;
    }

    getCurrentDate() {
        return moment().format('YYYY-MM-DD');
    }
}

module.exports = Update