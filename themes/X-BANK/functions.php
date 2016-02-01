<?php

// ENQUEUE CUSTOM SCRIPTS
function enqueue_cpr_scripts() {
  
    // wp_deregister_script( 'jquery' );
    // wp_register_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js');
    // wp_enqueue_script( 'jquery' );  
    
    wp_enqueue_script('all-scripts', get_template_directory_uri() . '/js/scripts.min.js', array('jquery'), true);

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
    register_post_type( 'show',
    array(
        'labels' => array(
            'name' => __( 'Shows' )
        ),
        'public' => true,
        'taxonomies' => array('category'),
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

// IMAGE OBJECT

function x_image_object( $image ) {
    $width = $image['sizes'][ 'thumbnail-width' ];
    $height = $image['sizes'][ 'thumbnail-height' ];
    $thumb = $image['sizes'][ "thumbnail" ];
    $medium = $image['sizes'][ "medium" ];
    $large = $image['sizes'][ "large" ];
    $full = $image['url'];
    $id = $image["id"];
    
    $class = "landscape"; 
    if ( $width < $height ) {
        $class = "portrait";
        $thumb = $image['sizes'][ "medium" ];
        $medium = $image['sizes'][ "large" ];
        $large = $image['url'];
    } 

    echo "<img class='bg_image lazyload'
    data-src=' " . $thumb . " ' 
    width=' " . $width . " ' 
    height=' " . $height . " ' 
    data-sizes='auto' 
    data-srcset=' " . $large . " 1280w, 
        " . $medium . " 800w, 
        " . $thumb . " 300w' 
    src=' " . $thumb . " ' />";

}






// STAR FILLER

function starFiller ( $noChars, $firstString, $secondString ) {
    $secondString = str_replace(' ', '', $secondString);
    $secondString = str_replace('–', '-', $secondString);
    $a = strlen( trim($firstString) );
    $b = strlen( trim($secondString) );
    // calculate no. of asterisks
    $filler = $noChars - $a - $b;
    echo "<span class='stars'>***</span>" . $firstString . "<span class='stars'>***</span><br class='star_break'><span class='star_filler'>";
    for ( $i=0; $i < $filler; $i++ ) {
        echo "*";
    }   
    echo "</span>" . $secondString;
}

?>