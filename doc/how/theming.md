Themes development
==================

Usage
-----

See [Grunt documentation](grunt.md#Developing-themes).

Themes required structure
-------------------------

To make a theme Bonzai compatible, you will need several things :

* Your theme folder name must match one off the `themes_pattern` that can be found in `config/bonzai/application.json`.
  You can either add your theme folder name to this pattern, or rename your theme folder to look something like
  `bonzai-my-awesome-theme`.
* Your theme must contain a composer.json file that match the configuration explained below
* Your theme must be structured as explained below

Theme composer file
-------------------

This is almost a basic composer.json file, except that there are some additional required vars, like :

* extra.textDomain
* extra.slug
* extra.prefix
* extra.grunt

Theses configuration are passed to grunt when using grunt tasks related to theme development.

```
{
  "name": "mytheme",
  "version": "0.0.1",
  "homepage": "http://mytheme.com",
  "description": "MyTheme description",
  "type": "wordpress-theme",
  "license": "proprietary",
  "keywords": [
    "WordPress",
    "theme"
  ],
  "authors": [
    {
      "name": "Firstname Lastname",
      "email": "contact@mypersonalsite.com",
      "homepage": "http://mypersonalsite.com/"
    }
  ],
  "repositories": [
    {
      "type": "composer",
      "url": "https://wpackagist.org"
    }
  ],
  "require": {
    "php": ">=5.4",
    "composer/installers": "~v1.0.25"
  },
  "extra": {
    "textDomain": "textdomainslug",
    "slug": "themeslug",
    "prefix": "slg",
    "installer-paths": {
      "vendor/{$name}": ["type:wordpress-plugin"]
    },
    "grunt": {
      "assets": {
        "copy": {
          "files": [
            {
              "cwd": "public/app/themes/bonzai-mytheme/dev/libs/font-awesome",
              "expand": true,
              "src": [
                "css/font-awesome.min.css",
                "fonts/*"
              ],
              "dest": "public/app/themes/bonzai-mytheme/assets/fonts/font-awesome"
            },
            {
              "cwd": "public/app/themes/bonzai-mytheme/dev/libs/summernote/dist/font",
              "expand": true,
              "src": [
                "*"
              ],
              "dest": "public/app/themes/bonzai-mytheme/assets/fonts"
            }
          ]
        }
      }
    }
  },
  "config": {
    "preferred-install": "dist"
  },
  "minimum-stability": "dev"
}
```

Theme folder structure
----------------------

* app/ `: the folder where you will put all your PHP files, functions, templates, etc ...`
* assets/
    - admin/ `: JS and CSS files loaded on wp-admin`
        + css
        + js
    - frontend/ `: JS and CSS files loaded on frontend`
        + css
        + js
    - backend/ `: JS and CSS files loaded on WP Customer Area Backend`
        + css
        + js
    - images/ `: the gfx`
    - fonts/ `: the fonts`
    - vendor/ `: all the vendor files directly copied in it`
* dev/
    - libs/ `: the folder where bower install dependencies`
    - releases/ `: the folder where you can find your theme zip files`
    - src/ `: this folder contains the source files that will be compiled to assets folder`
        + js/
            * admin/
            * backend/
            * frontend/
            * custom/ `: create a file app.custom_js.myscript.js to compile it to app/custom_js/myscript.js`
        + less/
            * admin/
            * backend/
            * frontend/
            * commons/ `: less files that are included in every others folders (admin, backend, frontend)`
* languages/ `: folder where languages are compiled to`
* vendor/ `: folder where composer install dependencies`
* bower.json
* composer.json
* etc ...




