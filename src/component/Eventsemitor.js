const EventEmitter = require('events');

class Eventsemitor extends EventEmitter {
    replied_comment() {
        this.emit('replied_comment', true);
    }
}
module.exports = Eventsemitor;