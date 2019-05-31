module.exports = function (grunt, options) {
    var extend = require('extend');

    // Create the targets for the themes
    var themes = options.bonzai.themes;
    var targets = {};

    // Fetch grunt config from composer.json of each theme and create some copy tasks
    themes.forEach(function (theme) {
        targets[theme.slug + '-assets-copy'] = theme.grunt.assets.copy;
    });

    return extend(true, {}, targets, {

        fork: {
            files: [
                // includes root files
                {
                    expand: true,
                    cwd: 'bonzai/tpl/fork/',
                    src: ['*', '.*'],
                    dest: '',
                    filter: 'isFile'
                },

                // includes config files into config/bonzai directory
                {
                    expand: true,
                    cwd: 'bonzai/tpl/fork/config/',
                    src: ['**', '**/.*'],
                    dest: 'config'
                },

                // includes webroot/public files into custom directory
                {
                    expand: true,
                    cwd: 'bonzai/tpl/fork/public/',
                    src: ["**", "**/.*"],
                    dest: options.app.webRoot
                },

                // includes webroot/backups files into custom directory
                {
                    expand: true,
                    cwd: 'bonzai/tpl/fork/mysql_backup/',
                    src: ["**", "**/.*"],
                    dest: 'mysql_backup'
                },

                // includes webroot/logs files into custom directory
                {
                    expand: true,
                    cwd: 'bonzai/tpl/fork/logs/',
                    src: ["**", "**/.*"],
                    dest: 'logs'
                },

            ],
            options: {
                process: function (content, srcpath) {
                    if (srcpath === 'bonzai/tpl/.env.template'
                        || srcpath === 'bonzai/tpl/fork/config/bonzai/wp-constants/_options.php'
                        || srcpath === 'bonzai/tpl/fork/config/bonzai/wp-constants/development.php'
                        || srcpath === 'bonzai/tpl/fork/config/bonzai/wp-constants/staging.php'
                        || srcpath === 'bonzai/tpl/fork/config/bonzai/wp-constants/production.php'
                        || srcpath === 'bonzai/tpl/fork/wp-cli.yml'
                        || srcpath === 'bonzai/tpl/fork/.gitignore'
                        || srcpath === 'bonzai/tpl/fork/composer.json'
                        || srcpath === 'bonzai/tpl/fork/config/homestead/Homestead.yaml'
                        || srcpath === 'bonzai/tpl/fork/config/homestead/Homestead-user.yaml'
                        || srcpath === 'bonzai/tpl/fork/README.md') {
                        return grunt.template.process(content.replace(/\{\%\=\s+([a-zA-Z0-9\.\_\-]+)\s+\%\}/g, "<%= " + "$1" + " %>"));
                    }
                    return content;
                }
            }
        },
        homestead: {
            files: [
                // includes homestead config file into config/bonzai directory
                {
                    expand: true,
                    cwd: 'bonzai/tpl/fork/config/homestead',
                    src: ['Homestead-user.yaml'],
                    dest: 'config/homestead'
                }
            ],
            options: {
                process: function (content, srcpath) {
                    if (srcpath === 'bonzai/tpl/fork/config/homestead/Homestead-user.yaml') {
                        return grunt.template.process(content.replace(/\{\%\=\s+([a-zA-Z0-9\.\_\-]+)\s+\%\}/g, "<%= " + "$1" + " %>"));
                    }
                    return content;
                }
            }
        },
        wp_multisite: {
            files: [
                {
                    expand: false,
                    src: 'bonzai/tpl/.htaccess.multisite.template',
                    dest: '<%= app.webRoot %>/.htaccess'
                },
                {
                    expand: false,
                    src: 'bonzai/tpl/fork/public/wp-config.php',
                    dest: '<%= app.webRoot %>/wp-config.php'
                }
            ],
            options: {}
        }

    });

};
