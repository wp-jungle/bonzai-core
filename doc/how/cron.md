Cron
====

**Bonzai** disables the internal WP Cron via `define('DISABLE_WP_CRON', true);`. If you keep this setting, you'll need
to manually set a cron job like the following in your crontab file:

`*/5 * * * * curl http://example.com/wp/wp-cron.php`

> Do not forget to do so on each environment