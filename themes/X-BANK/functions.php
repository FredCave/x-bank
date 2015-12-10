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

// IMAGE OBJECT

function x_image_object( $img_id, $i ) {
    $width = wp_get_attachment_image_src( $img_id )[1];
    $height = wp_get_attachment_image_src( $img_id )[2];
    $thumb = wp_get_attachment_image_src( $img_id, "thumbnail" )[0];
    $medium = wp_get_attachment_image_src( $img_id, "medium" )[0];
    $large = wp_get_attachment_image_src( $img_id, "large" )[0];
    $full = wp_get_attachment_image_src( $img_id, "full" )[0];

    $class = "landscape"; 
    if ( $width < $height ) {
        $class = "portrait";
        $thumb = wp_get_attachment_image_src( $img_id, "medium" )[0];
        $medium = wp_get_attachment_image_src( $img_id, "large" )[0];
        $large = wp_get_attachment_image_src( $img_id, "full" )[0];
    }

    echo "<li>" . "<img class='" . $i . "' src='". $medium ."' />" . "</li>"; 
}

// STAR FILLER

function starFiller ( $noChars, $firstString, $secondString ) {
    $secondString = str_replace(' ', '', $secondString);
    $secondString = str_replace('–', '-', $secondString);
    $a = strlen( trim($firstString) );
    $b = strlen( trim($secondString) );
    // calculate no. of asterisks
    $filler = $noChars - $a - $b;
    echo $firstString;
    for ( $i=0; $i < $filler; $i++ ) {
        echo "*";
    }   
    echo $secondString;
}

?>