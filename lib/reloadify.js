
var sendevent = require('sendevent');
var watch = require('watch');

function reloadify(app, dir) {
    
    // create a middlware that handles requests to `/eventstream`
    var events = sendevent('/eventstream');

    app.use(events);

    watch.watchTree(dir, function (f, curr, prev) {
        events.broadcast({ msg: 'reload' });
    });

}

module.exports = reloadify;
