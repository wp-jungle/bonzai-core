module.exports = function (grunt, options) {

    // Create the targets for the themes
    var themes = options.bonzai.themes;

    // A task that will prepare all the assets for our themes
    grunt.registerTask("themes-assets", "Compile themes assets", function () {
        grunt.task.run(['less', 'uglify']);
    });

    // A task that will update librairies from Bower and composer for each registered themes
    grunt.registerTask("themes-libs", "Update themes librairies", function() {
        themes.forEach(function (theme) {
            grunt.task.run([
                "exec:" + theme.slug + "-bower-update",
                "modernizr:" + theme.slug,
                "exec:" + theme.slug + "-composer-update",
                "copy:" + theme.slug + '-assets-copy'
            ]);
        });
    });

};