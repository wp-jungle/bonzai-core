module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = function (opt) {
        return {
            "options": {
                "compress": true,
                "yuicompress": true,
                "optimization": 2,
                "sourceMap": true,
                "sourceMapFilename": opt.sourceMapFilename,
                "sourceMapURL": opt.sourceMapURL,
                "sourceMapBasepath": opt.sourceMapBasepath,
                "sourceMapRootpath": opt.sourceMapRootpath
            }
        }
    };

    var targets = {};

    // Create the targets for the themes
    var themes = options.bonzai.themes;

    themes.forEach(function (theme) {

        // Paths to less and css files
        var lessFilesFolder = theme.path + "/dev/src/less";
        var cssOutputFolder = theme.path + "/assets";

        if(!grunt.file.exists(lessFilesFolder)) {return;}

        // Each skin can contain multiple less files to compile
        // Dynamically read LESS source folder and store paths
        // Less files names must be : _{myFile}.less
        var lessFilesList = [];
        grunt.file.recurse(lessFilesFolder, function (abspath, rootdir, subdir, filename) {
            if ((abspath === rootdir + "/" + subdir + "/" + filename) && filename.match(/^_[0-9a-zA-Z\-_]*\.less$/g)) {
                var name = filename.substring(0, filename.lastIndexOf('.')).slice(1).replace('_','');
                lessFilesList.push({
                    name: name,
                    abspath: abspath,
                    rootdir: rootdir,
                    subdir: subdir,
                    filename: filename
                });
            }
        });

        // Create options for all registered LESS files
        for (var i = 0; i < lessFilesList.length; i++) {
            var skinFiles = {};
            skinFiles[cssOutputFolder + "/" + lessFilesList[i].subdir + "/css/" + lessFilesList[i].name + ".css"] = [
                lessFilesList[i].abspath
            ];

            var targetName = theme.slug + "-" + lessFilesList[i].subdir + "-" + lessFilesList[i].name;

            targets[targetName] = extend(true, {}, baseOptions(
                {
                    "sourceMapFilename": cssOutputFolder + "/" + lessFilesList[i].subdir + "/css/" + lessFilesList[i].name + '.css.map',
                    "sourceMapURL": lessFilesList[i].name + ".css.map",
                    "sourceMapBasepath": theme.path + "/",
                    "sourceMapRootpath": "../../../"
                }
            ), {
                files: skinFiles
            });
        }
    });

    return targets;
};