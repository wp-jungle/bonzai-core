module.exports = function (grunt, options) {

    return {
        wpmdb: {
            dest: 'tmp/wpmdb.zip',
            src: {
                url: 'https://deliciousbrains.com/dl/wp-migrate-db-pro-latest.zip?licence_key=<%= bonzai.env.WPMDB_LICENCE %>&site_url=' + options.app.domain
            }
        },
        wpmdb_medias: {
            dest: 'tmp/wpmdb_medias.zip',
            src: {
                url: 'https://deliciousbrains.com/dl/wp-migrate-db-pro-media-files-latest.zip?licence_key=<%= bonzai.env.WPMDB_LICENCE %>&site_url=' + options.app.domain
            }
        },
        wpmdb_cli: {
            dest: 'tmp/wpmdb_cli.zip',
            src: {
                url: 'https://deliciousbrains.com/dl/wp-migrate-db-pro-cli-latest.zip?licence_key=<%= bonzai.env.WPMDB_LICENCE %>&site_url=' + options.app.domain
            }
        }
    };
};