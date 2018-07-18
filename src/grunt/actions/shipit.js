module.exports = function (grunt) {

    return {
        "default": {
            "workspace": "/tmp/workspace",
            "repositoryUrl": "<%= pkg.repository.url %>",
            "url": "http://<%= pkg.name %>.test",
            "deployTo": "/tmp/deployTo",
            "ignores": [
                ".git",
                ".gitignore",
                ".gitattributes",
                ".idea",
                "Gruntfile.js",
                "package.json",
                "ruleset.xml",
                "Vagrantfile",
                "puphpet",
                "config/puphpet",
                "config/bonzai/grunt",
                "config/bonzai/*.json",
                "<%= app.webRoot %>/app/uploads",
                "<%= app.webRoot %>/app/cache",
                "<%= app.webRoot %>/app/advanced-cache.php",
                "<%= app.webRoot %>/app/wp-rocket-config",
                "html",
                "tmp"
            ],
            "keepReleases": 5,
            "branch": "develop",
            "shallowClone": true,
            "updateSubmodules": true,
            "shared": {
                "overwrite": true,
                "triggerEvent": "updated",
                "dirs": [
                    {
                        "path": "<%= app.webRoot %>/app/uploads",
                        "overwrite": true,
                        "chmod": "-R 755"
                    },
                    {
                        "path": "<%= app.webRoot %>/app/cache",
                        "overwrite": true,
                        "chmod": "-R 755"
                    },
                    {
                        "path": "<%= app.webRoot %>/app/wp-rocket-config",
                        "overwrite": true,
                        "chmod": "-R 755"
                    }
                ],
                "files": [
                    ".env",
                    "<%= app.webRoot %>/.htaccess",
                    "<%= app.webRoot %>/app/advanced-cache.php"
                ]
            }
        },

        "staging": {
            "servers": "deploy@staging.<%= app.domain %>",
            "deployTo": "/staging.<%= app.domain %>",
            "url": "http://staging.<%= app.domain %>",
            "shared": {
                "symlinkPath": "/var/www/vhosts/<%= app.domain %>/staging.<%= app.domain %>/shared"
            }
        },

        "production": {
            "servers": "deploy@<%= app.domain %>",
            "deployTo": "/httpdocs",
            "url": "http://<%= app.domain %>",
            "branch": "master",
            "shared": {
                "symlinkPath": "/var/www/vhosts/<%= app.domain %>/httpdocs/shared"
            }
        }
    };

};