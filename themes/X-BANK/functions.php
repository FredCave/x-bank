<?php

// ENQUEUE CUSTOM SCRIPTS
function enqueue_cpr_scripts() {
  
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js');
    wp_enqueue_script( 'jquery' );  
    
    wp_enqueue_script('modernizr', get_template_directory_uri() . '/js/scripts.min.js', array('jquery'), true);

}
add_action('wp_enqueue_scripts', 'enqueue_cpr_scripts');

// ADD CUSTOM POST TYPES
add_action( 'init', 'create_post_types' );
function create_post_types() {
    register_post_type( 'index',
    array(
        'labels' => array(
            'name' => __( 'Index' )
        ),
        'public' => true,
        'taxonomies' => array('category'),
        'has_archive' => true,
        'supports' => array('editor','title'),
        'menu_position' => 5
        )
    );
    register_post_type( 'x-logos',
    array(
      'labels' => array(
        'name' => __( 'Logos' )
      ),
      'public' => true,
      'has_archive' => true,
      'supports' => array('editor','title'),
      'menu_position' => 6
    )
  );
}

// GET CATEGORIES FOR EACH ARTIST

function print_categories() {       
    if( get_field("index_categories").length ):
        $categories = get_field_object("index_categories");
        $values = $categories['value'];
        return strtolower ( join(' ', $values) );
    endif; 
} 

// INCLUDE BREAKS

function addBreak() {
    echo '<p class="break"><span class="break_inner">*********************************************</span></p>';
}

?>