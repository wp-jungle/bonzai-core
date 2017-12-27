<?php
// Multisite
// define('DOMAIN_CURRENT_SITE', 'staging.{%= app.domain %}');

// Protections
define('DISALLOW_FILE_MODS', true);

// Errors display
ini_set('display_errors', 1);
define('WP_DEBUG_DISPLAY', false);
define('WP_DEBUG', false);
define('SCRIPT_DEBUG', false);

// Cache
define('WP_CACHE', true);
