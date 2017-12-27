module.exports = function (grunt, options) {

    var targets = {};
    var themes = options.bonzai.themes;

    themes.forEach(function (theme) {
        targets[theme.slug] = theme.grunt.modernizr || {
                "parseFiles": true,
                "customTests": [],
                "devFile": theme.path + "/dev/libs/modernizr/src/Modernizr.js",
                "dest": theme.path + "/assets/vendor/modernizr.min.js",
                "tests": [
                    "cookies",
                    "eventlistener",
                    "hashchange",
                    "hiddenscroll",
                    "ie8compat",
                    "input",
                    "inputtypes",
                    "json",
                    "boxsizing",
                    "mediaqueries"
                ],
                "options": [
                    "addTest",
                    "hasEvent",
                    "mq",
                    "html5printshiv",
                    "html5shiv",
                    "setClasses"
                ],
                "uglify": true,
                "files": {
                    "src": [
                        theme.path + "/dev/src/**/*"
                    ]
                }
            }
    });

    return targets;
};