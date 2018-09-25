module.exports = function (grunt, options) {

    return {

        options: {
            files: ["package.json"],
            updateConfigs: [ "pkg" ],
            commit: true,
            commitMessage: "Release v%VERSION%",
            commitFiles: ["./package.json", "./CHANGELOG.md"],
            createTag: true,
            tagName: "%VERSION%",
            tagMessage: "Version %VERSION%",
            push: true,
            pushTo: "origin",
            gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d",
            globalReplace: false,
            prereleaseName: "beta",
            regExp: false
        }

    };

};