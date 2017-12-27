module.exports = function (grunt, options) {

    grunt.registerTask('wpmdb:pull', function () {

        var prompts = [

            // Say Hello
            // 'meta:welcome',
            // 'meta:construct',

            // Required prompts
            'prompt:wp_wpmdb'
        ];

        grunt.task.run(prompts).then(function () {

            var tasks = [];

            if (grunt.config('bonzai.env.WPMDB_LICENCE') !== '' && grunt.config('bonzai.env.WPMDB_LICENCE') !== 'Your_Licence_Key' && grunt.config('bonzai.env.WPMDB_LICENCE') !== false) {
                tasks.push(
                    // Update variables
                    'replace:wpmdb_licence'
                );
            }

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

};
