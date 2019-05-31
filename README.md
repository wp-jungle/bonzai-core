Bonzai
=======

**Bonzai** is a kick-starting Wordpress development stack for mastering your automated deployments and others
repetitive tasks.

> Much of the philosphy behind **Bonzai** is inspired by the [Bedrock Stack](https://github.com/roots/bedrock), but as
> we are running Windows environments, we are more familiar with some Grunt tasks written in Javascript, instead of
> Ruby. So we made our own.

Features
--------

* Vagrant environment ready using [Homestead](https://laravel.com/docs/master/homestead)
* Dependency management with [Composer](http://getcomposer.org)
* Automated construction with [Grunt](http://gruntjs.com/)
* Automated deployments with [Shipit](https://github.com/shipitjs/shipit)
* WP pre-configuration with [WP-Cli](https://wp-cli.org)
* Database migration with [WPMDB](https://deliciousbrains.com/wp-migrate-db-pro/) 
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
  * [Vagrant environment using Homestead](doc/how/vagrant.md)
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

+ config/
    + bonzai/
        + [grunt/](doc/how/grunt.md)
          > `Folder that allow to edit grunt actions/tasks or add new ones`
            + actions/
            + tasks/
        + [shell/](doc/how/deploying.md#Running-additional-scripts-on-the-remote-server)
            + post-deploy.sh
              > `Script executed remotely after deploying`
        + [wp-constants/](doc/how/environments.md)
          > `Environment variables`
            + _options.php
            + development.php
            + production.php
            + staging.php
        + application.json
    + homestead/
        + [after.sh](https://laravel.com/docs/master/homestead#extending-homestead)
        + [after-user.sh](doc/how/vagrant.md#Custom-local-configuration)
        + [aliases](https://laravel.com/docs/master/homestead#aliases)
        + [Homestead.yaml](https://laravel.com/docs/master/homestead#configuring-homestead)
        + [Homestead-user.yaml](doc/how/vagrant.md#Custom-local-configuration)
+ bonzai/
+ logs/ `: storing PHP error logs for easy access. Will also be displayed on WP admin dashboard`
+ [mysql_backup/](doc/how/backups.md) `: Folder used to store local database dumps`
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
