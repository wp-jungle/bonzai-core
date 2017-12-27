module.exports = function (grunt, options) {

    var path = require('path');

    return {
        wpmdb: {
            src: 'tmp/wpmdb.zip',
            dest: path.join(options.app.webRoot, 'app/plugins')
        },
        wpmdb_medias: {
            src: 'tmp/wpmdb_medias.zip',
            dest: path.join(options.app.webRoot, 'app/plugins')
        },
        wpmdb_cli: {
            src: 'tmp/wpmdb_cli.zip',
            dest: path.join(options.app.webRoot, 'app/plugins')
        }
    };
};