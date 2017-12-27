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
                    'config/**/*',
                    'puphpet/config.yaml',
                    'puphpet/puppet/Puppetfile'
                ],
                dest: ''
            }]
        }

    };

};
