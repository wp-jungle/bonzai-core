module.exports = function (grunt, options) {

    // Load and instantiate Chance
    var chance = new (require('chance'))(),
        format = {
            length: 64,
            pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()-_[]{}~+=,.;:/?|'
        };

    return {

        // Set WP config vars
        fork_env_set: {
            src: '.env',
            overwrite: true,
            replacements: [
                {
                    from: /DB_NAME=(.)*/g,
                    to: "DB_NAME=\"<%= bonzai.env.DB_NAME %>\""
                },
                {
                    from: /DB_USER=(.)*/g,
                    to: "DB_USER=\"<%= bonzai.env.DB_USER %>\""
                },
                {
                    from: /DB_PASSWORD=(.)*/g,
                    to: "DB_PASSWORD=\"<%= bonzai.env.DB_PASSWORD %>\""
                },
                {
                    from: /DB_HOST=(.)*/g,
                    to: "DB_HOST=\"<%= bonzai.env.DB_HOST %>\""
                },
                {
                    from: /DB_PREFIX=(.)*/g,
                    to: 'DB_PREFIX=\"<%= app.dbPrefix %>\"'
                },
                {
                    from: /BONZAI_DB_ROOT=(.)*/g,
                    to: "BONZAI_DB_ROOT=\"<%= bonzai.env.BONZAI_DB_ROOT %>\""
                },
                {
                    from: /WP_ENV=(.)*/g,
                    to: "WP_ENV=\"<%= bonzai.env.WP_ENV %>\""
                },
                {
                    from: /WP_HOME=(.)*/g,
                    to: "WP_HOME=\"http://<%= pkg.name %>.test\""
                },
                {
                    from: /WP_SITEURL=(.)*/g,
                    to: "WP_SITEURL=\"http://<%= pkg.name %>.test/wp\""
                },
                {
                    from: /BONZAI_WP_TITLE=(.)*/g,
                    to: "BONZAI_WP_TITLE=\"<%= bonzai.env.BONZAI_WP_TITLE %>\""
                },
                {
                    from: /BONZAI_ADMIN_NAME=(.)*/g,
                    to: "BONZAI_ADMIN_NAME=\"<%= bonzai.env.BONZAI_ADMIN_NAME %>\""
                },
                {
                    from: /BONZAI_ADMIN_PASSWORD=(.)*/g,
                    to: "BONZAI_ADMIN_PASSWORD=\"<%= bonzai.env.BONZAI_ADMIN_PASSWORD %>\""
                },
                {
                    from: /BONZAI_ADMIN_EMAIL=(.)*/g,
                    to: "BONZAI_ADMIN_EMAIL=\"<%= bonzai.env.BONZAI_ADMIN_EMAIL %>\""
                },
                {
                    from: /WPMDB_LICENCE=(.)*/g,
                    to: "WPMDB_LICENCE=\"<%= bonzai.env.WPMDB_LICENCE %>\""
                },
                {
                    from: /BONZAI_CURRENT_USER_RSA=(.)*/g,
                    to: "BONZAI_CURRENT_USER_RSA=\"<%= bonzai.env.BONZAI_CURRENT_USER_RSA %>\""
                }
            ]
        },
        // Just replace wpmdb licence for wpmdb:pull task
        wpmdb_licence: {
            src: '.env',
            overwrite: true,
            replacements: [
                {
                    from: /WPMDB_LICENCE=(.)*/g,
                    to: "WPMDB_LICENCE=\"<%= bonzai.env.WPMDB_LICENCE %>\""
                }
            ]
        },

        // Set WP config vars
        clone_env_set: {
            src: '.env',
            overwrite: true,
            replacements: [
                {
                    from: /DB_NAME=(.)*/g,
                    to: "DB_NAME=\"<%= app.dbName %>\""
                },
                {
                    from: /DB_USER=(.)*/g,
                    to: "DB_USER=\"<%= app.dbUser %>\""
                },
                {
                    from: /DB_PASSWORD=(.)*/g,
                    to: "DB_PASSWORD=\"<%= app.dbPassword %>\""
                },
                {
                    from: /DB_HOST=(.)*/g,
                    to: "DB_HOST=\"<%= app.dbHost %>\""
                },
                {
                    from: /DB_PREFIX=(.)*/g,
                    to: 'DB_PREFIX=\"<%= app.dbPrefix %>\"'
                },
                {
                    from: /BONZAI_DB_ROOT=(.)*/g,
                    to: "BONZAI_DB_ROOT=\"<%= app.dbRootPassword %>\""
                },
                {
                    from: /WP_ENV=(.)*/g,
                    to: "WP_ENV=\"<%= bonzai.env.WP_ENV %>\""
                },
                {
                    from: /WP_HOME=(.)*/g,
                    to: "WP_HOME=\"http://<%= pkg.name %>.test\""
                },
                {
                    from: /WP_SITEURL=(.)*/g,
                    to: "WP_SITEURL=\"http://<%= pkg.name %>.test/wp\""
                },
                {
                    from: /BONZAI_WP_TITLE=(.)*/g,
                    to: "BONZAI_WP_TITLE=\"<%= bonzai.env.BONZAI_WP_TITLE %>\""
                },
                {
                    from: /BONZAI_ADMIN_NAME=(.)*/g,
                    to: "BONZAI_ADMIN_NAME=\"<%= bonzai.env.BONZAI_ADMIN_NAME %>\""
                },
                {
                    from: /BONZAI_ADMIN_PASSWORD=(.)*/g,
                    to: "BONZAI_ADMIN_PASSWORD=\"<%= bonzai.env.BONZAI_ADMIN_PASSWORD %>\""
                },
                {
                    from: /BONZAI_ADMIN_EMAIL=(.)*/g,
                    to: "BONZAI_ADMIN_EMAIL=\"<%= bonzai.env.BONZAI_ADMIN_EMAIL %>\""
                },
                {
                    from: /WPMDB_LICENCE=(.)*/g,
                    to: "WPMDB_LICENCE=\"<%= bonzai.env.WPMDB_LICENCE %>\""
                },
                {
                    from: /BONZAI_CURRENT_USER_RSA=(.)*/g,
                    to: "BONZAI_CURRENT_USER_RSA=\"<%= bonzai.env.BONZAI_CURRENT_USER_RSA %>\""
                }
            ]
        },
        fork_package: {
            src: 'package.json',
            overwrite: true,
            replacements: [
                {
                    from: /(\s+|\t+)"name":(.)*/g,
                    to: '$1"name": "<%= pkg.name %>",'
                },
                {
                    from: /(\s+|\t+)"description":(.)*/g,
                    to: '$1"description": "<%= pkg.description %>",'
                },
                {
                    from: /(\s+|\t+)"version":(.)*/g,
                    to: '$1"version": "<%= pkg.version %>",'
                },
                {
                    from: /(\s+|\t+)"author":(.)*/g,
                    to: '$1"author": "<%= pkg.author %>",'
                },
                {
                    from: /(\s+|\t+)"url":(.)*/g,
                    to: '$1"url": "<%= pkg.repository.url %>"'
                }
            ]
        },
        fork_application: {
            src: 'config/bonzai/application.json',
            overwrite: true,
            replacements: [
                {
                    from: /(\s+|\t+)("domain":[\s|\t]+)"(.*?)"(,?)/g,
                    to: '$1$2"<%= app.domain %>"$4'
                },
                {
                    from: /(\s+|\t+)("slug":[\s|\t]+)"(.*?)"(,?)/g,
                    to: '$1$2"<%= pkg.name %>"$4'
                },
                {
                    from: /(\s+|\t+)("webRoot":[\s|\t]+)"(.*?)"(,?)/g,
                    to: '$1$2"<%= app.webRoot %>"$4'
                },
                {
                    from: /(\s+|\t+)("dbHost":[\s|\t]+)"(.*?)"(,?)/g,
                    to: '$1$2"<%= bonzai.env.DB_HOST %>"$4'
                },
                {
                    from: /(\s+|\t+)("dbRootPassword":[\s|\t]+)"(.*?)"(,?)/g,
                    to: '$1$2"<%= bonzai.env.BONZAI_DB_ROOT %>"$4'
                },
                {
                    from: /(\s+|\t+)("dbName":[\s|\t]+)"(.*?)"(,?)/g,
                    to: '$1$2"<%= bonzai.env.DB_NAME %>"$4'
                },
                {
                    from: /(\s+|\t+)("dbUser":[\s|\t]+)"(.*?)"(,?)/g,
                    to: '$1$2"<%= bonzai.env.DB_USER %>"$4'
                },
                {
                    from: /(\s+|\t+)("dbPassword":[\s|\t]+)"(.*?)"(,?)/g,
                    to: '$1$2"<%= bonzai.env.DB_PASSWORD %>"$4'
                },
                {
                    from: /(\s+|\t+)("dbPrefix":[\s|\t]+)"(.*?)"(,?)/g,
                    to: '$1$2"<%= app.dbPrefix %>"$4'
                },
                {
                    from: /(\s+|\t+)("type":[\s|\t]+)"(.*?)"(,?)/g,
                    to: '$1$2"<%= wp.config.wp.type %>"$4'
                }
            ]
        },
        wp_salts: {
            src: '.env',
            overwrite: true,
            replacements: [
                {
                    from: /AUTH_KEY=(.)*/g,
                    to: "AUTH_KEY=\"" + chance.string(format) + "\""
                },
                {
                    from: /SECURE_AUTH_KEY=(.)*/g,
                    to: "SECURE_AUTH_KEY=\"" + chance.string(format) + "\""
                },
                {
                    from: /LOGGED_IN_KEY=(.)*/g,
                    to: "LOGGED_IN_KEY=\"" + chance.string(format) + "\""
                },
                {
                    from: /NONCE_KEY=(.)*/g,
                    to: "NONCE_KEY=\"" + chance.string(format) + "\""
                },
                {
                    from: /AUTH_SALT=(.)*/g,
                    to: "AUTH_SALT=\"" + chance.string(format) + "\""
                },
                {
                    from: /SECURE_AUTH_SALT=(.)*/g,
                    to: "SECURE_AUTH_SALT=\"" + chance.string(format) + "\""
                },
                {
                    from: /LOGGED_IN_SALT=(.)*/g,
                    to: "LOGGED_IN_SALT=\"" + chance.string(format) + "\""
                },
                {
                    from: /NONCE_SALT=(.)*/g,
                    to: "NONCE_SALT=\"" + chance.string(format) + "\""
                }
            ]
        },
        wp_multisite_options: {
            src: 'config/bonzai/wp-constants/_options.php',
            overwrite: true,
            replacements: [
                {
                    from: /\/\/ define\(\'MULTISITE\'\, true\);/g,
                    to: "define('MULTISITE', true);"
                },
                {
                    from: /\/\/ define\(\'SUBDOMAIN_INSTALL\'\, false\);/g,
                    to: "define('SUBDOMAIN_INSTALL', false);"
                },
                {
                    from: /\/\/ define\(\'PATH_CURRENT_SITE\'\, \'\/\'\);/g,
                    to: "define('PATH_CURRENT_SITE', '/');"
                },
                {
                    from: /\/\/ define\(\'SITE_ID_CURRENT_SITE\'\, 1\);/g,
                    to: "define('SITE_ID_CURRENT_SITE', 1);"
                },
                {
                    from: /\/\/ define\(\'BLOG_ID_CURRENT_SITE\'\, 1\);/g,
                    to: "define('BLOG_ID_CURRENT_SITE', 1);"
                }
            ]
        },
        wp_multisite_environments: {
            src: 'config/bonzai/wp-constants/{development,staging,production}.php',
            overwrite: true,
            replacements: [
                {
                    from: /\/\/ define\('DOMAIN_CURRENT_SITE\'(.*)/g,
                    to: "define\('DOMAIN_CURRENT_SITE\'$1"
                }
            ]
        }

    };

};