module.exports = function (grunt, options) {

    return {

        fixcopyln: {
            options: {
                eol: 'lf',
                overwrite: true
            },
            files: [{
                expand: true,
                src: [
                    'config/**/*'
                ],
                dest: ''
            }]
        }

    };

};
