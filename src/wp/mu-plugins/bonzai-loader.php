<?php
/*
Plugin Name: Sub-plugins auto-loader
Plugin URI:
Description: Load many plugins.
Author: Thomas Lartaud
Author URI: http://thomaslartaud.com/
Version:
License: GPLv2 or later
*/

$site_mu_plugins_root = WPMU_PLUGIN_DIR;
$bonzai_mu_plugins_root = dirname(__FILE__) . '/files';
$vendor_root = dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/vendor';

$files = array(
    $site_mu_plugins_root . '/error-log-monitor/plugin.php',
    $site_mu_plugins_root . '/recently-edited-content-widget/recently-edited-content-widget.php',
    $site_mu_plugins_root . '/right-now-reloaded/right-now-reloaded.php',
    $bonzai_mu_plugins_root . '/disallow-indexing.php',
    $bonzai_mu_plugins_root . '/register-theme-directory.php',
    $bonzai_mu_plugins_root . '/dashboard-widget-changelog.php',
    $bonzai_mu_plugins_root . '/wp-migrate-db-pro-compatibility.php'
);

foreach($files as $file){
    if(file_exists($file))
        require_once $file;
}