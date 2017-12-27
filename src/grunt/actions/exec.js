module.exports = function (grunt, options) {

    var targets = {

        // Vagrant up
        vagrant_up: {
            command: 'vagrant up',
            options: {stdout: true}
        },

        // Install
        wp_install: {
            command: 'vagrant ssh --command "cd /var/www && wp core install --url=\'<%= bonzai.env.WP_HOME.replace(\"http://\", \"\").replace(\"https://\", \"\") %>\' --title=\'<%= bonzai.env.BONZAI_WP_TITLE %>\' --admin_user=\'<%= bonzai.env.BONZAI_ADMIN_NAME %>\' --admin_password=\'<%= bonzai.env.BONZAI_ADMIN_PASSWORD %>\' --admin_email=\'<%= bonzai.env.BONZAI_ADMIN_EMAIL %>\'"',
            options: {stdout: true}
        },

        // Install Multisite
        wp_install_multisite: {
            command: 'vagrant ssh --command "cd /var/www && wp core multisite-install --url=\'<%= bonzai.env.WP_HOME.replace(\"http://\", \"\").replace(\"https://\", \"\") %>\' --base=\'/\' --title=\'<%= bonzai.env.BONZAI_WP_TITLE %>\' --admin_user=\'<%= bonzai.env.BONZAI_ADMIN_NAME %>\' --admin_password=\'<%= bonzai.env.BONZAI_ADMIN_PASSWORD %>\' --admin_email=\'<%= bonzai.env.BONZAI_ADMIN_EMAIL %>\'"',
            options: {stdout: true}
        },

        // Settings
        wp_settings: {
            command: [
                'vagrant ssh --command "cd /var/www && wp option update siteurl \'<%= bonzai.env.WP_SITEURL %>\' --url=\'<%= bonzai.env.WP_HOME.replace(\"http://\", \"\").replace(\"https://\", \"\") %>\'"',
                'vagrant ssh --command "cd /var/www && wp option update home \'<%= bonzai.env.WP_HOME %>\' --url=\'<%= bonzai.env.WP_HOME.replace(\"http://\", \"\").replace(\"https://\", \"\") %>\'"',
                'vagrant ssh --command "cd /var/www && wp option update blogdescription \'\' --url=\'<%= bonzai.env.WP_HOME.replace(\"http://\", \"\").replace(\"https://\", \"\") %>\'"'
            ].join(' && '),
            options: {stdout: true}
        },

        // DB update
        wp_update_db: {
            command: [
                'vagrant ssh --command "cd /var/www && wp core update-db --url=\'<%= bonzai.env.WP_HOME.replace(\"http://\", \"\").replace(\"https://\", \"\") %>\'"'
            ].join(' && '),
            options: {stdout: true}
        },

        // DB update Multisite
        wp_update_db_multisite: {
            command: [
                'vagrant ssh --command "cd /var/www && wp core update-db --network --url=\'<%= bonzai.env.WP_HOME.replace(\"http://\", \"\").replace(\"https://\", \"\") %>\'"'
            ].join(' && '),
            options: {stdout: true}
        },

        // Salts
        wp_salts: {
            command: function () {
                // Load and instantiate Chance
                var chance = new (require('chance'))(),
                    format = {
                        length: 64,
                        pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()-_[]{}~+=,.;:/?|'
                    };
                return 'echo AUTH_KEY=\"' + chance.string(format) + '\" >> .env' +
                    ' && echo SECURE_AUTH_KEY=\"' + chance.string(format) + '\" >> .env' +
                    ' && echo LOGGED_IN_KEY=\"' + chance.string(format) + '\" >> .env' +
                    ' && echo NONCE_KEY=\"' + chance.string(format) + '\" >> .env' +
                    ' && echo AUTH_SALT=\"' + chance.string(format) + '\" >> .env' +
                    ' && echo SECURE_AUTH_SALT=\"' + chance.string(format) + '\" >> .env' +
                    ' && echo LOGGED_IN_SALT=\"' + chance.string(format) + '\" >> .env' +
                    ' && echo NONCE_SALT=\"' + chance.string(format)+ '\" >> .env' +
                    ' && echo \">> Generated salts in .env file\"';
            },
            options: {stdout: true}
        },

        // Plugins
        wp_plugins: {
            command: function () {
                var plugins = grunt.template.process('<%= wp.plugins %>');
                if (plugins.length > 0) {
                    plugins = Object.prototype.toString.call( plugins ) === '[object Array]' ? plugins.join(' ') : plugins.replace(/,/g, ' ');
                    grunt.log.writeln('>> Installing selected plugins');
                    return 'vagrant ssh --command "cd /var/www && composer require ' + plugins + '"';
                } else {
                    grunt.log.writeln('>> No selected plugins to install, skipping step.');
                    return '';
                }
            },
            options: {stdout: true}
        },

        // Permalinks
        wp_permalinks: {
            command: [
                'vagrant ssh --command "cd /var/www && wp rewrite structure \'/%postname%\'"'
            ].join(' && '),
            options: {stdout: true}
        },

        // Cleanup
        wp_cleanup: {
            command: [
                'vagrant ssh --command "cd /var/www && wp cache flush --url=\'<%= bonzai.env.WP_HOME.replace(\"http://\", \"\").replace(\"https://\", \"\") %>\'"'
            ].join(' && '),
            options: {stdout: true}
        },

        // Compose
        run_composer: {
            command: 'vagrant ssh --command "cd /var/www && echo \'>> Running composer install\' && composer update"',
            options: {stdout: true}
        }

    };

    // Create the targets for the themes
    var themes = options.bonzai.themes;

    themes.forEach(function (theme) {

        // Bower update
        targets[theme.slug + "-bower-update"] = {
            cwd: theme.path,
            cmd: "vagrant ssh -c \"cd /var/www/" + theme.path + " && bower update --save\""
        };

        // Composer update
        targets[theme.slug + "-composer-update"] = {
            cwd: theme.path,
            cmd: "vagrant ssh -c \"cd /var/www/" + theme.path + " && composer update\""
        };
    });

    return targets;

};