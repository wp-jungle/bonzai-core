module.exports = function (grunt, options) {

    return {

        options: {
            changelogOpts: {
                // conventional-changelog options go here
                repository: "<%= pkg.repository.url %>"
            },
            context: {
                // context goes here
            },
            gitRawCommitsOpts: {
                // git-raw-commits options go here
            },
            parserOpts: {
                // conventional-commits-parser options go here
            },
            writerOpts: {
                // conventional-changelog-writer options go here
            }
        },
        bump: {
            src: 'CHANGELOG.md'
        }

    };

};