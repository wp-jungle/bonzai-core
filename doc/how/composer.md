Composer
========

[Composer](http://getcomposer.org) is used to manage dependencies. **Bonzai** considers any 3rd party library as a
dependency including WordPress itself and any plugins.


Plugins
-------

[WordPress Packagist](http://wpackagist.org/) is already registered in the `composer.json` file so any plugins from the
[WordPress Plugin Directory](http://wordpress.org/plugins/) can easily be required.

To add a plugin, add it under the `require` directive or use `composer require <namespace>/<packagename>` from the
command line. If it's from WordPress Packagist then the namespace is always `wpackagist-plugin`.

Example: `"wpackagist-plugin/akismet": "dev-trunk"`

Whenever you add a new plugin or update the WP version, run `composer update` to install your new packages.

`plugins`, and `mu-plugins` are Git ignored by default since Composer manages them. If you want to add something to
those folders that *isn't* managed by Composer, you need to update `.gitignore` to whitelist them:

`!html/app/plugins/plugin-name`

For plugins that you add through Composer, you can edit their install path like below:

```json
"installer-paths": {
  "html/app/mu-plugins/{$name}/": ["type:wordpress-muplugin", "roots/soil"],
  "html/app/plugins/{$name}/": ["type:wordpress-plugin"],
  "html/app/themes/{$name}/": ["type:wordpress-theme"]
},
```

[Soil](https://github.com/roots/soil) is a package with its type set to `wordpress-plugin`.
Since it implements `composer/installers` we can override its type.

Note: Some plugins may create files or folders outside of their given scope, or even make modifications to
`wp-config.php` and other files in the `app` directory. These files should be added to your `.gitignore` file as they
are managed by the plugins themselves, which are managed via Composer. Any modifications to `wp-config.php` that are
needed should be moved into `config/application.php`.


Updating WP and plugin versions
-------------------------------

Updating your WordPress version (or any plugin) is just a matter of changing the version number in the `composer.json`
file.

Then running `composer update` will pull down the new version.


Themes
------

Themes can also be managed by Composer but should only be done so under two conditions:

1. You're using a parent theme that won't be modified at all
2. You want to separate out your main theme and use that as a standalone package

Under most circumstances we recommend NOT doing #2 and instead keeping your main theme as part of your app's repository.

Just like plugins, WPackagist maintains a Composer mirror of the WP theme directory. To require a theme, just use the
`wpackagist-theme` namespace.