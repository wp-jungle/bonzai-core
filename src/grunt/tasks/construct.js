module.exports = function (grunt, options) {

    grunt.registerTask('construct', function () {
        if (options.pkg.name === "wp-bonzai")
            grunt.task.run('construct:fork');
        else
            grunt.task.run('construct:local');
    });

    grunt.registerTask('construct:local', function () {

        var prompts = [

            // Say Hello
            'meta:welcome',
            'meta:construct',

            // Required prompts
            'prompt:wp_environment',
            'prompt:wp_install',
            'prompt:vagrant',
            'prompt:wp_wpmdb',
            'prompt:wp_salts'
        ];

        grunt.task.run(prompts).then(function () {

            var tasks = [

                // Fork the files from Bonzai templates
                'copy:homestead',

                // Install Composer dependencies
                'exec:run_composer',

                // Vagrant
                'exec:vagrant_up',

                // Update variables
                'replace:clone_env_set',

            ];

            // Single/multi site installation
            if (grunt.config('app.type') === 'singlesite') {
                tasks.push(
                    // Install Wordpress
                    'exec:wp_install', // will check if wp is installed before running wp installation
                    'exec:wp_permalinks',
                    'exec:wp_settings',

                    // Cleanup
                    'exec:wp_update_db',
                    'exec:wp_cleanup'
                );
            } else {
                tasks.push(
                    // Install Wordpress
                    'exec:wp_install_multisite', // will check if wp is installed before running wp installation
                    //'exec:wp_permalinks',
                    'exec:wp_settings',

                    // Cleanup
                    'exec:wp_update_db_multisite',
                    'exec:wp_cleanup'
                );
            }

            // WPMDB
            if (grunt.config('bonzai.env.WPMDB_LICENCE') !== '') {

                if (!grunt.file.exists(options.app.webRoot + '/app/plugins/wp-migrate-db-pro/wp-migrate-db-pro.php')){

                    // Download and unzip WPMDB plugins
                    tasks.push(
                        'curl:wpmdb',
                        'curl:wpmdb_medias',
                        'curl:wpmdb_cli',
                        'unzip:wpmdb',
                        'unzip:wpmdb_medias',
                        'unzip:wpmdb_cli'
                    );
                }

                tasks.push(
                    // Activate wpmdb plugins
                    'shell:wpmdb_activate_plugins',

                    // Start Pull DB engine
                    'wpmdb_import'
                );

            }

            grunt.task.run(tasks);
        });

    });

    grunt.registerTask('construct:fork', function () {

        var prompts = [

            // Say Hello
            'meta:welcome',
            'meta:construct_fork',

            // Required prompts
            'prompt:fork',
            'prompt:wp_config',
            'prompt:wp_install',
            'prompt:vagrant',
            //'prompt:wp_plugins',
            'prompt:wp_wpmdb',
            'prompt:wp_salts'
        ];

        grunt.task.run(prompts).then(function () {
            var tasks = [
                // Fork the files from Bonzai templates
                'copy:fork',
                'replace:fork_package',
                'replace:fork_application',
                'lineending:fixcopyln',

                // Install Composer dependencies
                'exec:run_composer',

                // Vagrant
                'exec:vagrant_up',

                // Update variables
                'replace:fork_env_set'

            ];
            // Single/multi site installation
            if (grunt.config("wp.config.wp.type") === 'singlesite') {
                tasks.push(
                    // Install Wordpress
                    'exec:wp_install', // will check if wp is installed before running wp installation
                    'exec:wp_permalinks',
                    'exec:wp_settings'
                );
                if (grunt.config('bonzai.env.WPMDB_LICENCE') !== '') {
                    tasks.push(
                        // Install WPMDB
                        'curl:wpmdb',
                        'curl:wpmdb_medias',
                        'curl:wpmdb_cli',
                        'unzip:wpmdb',
                        'unzip:wpmdb_medias',
                        'unzip:wpmdb_cli',
                        'shell:wpmdb_activate_plugins'
                    );
                }
                tasks.push(
                    // Customize this WP Install with some known plugins
                    //'exec:wp_plugins',

                    // Cleanup
                    'exec:wp_update_db',
                    'exec:wp_cleanup'
                );
            } else {
                tasks.push(
                    // Install Wordpress
                    'exec:wp_install_multisite', // will check if wp is installed before running wp installation
                    'copy:wp_multisite',
                    'replace:wp_multisite_options',
                    'replace:wp_multisite_environments',
                    //'exec:wp_permalinks',
                    'exec:wp_settings'
                );
                if (grunt.config('bonzai.env.WPMDB_LICENCE') !== '') {
                    tasks.push(
                        // Install WPMDB
                        'curl:wpmdb',
                        'curl:wpmdb_medias',
                        'curl:wpmdb_cli',
                        'unzip:wpmdb',
                        'unzip:wpmdb_medias',
                        'unzip:wpmdb_cli',
                        'shell:wpmdb_activate_plugins'
                    );
                }
                tasks.push(

                    // Customize this WP Install with some known plugins
                    'exec:wp_plugins',

                    // Cleanup
                    'exec:wp_update_db_multisite',
                    'exec:wp_cleanup'
                );
            }

            grunt.task.run(tasks);
        });
    });

};
