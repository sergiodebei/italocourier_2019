<?php
  
// Setup theme with Timber

// Check if Timber plugin is active and prompts an error if not
if ( ! class_exists( 'Timber' ) ) {
    add_action( 'admin_notices', function() {
        echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
    } );
    return;
}
  
// Check if Advanced Custom Fields plugin is active and prompts an error if not
if ( ! class_exists('acf')) {
    add_action( 'admin_notices', function() {
        echo '<div class="error"><p>Advanced Custom Fields not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
    } );
    return;
}
  
// Set location for the twig files
Timber::$dirname = array('views');

class StarterSite extends TimberSite {

    function __construct() {
        if ( WP_DEBUG ) {
        add_filter( 'timber/cache/mode', function () {
            return 'none';
        });
        }

        // define('BASEURL', WP_HOME);
        add_action( 'init', array($this, 'add_menu_support') );
        add_action( 'init', array($this, 'register_my_menus') );
        add_action( 'init', array($this, 'add_thumbnails_support') );
        add_filter( 'timber_context', array( $this, 'add_to_context' ) );
        add_action( 'init', array($this, 'option_page') );
        add_filter( 'tiny_mce_before_init', array( $this, 'wptiny' ) );
        add_filter( 'show_admin_bar', array( $this, 'my_function_admin_bar' ) );
        add_filter( 'upload_mimes', array( $this, 'cc_mime_types' ) );
        parent::__construct();
    }

	// Add menu support
	function add_menu_support(){
		add_theme_support( 'menus' );
    }
    
	// Register the names of the menus
	function register_my_menus() {
		register_nav_menus(
			array(
            'primary-menu' => __( 'Primary menu' ),
			)
		);
    } 
    
    // Add Featured image support
	function add_thumbnails_support(){
		add_theme_support( 'post-thumbnails' );
	}

    function add_to_context( $context ) {
        $context['menu'] = new TimberMenu('primary-menu');
        $context['site'] = $this;
        // $context['site']->url = BASEURL . '';
        $context['site']->assets = './assets/';
        $context['site']->is_home = is_front_page();
        $context['options'] = get_fields('options');
        // $context['currentlanguage'] = pll_current_language();
        return $context;
    }

    // Setup option pages
    function option_page() {
        acf_add_options_page(
            array(
                'page_title'    => 'Options',
                'menu_title'    => 'Options',
                'menu_slug'     => 'options',
                'capability'    => 'edit_posts',
                'redirect'      => false
            )
        );
    }
    
	// Set wysiwyg editor height
	function wptiny($initArray){
		$initArray['height'] = '150px';
		return $initArray;
	}

	// Hide the adminbar for the front side of the website
	function my_function_admin_bar(){ 
		return false; 
	}

	// Add svg image support
	function cc_mime_types($mimes) {
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
    }

}

/* functions.php */
if (class_exists('Timber')){
    Timber::$cache = false;
}

new StarterSite();