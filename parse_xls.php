error_reporting(E_ALL|E_STRICT);
 
//include the files we need to work with WordPress in an independant script
require_once("../wp-config.php");
$wp->init(); $wp->parse_request(); $wp->query_posts();
$wp->register_globals(); $wp->send_headers();
global $wpdb;
global $current_user;
$current_user = wp_get_current_user();