<?php
/*
Plugin Name: Dashboard Widget Changelog
Plugin URI:
Description: Robust zero-configuration and low-memory WordPress plugin to keep an eye on changelog.
Author: Thomas Lartaud
Author URI: http://thomaslartaud.com/
Version:
License: GPLv2 or later
*/

# Get Markdown class
use \Michelf\Markdown;

Change_Log_Dashboard_Widget::on_load();

/**
 * Main plugin's class.
 */
class Change_Log_Dashboard_Widget
{

    static function on_load()
    {
        add_action('admin_init', array(__CLASS__, 'admin_init'));
    }

    static function admin_init()
    {
        add_action('wp_dashboard_setup', array(__CLASS__, 'wp_dashboard_setup'));
        add_action('admin_head', array(__CLASS__, 'changelog_css'));
    }

    static function wp_dashboard_setup()
    {
        if (current_user_can(apply_filters('change_log_widget_capability', 'manage_options')))
            wp_add_dashboard_widget('change-log-widget', __('Change Log', 'change-log-widget'), array(__CLASS__, 'widget_callback'));
    }

    static function changelog_css()
    {
        echo '<style>
            #change-log-widget .inside ul{
                list-style: disc;
                list-style-position: outside;
                padding: 0 0 0 20px;
            }

            #change-log-widget .inside  h3,
            #change-log-widget .inside  h2{
                background: #eee;
                margin: 10px 0 10px;
                padding: 8px 12px;
            }

            #change-log-widget .inside  h4{
                border-bottom: 1px solid #eee;
                padding: 0 0 10px;
            }
        </style>';
    }

    static function widget_callback()
    {
        # Read file and pass content through the Markdown parser
        $text = file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/../CHANGELOG.md");
        $html = Markdown::defaultTransform($text);

        echo $html;
    }

}