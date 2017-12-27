module.exports = function (grunt) {

    return {

        /**
         * List the themes in a given directory
         *
         * @param cwd The path to the folder containing the themes (relative to your gruntfile)
         * @param namePatterns An array of globbing patterns to match the theme folder names
         */
        listThemes: function (cwd, namePatterns) {
            var themes = [];
            var folders = grunt.file.expand({cwd: cwd}, namePatterns);

            folders.forEach(function (slug) {
                var path = cwd + '/' + slug;
                var pkg = grunt.file.readJSON(path + '/composer.json');

                // If product slug is not specified, use the slug and do some renaming to account for new product names
                if (undefined === pkg.extra) {
                    pkg.extra = {};
                }

                // Composer file can contain optional grunt config related to the theme
                if (undefined === pkg.extra.grunt) {
                    pkg.extra.grunt = {};
                }

                var theme = {
                    slug: pkg.extra.slug,
                    version: pkg.version,
                    path: path,
                    textDomain: pkg.extra.textDomain,
                    langFolder: 'languages',
                    grunt: pkg.extra.grunt
                };

                themes.push(theme);
            });

            return themes;
        },

        /**
         * Function to dump / debug an object
         */
        dump: function (obj) {
            var out = '';
            for (var i in obj) {
                out += i + ": " + obj[i] + "\n";
            }

            return out;
        },

        /**
         * Function to copy some missing files
         */
        copyMissing: function (parameters) {

            // Get data
            var file = parameters.file;
            var from = parameters.from;
            var replaceComments = parameters.replaceComments;
            var callBack = parameters.callBack;

            // Create config file from default if it doesn't exists yet
            if (!grunt.file.exists(file)) {
                grunt.file.copy(
                    from,
                    file,
                    {
                        process: function (content) {
                            // Remove comment lines into the copied file
                            return replaceComments ? content.replace(/(?:\s*)?#\s(.)*(\r?\n|\r)/g, "") : content;
                        }
                    }
                );
                if (callBack !== false && isFunction(callBack))
                    callBack();
            }
        },

        /**
         * Loop through the copyMissing function to copy many files at once
         */
        copyMissingFiles: function (filesToCopy) {
            for (var i = 0; i < filesToCopy.length; i++) {
                var obj = filesToCopy[i];
                for (var key in obj) {
                    this.copyMissing({
                        file: obj["file"],
                        from: obj["from"],
                        replaceComments: obj["replaceComments"],
                        callBack: obj["callBack"]
                    });
                }
            }
        },

        /**
         * Function to check if given object is a function
         */
        isFunction: function (functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }

    }

};