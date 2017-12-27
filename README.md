Bonzai
=======

**Bonzai** is a kick-starting Wordpress development stack for mastering your automated deployments and others
repetitive tasks.

> Much of the philosphy behind **Bonzai** is inspired by the [Bedrock Stack](https://github.com/roots/bedrock), but as
> we are running Windows environments, we are more familiar with some Grunt tasks written in Javascript, instead of
> Ruby. So we made our own.

Features
--------

* Vagrant environment ready using [Puphpet](https://puphpet.com)
* Dependency management with [Composer](http://getcomposer.org)
* Automated construction with [Grunt](http://gruntjs.com/)
* Automated deployments with [Shipit](https://github.com/shipitjs/shipit)
* Environment variables with [Dotenv](https://github.com/vlucas/phpdotenv)
* Better folder structure and Integrated plugins
* And more ...

Summary
-------

It is recommended to read the docs in the following order :

- **Introduction**
  * [Requirements](doc/introduction/requirements.md)
  * [Getting started](doc/introduction/start.md)
- **How it works**  
  * [Environments variables](doc/how/environments.md)
  * [Automated tasks using Grunt](doc/how/grunt.md)
  * [Vagrant environment using Puphpet](doc/how/vagrant.md)
  * [Plugins management using Composer](doc/how/composer.md)
  * [Custom cron](doc/how/cron.md)
  * [Automatically generated changelog](doc/how/commits.md)
  * [Local database backups](doc/how/backups.md)
  * [Files and database deployments](doc/how/deploying.md)
  * [Themes development](doc/how/theming.md)
- **Additional**
  * [Changelog](CHANGELOG.md)
  * [Contribute](CONTRIBUTE.md)
  * [Licence](LICENCE.md)
  
Folder Structure
----------------

The organization of **Bonzai** is similar to putting WordPress in its own subdirectory but with some improvements.

* In order not to expose sensitive files in the webroot, **Bonzai** moves what's required into a `public/` directory
  including the vendor's `wp/` source, and the `wp-content` source. You can customize this folder name during the first
  installation, but make sure to not name it like a folder that already exist in the folder structure.
* `wp-content` (or maybe just `content`) has been named `app` to better reflect its contents. It contains application
  code and not just "static content". It also matches up with other frameworks such as Symfony and Rails.
* `wp-config.php` remains in the `public/` because it's required by WP, but it only acts as a loader. The actual
  configuration files have been moved to `config/` for better separation.
* `vendor/` is where the Composer managed dependencies are installed to.
* `wp/` is where the WordPress core lives. It's also managed by Composer but can't be put under `vendor` due to WP
  limitations.
  
Click on the links below for more information about the directory/file.

+ [backups/](doc/how/backups.md)
    + databases/ `: Folder used to store local database dumps`
+ config/
    + bonzai/
        + [grunt/](doc/how/grunt.md)
            + actions/ `: Folder that allow to edit grunt actions or add new ones`
            + tasks/ `: Folder that allow to edit grunt tasks or add new ones`
        + [shell/](doc/how/deploying.md#Running-additional-scripts-on-the-remote-server)
            + post-deploy.sh `: Script executed remotely after deploying`
        + [wp-constants/](doc/how/environments.md) `: Environment variables`
            + _options.php `: Common variables`
            + development.php `: Development variables`
            + production.php `: Production variables`
            + staging.php `: Staging variables`
        + application.json
    + puphpet/
        + homebin/
        + [config-override.yaml](doc/how/vagrant.md#Custom-local-configuration)
+ html/
+ logs/
+ bonzai/
+ node_modules/
+ public/
   + wp/
   + app/
      + cache/
      + languages/
      + mu-plugins/
      + plugins/
      + themes/
      + uploads/
   + .htaccess
   + index.php
   + wp-config.php   
+ puphpet/
+ tmp/
   + workspace/
+ vendor/
+ .env
+ .gitattributes
+ .gitignore
+ .travis.yml
+ CHANGELOG.md
+ composer.json
+ Gruntfile.js
+ package.json
+ README.md
+ ruleset.xml
+ Vagrantfile
+ wp-cli.yml
