module.exports = function (grunt, options) {

    /*
     * BANNERS
     ********************************************/

    var banner = {};

    banner["welcome"] = function () {
        grunt.log.subhead(grunt.template.process(
            '......................................................\n' +
            '.########...#######..##....##.########....###....####.\n' +
            '.##.....##.##.....##.###...##......##....##.##....##..\n' +
            '.##.....##.##.....##.####..##.....##....##...##...##..\n' +
            '.########..##.....##.##.##.##....##....##.....##..##..\n' +
            '.##.....##.##.....##.##..####...##.....#########..##..\n' +
            '.##.....##.##.....##.##...###..##......##.....##..##..\n' +
            '.########...#######..##....##.########.##.....##.####.\n' +
            '......................................................\n' +
            '. * Version <%= bonzai.version %>\n' +
            '. * Copyright (C) 2018 Thomas Lartaud\n' +
            '......................................................'
        ));
    };

    banner["construct"] = function () {
        grunt.log.writeln(grunt.template.process(
            '......................................................\n' +
            '. This construct task is a Site Installer Wizard that\n' +
            '. will help you to easily clone your web project and\n' +
            '. get it running in few minutes. Please read the main\n' +
            '. README.md file for more information.\n' +
            '......................................................'
        ));
    };

    banner["construct_fork"] = function () {
        grunt.log.writeln(grunt.template.process(
            '......................................................\n' +
            '. It seems that this is the first time you type\n' +
            '. `grunt construct` so we have redirected you to\n' +
            '. `grunt construct:fork`. This task will help you to\n' +
            '. fork Bonzai correctly as your own project and build\n' +
            '. it to let you start developing in no time.\n' +
            '......................................................'
        ));
    };

    grunt.registerTask('meta', function (target) {

        banner[target]();

    });

    /*
     * WPMDB
     ********************************************/

    // Check if we need to import database from remote
    grunt.registerTask('wpmdb_import', function () {
        if (grunt.config.get('bonzai.env.WPMDB_LICENCE') !== '' && grunt.config('wp.wpmdb.importDB') === true) {
            grunt.task.run('shell:wpmdb_import');
        }
    });

};
