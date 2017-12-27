module.exports = function (grunt, options) {

    return {

        changelog: {
            options: {
                stdout: true,
                stderr: true,
                failOnError: false,
                stdinRawMode: true
            },
            command: 'nano CHANGELOG.md'
        },
        wpmdb_activate_plugins: {
            options: {
                stdout: true,
                stderr: true,
                failOnError: false,
                stdinRawMode: true
            },
            command: [
                'vagrant ssh --command "cd /var/www && wp plugin activate wp-migrate-db-pro --url=\'<%= bonzai.env.WP_HOME.replace(\"http://\", \"\").replace(\"https://\", \"\") %>\'"',
                'vagrant ssh --command "cd /var/www && wp plugin activate wp-migrate-db-pro-cli --url=\'<%= bonzai.env.WP_HOME.replace(\"http://\", \"\").replace(\"https://\", \"\") %>\'"',
                'vagrant ssh --command "cd /var/www && wp plugin activate wp-migrate-db-pro-media-files --url=\'<%= bonzai.env.WP_HOME.replace(\"http://\", \"\").replace(\"https://\", \"\") %>\'"'
            ].join(' && ')
        },
        wpmdb_import: {
            options: {
                stdout: true,
                stderr: true,
                failOnError: false,
                stdinRawMode: true
            },
            command: [
                'vagrant ssh --command "cd /var/www && wp migratedb pull \'<%= encodeURI(wp.wpmdb.url) %>\' \'<%= wp.wpmdb.secret %>\' --find=\'<%= wp.wpmdb.find %>\' --replace=\'<%= wp.wpmdb.replace %>\' --backup=prefix --media=remove-and-copy"'
            ].join(' && ')
        }
    };

};