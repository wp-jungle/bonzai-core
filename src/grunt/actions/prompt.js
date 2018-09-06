module.exports = function (grunt, options) {

    var semver = require('semver'),
        remote = require('remote-origin-url');

    function getHostName(url) {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        }
        else {
            return null;
        }
    }

    function getDomain(url) {
        var hostName = getHostName(url);
        var domain = hostName;

        if (hostName != null) {
            var parts = hostName.split('.').reverse();

            if (parts != null && parts.length > 1) {
                domain = parts[1] + '.' + parts[0];

                if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
                    domain = parts[2] + '.' + domain;
                }
            }
        }

        return domain;
    }

    return {

        // Forking Bonzai
        fork: {
            options: {
                questions: [
                    {
                        config: 'app.domain',
                        type: 'input',
                        message: 'Domain name:',
                        default: function () {
                            return options.bonzai.isForked ? "<%= app.domain %>" : "your-site.ext";
                        },
                        validate: function (value) {
                            var valid = /^[0-9a-z\-\.]+$/.test(value);
                            var domainExtensions = [
                                "gov", "org", "co", "com", "in", "info", "net", "uk", "af", "am", "ar", "au", "as", "az", "be", "bg", "bn", "bo", "bs", "ca", "cs", "cy", "da", "de", "dv", "el", "en", "es", "et", "eu", "fa", "fi", "fo", "fr", "gd", "gg", "gl", "gn", "gu", "he", "hi", "hr", "hu", "hy", "id", "is", "it", "jp", "ka", "kk", "km", "kn", "ko", "ks", "la", "lo", "lt", "lv", "mi", "mk", "ml", "mn", "mr", "ms", "mt", "my", "nb", "ne", "nl", "or", "pa", "pl", "pt", "rm", "ro", "ru", "sa", "sb", "sd", "si", "sk", "sl", "so", "sq", "sr", "sv", "sw", "ta", "te", "tg", "th", "tk", "tn", "tr", "ts", "tt", "uk", "ur", "uz", "vi", "xh", "yi", "zh", "zu"
                            ];
                            var domainRegex = new RegExp("\.?(\." + domainExtensions.join('|') + ")+$");
                            if (valid) {
                                grunt.config('pkg.name', value.replace(domainRegex, ''));
                            }
                            return valid || "Please, use lower letters, dash and digits only";
                        }
                    },
                    {
                        config: 'pkg.description',
                        type: 'input',
                        message: 'Project description:',
                        default: function () {
                            return options.bonzai.isForked ? "<%= pkg.description %>" : "project description";
                        },
                        validate: function (value) {
                            var valid = value !== "";
                            return valid || "Please, enter a description";
                        }
                    },
                    {
                        config: 'pkg.author',
                        type: 'input',
                        message: 'Project author:',
                        default: function () {
                            return options.bonzai.isForked ? "<%= pkg.author %>" : "Firstname Lastname <author@mail.com>";
                        },
                        validate: function (value) {
                            var valid = value !== "";
                            return valid || "Please, enter something";
                        }
                    },
                    {
                        config: 'pkg.version',
                        type: 'input',
                        message: 'Project version (from where to start):',
                        default: function () {
                            return options.bonzai.isForked ? "<%= pkg.version %>" : "0.0.1";
                        },
                        validate: function (value) {
                            var valid = /^[0-9]+.[0-9]+.[0-9]+$/.test(value);
                            return valid || "Your version number must be in X.X.X format";
                        }
                    },
                    {
                        config: 'pkg.repository.url',
                        type: 'input',
                        message: 'Project repository URL:',
                        default: function () {
                            return options.bonzai.isForked ? "<%= pkg.repository.url %>" : ( remote.sync() || 'git@github.com:username/project.git' );
                        },
                        validate: function (value) {
                            var valid = /((git|ssh|http(s)?)|(git@[\w\.]+))(:(\/\/)?)([\w\.@\:/\-~]+)(\.git)(\/)?/.test(value);
                            return valid || "Please, enter a git repository URL";
                        }
                    },
                    {
                        config: 'app.webRoot',
                        type: 'input',
                        message: 'Project webroot folder:',
                        default: '<%= app.webRoot %>',
                        validate: function (value) {
                            var valid = /^[a-z\-_]+$/.test(value);
                            return valid || "Please, use lower letters, dash and underscores only";
                        }
                    },
                    {
                        config: 'app.dbPrefix',
                        type: 'input',
                        message: 'Project DB_PREFIX:',
                        default: function () {
                            var slug = grunt.config('pkg.name').replace(/[^\w]/gi, '') || 'wp';
                            return slug + '_';
                        },
                        validate: function (value) {
                            var valid = /^[a-z_]+$/.test(value);
                            return valid || "Please, use lower letters and underscores only";
                        }
                    }
                ]
            }
        },

        // Environment
        wp_environment: {
            options: {
                questions: [
                    {
                        config: 'bonzai.env.WP_ENV',
                        type: 'input',
                        message: 'WP_ENV:',
                        default: '<%= bonzai.env.WP_ENV %>'
                    }
                ]
            }
        },

        // Config
        wp_config: {
            options: {
                questions: [
                    {
                        config: 'wp.config.wp.installType',
                        type: 'confirm',
                        message: 'Do you want your site to be a Multisite:',
                        default: false,
                        when: function(){
                            return ! options.bonzai.isForked;
                        }
                    },
                    {
                        config: 'bonzai.env.BONZAI_DB_ROOT',
                        type: 'input',
                        message: 'Mysql root password:',
                        default: options.bonzai.isForked ? '<%= bonzai.env.BONZAI_DB_ROOT %>' : 'root'
                    },
                    {
                        config: 'bonzai.env.WP_ENV',
                        type: 'input',
                        message: 'WP_ENV:',
                        default: options.bonzai.isForked ? '<%= bonzai.env.WP_ENV %>' : 'development'
                    },
                    {
                        config: 'bonzai.env.DB_NAME',
                        type: 'input',
                        message: 'DB_NAME:',
                        default: options.bonzai.isForked ? '<%= bonzai.env.DB_NAME %>' : 'db_name'
                    },
                    {
                        config: 'bonzai.env.DB_USER',
                        type: 'input',
                        message: 'DB_USER:',
                        default: options.bonzai.isForked ? '<%= bonzai.env.DB_USER %>' : 'wp'
                    },
                    {
                        config: 'bonzai.env.DB_PASSWORD',
                        type: 'input',
                        message: 'DB_PASSWORD:',
                        default: options.bonzai.isForked ? '<%= bonzai.env.DB_PASSWORD %>' : 'wp'
                    },
                    {
                        config: 'bonzai.env.DB_HOST',
                        type: 'input',
                        message: 'DB_HOST:',
                        default: options.bonzai.isForked ? '<%= bonzai.env.DB_HOST %>' : 'localhost'
                    }
                ],
                then: function (results) {
                    if (! options.bonzai.isForked) {
                        if (results['wp.config.wp.installType'] === true) {
                            grunt.config('wp.config.wp.type', 'multisite');
                        } else {
                            grunt.config('wp.config.wp.type', 'singlesite');
                        }
                    } else {
                        grunt.config('wp.config.wp.type', options.app.type);
                    }
                }
            }
        },

        // Install
        wp_install: {
            options: {
                questions: [
                    {
                        config: 'bonzai.env.BONZAI_WP_TITLE',
                        type: 'input',
                        message: 'Website Title:',
                        default: '<%= bonzai.env.BONZAI_WP_TITLE %>'
                    },
                    {
                        config: 'bonzai.env.BONZAI_ADMIN_NAME',
                        type: 'input',
                        message: 'Admin Name:',
                        default: '<%= bonzai.env.BONZAI_ADMIN_NAME %>'
                    },
                    {
                        config: 'bonzai.env.BONZAI_ADMIN_PASSWORD',
                        type: 'password',
                        message: 'Admin Password:',
                        default: '<%= bonzai.env.BONZAI_ADMIN_PASSWORD %>'
                    },
                    {
                        config: 'bonzai.env.BONZAI_ADMIN_EMAIL',
                        type: 'input',
                        message: 'Admin E-mail:',
                        default: '<%= bonzai.env.BONZAI_ADMIN_EMAIL %>'
                    }
                ]
            }
        },

        // Vagrant User informations
        vagrant: {
            options: {
                questions: [
                    {
                        config: 'current.user.vagrant.provider',
                        type: 'list',
                        message: 'Select your provider for your VM:',
                        choices: [
                            {name: 'virtualbox'},
                            {name: 'vmware'},
                            {name: 'parallels'}
                        ],
                        default: function () {
                            return 'virtualbox';
                        }
                    },
                    {
                        config: 'current.user.vagrant.ip',
                        type: 'input',
                        message: 'Select a locally available IP for your VM:',
                        default: function () {
                            return '192.168.56.' + Math.floor((Math.random() * 254) + 1);
                        }
                    },
                    {
                        config: 'current.user.vagrant.cpus',
                        type: 'input',
                        message: 'How many CPUs should be used for your VM:',
                        default: function () {
                            return '1';
                        }
                    },
                    {
                        config: 'current.user.vagrant.memory',
                        type: 'input',
                        message: 'How many memory should be used for your VM:',
                        default: function () {
                            return '1024';
                        }
                    },
                    {
                        config: 'bonzai.env.BONZAI_CURRENT_USER_RSA',
                        type: 'input',
                        message: 'Path to RSA key:',
                        default: function () {
                            return grunt.config('bonzai.env.BONZAI_CURRENT_USER_RSA') || "C:\\\\Users\\\\Username\\\\.ssh\\\\id_rsa";
                        }
                    }
                ]
            }
        },

        // Check if salts are already configured in .env file
        // If not, prompt the user if they need to be configured
        wp_salts: {
            options: {
                questions: [
                    {
                        config: 'wp.salts.create',
                        type: 'confirm',
                        message: 'Create salts ?',
                        default: true,
                        when: function () {
                            return !('AUTH_KEY' in grunt.config('bonzai.env'));
                        }
                    },
                    {
                        config: 'wp.salts.replace',
                        type: 'confirm',
                        message: 'Salts already found, regenerate ?',
                        default: false,
                        when: function () {
                            return ('AUTH_KEY' in grunt.config('bonzai.env'));
                        }
                    }
                ],
                then: function (results) {
                    if (results['wp.salts.create'] === true && !('AUTH_KEY' in grunt.config('bonzai.env'))) {
                        grunt.task.run(['exec:wp_salts']);
                        grunt.log.ok('Generating salts in .env file...');
                    } else if (results['wp.salts.replace'] === true && ('AUTH_KEY' in grunt.config('bonzai.env'))) {
                        grunt.log.ok('Replacing salts in .env file...');
                        grunt.task.run(['replace:wp_salts']);
                    } else {
                        grunt.log.error('Skipping WP Salts generation');
                    }
                }
            }
        },

        // wp_wpmdb
        wp_wpmdb: {
            options: {
                questions: [
                    {
                        config: 'wp.wpmdb.ask',
                        type: 'confirm',
                        message: 'Install WP-Migrate-DB-Pro (need licence):',
                        default: true,
                        when: function (answers) {
                            if (grunt.file.exists(options.app.webRoot + '/app/plugins/wp-migrate-db-pro/wp-migrate-db-pro.php')) {
                                answers['wp.wpmdb.ask'] = true;
                                return false;
                            } else {
                                return true;
                            }
                        }
                    },
                    {
                        config: 'wp.wpmdb.key',
                        type: 'input',
                        message: 'WPMDB_LICENCE:',
                        default: function(){
                            return grunt.config('bonzai.env.WPMDB_LICENCE') || "Your_Licence_Key"
                        },
                        when: function (answers) {
                            return answers['wp.wpmdb.ask'] !== false;
                        }
                    },
                    {
                        config: 'wp.wpmdb.import',
                        type: 'confirm',
                        message: 'Import database and media files from remote:',
                        default: false,
                        when: function (answers) {
                            return answers['wp.wpmdb.ask'] !== false && options.bonzai.isForked;
                        }
                    },
                    {
                        config: 'wp.wpmdb.url',
                        type: 'input',
                        message: 'WPMDB url from where to pull the database:',
                        default: function () {
                            return options.app.wpmdb.pull.url || 'https://user:pass@' + options.app.domain + '/wp';
                        },
                        when: function (answers) {
                            return answers['wp.wpmdb.ask'] !== false && options.bonzai.isForked && answers['wp.wpmdb.import'] === true;
                        }
                    },
                    {
                        config: 'wp.wpmdb.secret',
                        type: 'input',
                        message: 'WPMDB secret connection key to the remote:',
                        default: function () {
                            return grunt.template.process(options.app.wpmdb.pull.secret) || 'xxxxxxxxxxxxxxxxxxxxxxxxxxx';
                        },
                        when: function (answers) {
                            return answers['wp.wpmdb.ask'] !== false && options.bonzai.isForked && answers['wp.wpmdb.import'] === true;
                        }
                    },
                    {
                        config: 'wp.wpmdb.find',
                        type: 'input',
                        message: 'Path/strings  to find in the database:',
                        default: function() {
                            return options.app.wpmdb.pull.find || "//" + grunt.config('app.domain') + ",/var/www/vhosts/" + getDomain('http://' + grunt.config('app.domain') + '/') + "/" + grunt.config('app.domain') + "/current";
                        },
                        when: function (answers) {
                            return answers['wp.wpmdb.ask'] !== false && options.bonzai.isForked && answers['wp.wpmdb.import'] === true;
                        }
                    },
                    {
                        config: 'wp.wpmdb.replace',
                        type: 'input',
                        message: 'Replacements for each path/strings found:',
                        default: function() {
                            return options.app.wpmdb.pull.replace || "//" + grunt.config('pkg.name') + ".test,/var/www";
                        },
                        when: function (answers) {
                            return answers['wp.wpmdb.ask'] !== false && options.bonzai.isForked && answers['wp.wpmdb.import'] === true;
                        }
                    }
                ],
                then: function (results) {
                    if (results['wp.wpmdb.ask'] === true && results['wp.wpmdb.key'] !== "Your_Licence_Key" && results['wp.wpmdb.key'] !== "") {

                        grunt.config('bonzai.env.WPMDB_LICENCE', results['wp.wpmdb.key']);

                        if(results['wp.wpmdb.secret'] !== "" && results['wp.wpmdb.secret'] !== 'xxxxxxxxxxxxxxxxxxxxxxxxxxx') {
                            grunt.config('bonzai.env.WPMDB_PULL_SECRET', results['wp.wpmdb.secret']);
                        }

                        if (results['wp.wpmdb.import'] === true){
                            grunt.log.ok('WPMDB licence specified, will import database and medias at the end of the task');
                            grunt.config('wp.wpmdb.importDB', true);
                        } else {
                            if(options.bonzai.isForked) {
                                grunt.log.error('Skipping database and medias importation');
                            } else {
                                grunt.log.ok('Licence key will be registered in the .env gitignored file');
                            }
                            grunt.config('wp.wpmdb.importDB', false);
                        }
                    } else {
                        grunt.log.error('No WPMDB licence specified, skipping database and medias importation');
                        //grunt.config('bonzai.env.WPMDB_LICENCE', '');
                        grunt.config('wp.wpmdb.importDB', false);
                    }
                }
            }
        },

        // Plugins
        wp_plugins: {
            options: {
                questions: [
                    {
                        config: 'wp.plugins',
                        type: 'checkbox',
                        message: 'Which plugins would you like to install:',
                        choices: [
                            {
                                "value": "wpackagist-plugin/customer-area",
                                "name": "WP Customer Area",
                                "checked": true
                            },
                            {
                                "value": "wpackagist-plugin/akismet",
                                "name": "Akismet",
                                "checked": false
                            },
                            {
                                "value": "wpackagist-plugin/wordpress-seo",
                                "name": "WP SEO by Yoast",
                                "checked": false
                            },
                            {
                                "value": "wpackagist-plugin/google-analytics-for-wordpress",
                                "name": "Google Analytics by Yoast",
                                "checked": false
                            },
                            {
                                "value": "wpackagist-plugin/force-regenerate-thumbnails",
                                "name": "Force Regenerate Thumbnails",
                                "checked": false
                            },
                            {
                                "value": "wpackagist-plugin/woosidebars",
                                "name": "Woosidebars",
                                "checked": false
                            },
                            {
                                "value": "wpackagist-plugin/duplicate-post",
                                "name": "Duplicate post",
                                "checked": false
                            },
                            {
                                "value": "wpackagist-plugin/posts-to-posts",
                                "name": "Posts2posts",
                                "checked": false
                            },
                            {
                                "value": "wpackagist-plugin/debug-bar",
                                "name": "Debug Bar",
                                "checked": false
                            },
                            {
                                "value": "wpackagist-plugin/limit-login-attempts",
                                "name": "Limit Login attempts",
                                "checked": false
                            },
                            {
                                "value": "wpackagist-plugin/rewrite-rules-inspector",
                                "name": "Rewrite Rules Inspector",
                                "checked": false
                            }
                        ]
                    }
                ]
            }
        },

        // Bump version and create release
        bump: {
            options: {
                questions: [
                    {
                        config: 'bumper.prompt.increment',
                        type: 'list',
                        message: 'Bump version from <%= pkg.version %> to:',
                        choices: [
                            {
                                value: 'build',
                                name: 'Build:  ' + (options.pkg.version + '-?') + ' Unstable, betas, and release candidates.'
                            },
                            {
                                value: 'patch',
                                name: 'Patch:  ' + semver.inc(options.pkg.version, 'patch') + ' Backwards-compatible bug fixes.'
                            },
                            {
                                value: 'minor',
                                name: 'Minor:  ' + semver.inc(options.pkg.version, 'minor') + ' Add functionality in a backwards-compatible manner.'
                            },
                            {
                                value: 'major',
                                name: 'Major:  ' + semver.inc(options.pkg.version, 'major') + ' Incompatible API changes.'
                            },
                            {
                                value: 'custom',
                                name: 'Custom version number (format: 0.0.0)'
                            },
                            {
                                value: 'none',
                                name: 'Skip, do not bump versions.'
                            }
                        ]
                    },
                    {
                        config: 'bumper.prompt.version',
                        type: 'input',
                        message: 'What specific version would you like',
                        when: function (answers) {
                            return answers['bumper.prompt.increment'] === 'custom';
                        },
                        validate: function (value) {
                            var valid = semver.valid(value);
                            return valid || 'Must be a valid semver, such as 1.2.3-rc1. See http://semver.org/ for more details.';
                        }
                    },
                    {
                        config: 'bumper.prompt.useDefaults',
                        type: 'confirm',
                        message: 'Use default values (bump.js) ?',
                        default: false,
                        when: function (answers) {
                            return answers['bumper.prompt.increment'] !== 'none';
                        }
                    },
                    {
                        config: 'bumper.options.prereleaseName',
                        type: 'input',
                        message: 'Enter the pre-release name for your version (eg. 1.2.3-beta):',
                        default: 'beta',
                        when: function (answers) {
                            return ( answers['bumper.prompt.increment'] === 'build' && answers['bumper.prompt.useDefaults'] === false && answers['bumper.prompt.increment'] !== 'none' );
                        },
                        validate: function (value) {
                            var valid = value != "";
                            return valid || 'Please, enter something.';
                        }
                    },
                    {
                        config: 'bumper.options.files',
                        type: 'checkbox',
                        message: 'What should get the new version:',
                        choices: [
                            {
                                value: 'package.json',
                                name: 'package.json' + (!grunt.file.isFile('package.json') ? ' not found, will create one' : ''),
                                checked: grunt.file.isFile('package.json')
                            },
                            {
                                value: 'bower.json',
                                name: 'bower.json' + (!grunt.file.isFile('bower.json') ? ' not found, will create one' : ''),
                                checked: grunt.file.isFile('bower.json')
                            }
                        ],
                        when: function (answers) {
                            return answers['bumper.prompt.useDefaults'] === false && answers['bumper.prompt.increment'] !== 'none';
                        }
                    },
                    {
                        config: 'bumper.options.commit',
                        type: 'confirm',
                        message: 'Should bump changes and changelog be committed ?',
                        default: true,
                        when: function (answers) {
                            return answers['bumper.prompt.useDefaults'] === false && answers['bumper.prompt.increment'] !== 'none';
                        }
                    },
                    {
                        config: 'bumper.options.commitFiles',
                        type: 'checkbox',
                        message: 'Which files should be commited:',
                        when: function (answers) {
                            return ( answers['bumper.options.commit'] === true && answers['bumper.prompt.useDefaults'] === false && answers['bumper.prompt.increment'] !== 'none' );
                        },
                        choices: [
                            {
                                value: 'package.json',
                                name: 'package.json' + (!grunt.file.isFile('package.json') ? ' not found' : ''),
                                checked: grunt.file.isFile('package.json')
                            },
                            {
                                value: 'bower.json',
                                name: 'bower.json' + (!grunt.file.isFile('bower.json') ? ' not found' : ''),
                                checked: grunt.file.isFile('bower.json')
                            },
                            {
                                value: 'CHANGELOG.md',
                                name: 'CHANGELOG.md' + (!grunt.file.isFile('CHANGELOG.md') ? ' not found' : ''),
                                checked: grunt.file.isFile('CHANGELOG.md')
                            }
                        ]
                    },
                    {
                        config: 'bumper.options.createTag',
                        type: 'confirm',
                        message: 'Create a new tag ?',
                        default: true,
                        when: function (answers) {
                            return answers['bumper.prompt.useDefaults'] === false && answers['bumper.prompt.increment'] !== 'none';
                        }
                    },
                    {
                        config: 'bumper.options.push',
                        type: 'confirm',
                        message: 'Push commited files to repository ?',
                        default: true,
                        when: function (answers) {
                            return answers['bumper.prompt.useDefaults'] === false && answers['bumper.prompt.increment'] !== 'none';
                        }
                    }
                ],
                then: function (results) {

                    if (results['bumper.prompt.increment'] !== 'none') {

                        // Update configs
                        if (results['bumper.options.files']) {
                            grunt.config('bump.options.files', results['bumper.options.files']);
                        }
                        if (results['bumper.options.commit']) {
                            grunt.config('bump.options.commit', results['bumper.options.commit']);
                        }
                        if (results['bumper.options.commitFiles']) {
                            grunt.config('bump.options.commitFiles', results['bumper.options.commitFiles']);
                        }
                        if (results['bumper.options.createTag']) {
                            grunt.config('bump.options.createTag', results['bumper.options.createTag']);
                        }
                        if (results['bumper.options.push']) {
                            grunt.config('bump.options.push', results['bumper.options.push']);
                        }
                        if (results['bumper.options.prereleaseName']) {
                            grunt.config('bump.options.prereleaseName', results['bumper.options.prereleaseName']);
                        }

                        // Run Bump tasks
                        if (results['bumper.prompt.increment'] === 'custom') {
                            // Run task with custom number
                            grunt.task.run([
                                'bump-only --setversion=' + results['bumper.prompt.version'],
                                'conventionalChangelog:bump',
                                'shell:changelog',
                                'bump-commit'
                            ]);
                        } else {
                            grunt.task.run([
                                'bump-only:' + results['bumper.prompt.increment'],
                                'conventionalChangelog:bump',
                                'shell:changelog',
                                'bump-commit'
                            ]);
                        }
                    }
                }
            }
        }

    };

};
