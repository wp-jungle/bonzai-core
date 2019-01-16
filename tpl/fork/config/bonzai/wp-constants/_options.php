<?php

$root_dir = dirname(dirname(dirname(__DIR__))); // config
$webroot_dir = $root_dir . '/{%= app.webRoot %}'; // public

/**
 * Use Dotenv to set required environment variables and load .env file in root
 */
if (file_exists($root_dir . '/.env')) {
	$dotenv = Dotenv\Dotenv::create(($root_dir));
	$dotenv->overload();
}

$dotenv->required(['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'WP_HOME', 'WP_SITEURL']);

/**
 * Set up our global environment constant and load its config first
 * Default: development
 */
define('WP_ENV', getenv('WP_ENV') ? getenv('WP_ENV') : 'development');

$env_config = dirname(__FILE__) . '/' . WP_ENV . '.php';

if (file_exists($env_config)) {
  require_once $env_config;
}

/**
 * Site Urls
 */
define('WP_HOME', getenv('WP_HOME'));
define('WP_SITEURL', getenv('WP_SITEURL'));

/**
 * Custom Content Directory
 */
define('CONTENT_DIR', '/app');
define('WP_CONTENT_DIR', $webroot_dir . CONTENT_DIR);
define('WP_CONTENT_URL', WP_HOME . CONTENT_DIR);

/**
 * DB settings
 */
define('DB_NAME', getenv('DB_NAME'));
define('DB_USER', getenv('DB_USER'));
define('DB_PASSWORD', getenv('DB_PASSWORD'));
define('DB_HOST', getenv('DB_HOST') ? getenv('DB_HOST') : 'localhost');

define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');
$table_prefix = getenv('DB_PREFIX') ? getenv('DB_PREFIX') : 'wp_';

/**
 * Authentication Unique Keys and Salts
 */
define('AUTH_KEY', getenv('AUTH_KEY'));
define('SECURE_AUTH_KEY', getenv('SECURE_AUTH_KEY'));
define('LOGGED_IN_KEY', getenv('LOGGED_IN_KEY'));
define('NONCE_KEY', getenv('NONCE_KEY'));
define('AUTH_SALT', getenv('AUTH_SALT'));
define('SECURE_AUTH_SALT', getenv('SECURE_AUTH_SALT'));
define('LOGGED_IN_SALT', getenv('LOGGED_IN_SALT'));
define('NONCE_SALT', getenv('NONCE_SALT'));

/**
 * Default Custom Settings
 */
// Activate php errors logs on WP backend
ini_set('log_errors', !empty(getenv('BONZAI_PHP_LOGS')) && (getenv('BONZAI_PHP_LOGS') == 'On' || getenv('BONZAI_PHP_LOGS') == true) ? 'On' : 'Off');
ini_set('error_log', dirname(dirname(dirname(dirname(__FILE__)))) . '/logs/php-errors.log');

// Disable WP auto updates
if (!defined('AUTOMATIC_UPDATER_DISABLED'))
  define('AUTOMATIC_UPDATER_DISABLED', true);

// Disable WP Cron
if (!defined('DISABLE_WP_CRON'))
  define('DISABLE_WP_CRON', true);

// Do not allow file edition through dashboard
if (!defined('DISALLOW_FILE_EDIT'))
  define('DISALLOW_FILE_EDIT', true);

// License for WP Migrate DB Pro
if(!defined('WPMDB_LICENCE') && !empty(getenv('WPMDB_LICENCE')) )
  define('WPMDB_LICENCE', getenv('WPMDB_LICENCE'));

/**
 * Multisite
 * You can create a multisite while using the construct (installation) wizard.
 * If you didn't do it, you can still manually convert it using the standard method from
 * http://codex.wordpress.org/Create_A_Network
 * However, you should also turn `type` to `multisite` in `config/bonzai/application.json`
 */
// define('WP_ALLOW_MULTISITE', true);
// define('MULTISITE', true);
// define('SUBDOMAIN_INSTALL', false);
// define('PATH_CURRENT_SITE', '/');
// define('SITE_ID_CURRENT_SITE', 1);
// define('BLOG_ID_CURRENT_SITE', 1);

/**
 * Bootstrap WordPress
 */
if (!defined('ABSPATH'))
  define('ABSPATH', $webroot_dir . '/wp/');
