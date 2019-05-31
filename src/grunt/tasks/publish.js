module.exports = function (grunt, options) {

    // The tasks to deploy to our server
    grunt.registerTask("publish", "Deployment task", function (target) {
        //var branch = ( 'branch' in options.shipit.staging ) ? options.shipit.staging.branch : options.shipit.default.branch;
        //grunt.log.subhead('Please, make sure your project is currently running on the ' + branch + ' git branch and that there is no pending change.');
        //grunt.task.run("shipit:" + target, "deploy");
        grunt.task.run("shipit:" + target, "deploy");
    });

    grunt.registerTask("undo-publish", "Rollback task", function (target) {
        grunt.task.run("shipit:" + target, "rollback");
    });

    grunt.registerTask('publish:pre_deploy', function () {
        grunt.task.run([
            'checkbranch:develop:true',
            'checkpending'
        ]);

        if (grunt.shipit.environment === 'production') {
            grunt.task.run([
                'prompt:bump'
            ]).then(function() {
                if (grunt.config('bumper.prompt.increment') !== 'none') {
                    grunt.task.run([
                        'gitcheckout:master',
                        'gitmerge:from-develop',
                        'gitpush:master',
                        'gitcheckout:develop'
                    ]);
                }
            });
        }
    });

    grunt.registerTask('publish:remote', function () {
        // Shipit-shared is bound to `on published` shipit-deploy event.
        // It will normally be executed before this tasks list.

        // Prepare some vars
        var deployPath = grunt.shipit.config.deployTo,
            releasesPath = grunt.shipit.releasesPath,
            releaseDir = grunt.shipit.releaseDirname,
            releasePath = grunt.shipit.releasesPath + "/" + grunt.shipit.releaseDirname,
            scriptPath = releasePath + "/config/bonzai/shell/";

        // Execute custom Post-deploy Script on current deploying remote if it exists locally
        if (grunt.file.exists('config/bonzai/shell/post-deploy.sh')) {
            grunt.shipit.remote(
                'cd ' + scriptPath + ' && . post-deploy.sh "' + deployPath + '" "' + releasesPath + '" "' + releaseDir + '"'
            );
        }

    });

    grunt.registerTask('publish:dependencies', function () {

        var unyson = '';
        // Build Unyson extension
        if(grunt.file.exists(options.app.webRoot + "/app/plugins/unyson/unyson.php")) {
            unyson = " && cp /home/vagrant/code/config/bonzai/shell/unyson-install.bash " + grunt.shipit.config.workspace + "/" + options.app.webRoot +  "/app/plugins/unyson/framework/extensions/clone-all.bash && cd '" + grunt.shipit.config.workspace + "/" + options.app.webRoot + "/app/plugins/unyson/framework/extensions" + "' && ./clone-all.bash";
        }

        // Run dependencies installation
        grunt.shipit.local(
            "cd '" + grunt.shipit.config.workspace + "' && composer install" + unyson + ";", this.async()
        );
    });

    grunt.registerTask('publish:dependencies_theme', function () {
        grunt.shipit.local(
            "cd '" + grunt.shipit.config.workspace + "/" + options.app.webRoot + "/app/themes/" + options.app.theme + "' && composer install;", this.async()
        );
    });

    grunt.shipit.on('deploy', function () {
        grunt.task.run(['publish:pre_deploy']);
    });

    grunt.shipit.on('fetched', function () {
        grunt.task.run(['publish:dependencies']);
        if (options.app.theme !== "") {
            grunt.task.run(['publish:dependencies_theme']);
        }
    });

    grunt.shipit.on('published', function () {
        grunt.task.run(['publish:remote']);
    });
};