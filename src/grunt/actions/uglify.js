module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = function (opt) {
        return {
            options: {
                compress: false,
                mangle: false,
                sourceMap: true,
                sourceMapName: opt.sourceMapName,
                sourceMapRoot: opt.sourceMapRoot
            }
        }
    };
    var targets = {};
    var themes = options.bonzai.themes;

    // Create the targets for the themes
    themes.forEach(function (theme) {
        var backendAsset = theme.path + "/assets/backend/js/" + theme.slug + ".min.js";
        var frontendAsset = theme.path + "/assets/frontend/js/" + theme.slug + ".min.js";

        var files = {};
        files[frontendAsset] = [
            theme.path + '/dev/src/js/common/**/*.js',
            theme.path + '/dev/src/js/frontend/**/*.js'
        ];

        targets[theme.slug + '-frontend'] = extend(true, {}, baseOptions(
            {
                sourceMapName: theme.path + "/assets/frontend/js/" + theme.slug + ".js.map",
                sourceMapRoot: "./"
            }),
            {
                files: files
            }
        );

        files = {};
        files[backendAsset] = [
            theme.path + '/dev/src/js/common/**/*.js',
            theme.path + '/dev/src/js/backend/**/*.js'
        ];

        targets[theme.slug + '-backend'] = extend(true, {}, baseOptions(
            {
                sourceMapName: theme.path + "/assets/backend/js/" + theme.slug + ".js.map",
                sourceMapRoot: "./"
            }),
            {
                files: files
            }
        );

        // Custom JS files compiler
        var customJsFilesFolder = theme.path + '/dev/src/js/custom',
            jsFilesList = [],
            customFile = [];

        if(grunt.file.exists(customJsFilesFolder)) {

            // Each skin can contain multiple less files to compile
            // Dynamically read JS source folder and store paths
            // JS files names must be : _{myFile}.js
            grunt.file.recurse(customJsFilesFolder, function (abspath, rootdir, subdir, filename) {
                if (filename.match(/^_[0-9a-zA-Z\-_.]*\.js$/g)) {
                    var name = filename.substring(0, filename.lastIndexOf('.')).slice(1).replace('_', '');
                    jsFilesList.push({
                        name: name,
                        abspath: abspath,
                        rootdir: rootdir,
                        subdir: subdir,
                        filename: filename
                    });
                }
            });

            // Create options for all registered JS files
            for (var i = 0; i < jsFilesList.length; i++) {

                customFile = [];
                customFile['explodedName'] = jsFilesList[i].name.split('.');
                customFile['name'] = customFile['explodedName'].slice(-1)[0];
                customFile['toPath'] = customFile['explodedName'].join('/');

                files = {};
                files[theme.path + '/' + customFile['toPath'] + '.min.js'] = [
                    jsFilesList[i].abspath
                ];

                targets[theme.slug + '-custom-' + customFile['name']] = extend(true, {}, baseOptions(
                    {
                        sourceMapName: theme.path + '/' + customFile['toPath'] + ".js.map",
                        sourceMapRoot: './'
                    }),
                    {
                        files: files
                    }
                );
            }
        }

        if (theme.grunt.assets.uglify) {
            targets[theme.slug + "-composer-assets"] = extend(true, {}, {}, theme.grunt.assets.uglify);
        }

    });

    return targets;
};