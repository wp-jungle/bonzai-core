Environments variables
======================

**Bonzai** tries to separate config from code as much as possible and environment variables are used to achieve this.
The benefit is there's a single place (`.env`) to keep settings like database or other 3rd party credentials that isn't
committed to your repository.

[PHP dotenv](https://github.com/vlucas/phpdotenv) is used to load the `.env` file. All variables are then available in
your app by `getenv`, `$_SERVER`, or `$_ENV`. This `.env` file is also managed and edited automatically by the
`grunt construct` task.

[NPM_dotenv](https://www.npmjs.com/package/dotenv) is used to load the same environment variables as PHP dotenv, and
allow grunt to read those datas.

Required env vars
-----------------

Note that you don't need to edit manually theses variables when building your local environment.
However, after deploying your site remotely, you will need to create a .env file containing the same variables and
adjust the values for the current environment. In the near future, the publish task to deploy the site will create theses
required file automatically. For now, it's a manual process.

* Environment related
    * `WP_ENV`
    * `WP_HOME`
    * `WP_SITEURL`
* Database related
    * `DB_USER`
    * `DB_NAME`
    * `DB_PASSWORD`
    * `DB_HOST`
    * `DB_PREFIX`
* Salts related
    * `AUTH_KEY`
    * `SECURE_AUTH_KEY` 
    * `LOGGED_IN_KEY`
    * `NONCE_KEY`
    * `AUTH_SALT`
    * `SECURE_AUTH_SALT`
    * `LOGGED_IN_SALT`
    * `NONCE_SALT`

Optional env vars
-----------------
* Only needed on develop environment
    * `BONZAI_DB_ROOT`
    * `BONZAI_WP_TITLE`
    * `BONZAI_ADMIN_NAME`
    * `BONZAI_ADMIN_PASSWORD`
    * `BONZAI_ADMIN_EMAIL`
    * `BONZAI_CURRENT_USER_RSA` : The path to your local RSA Key used to connect to your VM
* Optional
    * `BONZAI_PHP_LOGS` : On|Off, allows you to show your PHP errors logs on the WP Dashboard
    * `WPMDB_LICENCE` : Your WP Migrate DB Pro licence if you have one


> **Note :** When you run the `grunt construct` task, you will be prompted to set your `WP_ENV`, but `WP_HOME` and
> `WP_SITEURL` will be automatically defined from the url you have set for this environment during the prompte of the
> `grunt construct` task.

Alternatively, you will notice some variables starting by `BONZAI_`. Those one are created by the **Bonzai**'s Grunt
scripts, and are just kept there locally in case you use `grunt construct` again.

How constants are used
----------------------

The root `public/wp-config.php` is required by WordPress and is only used to load the other main configs. Nothing else
should be added to it.

`config/bonzai/wp-constants/_options.php` is the main config file that contains what `wp-config.php` usually would. Base options should
be set in there.

For environment specific configuration, use the files under `config/bonzai/wp-constants/`. By default there's is
`development`, `staging`, and `production` but these can be whatever you require. However, if you do not already master
this stack, if you do no tried it already, just keep theses names.

Note: You can't re-define constants in PHP. So if you have a base setting in `_options.php` and want to override it
in `production.php` for example, you have a few options:

* Remove the base option and be sure to define it in every environment it's needed
* Only define the constant in `_options.php` if it isn't already defined