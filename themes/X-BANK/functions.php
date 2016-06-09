<?php

// ENQUEUE CUSTOM SCRIPTS
function enqueue_cpr_scripts() {
  
    // wp_deregister_script( 'jquery' );
    // wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js');
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

function print_categories( $thisId ) {       
    $thisCat = get_the_category( $thisId );
    foreach( $thisCat as $cat ) {
        echo $cat->slug . " ";
    }
} 

// ADD CUSTOM URL QUERIES

add_filter('query_vars', 'add_my_var');

function add_my_var($public_query_vars) {
    $public_query_vars[] = 'artist';
    $public_query_vars[] = 'image';
    return $public_query_vars;
}

// INCLUDE BREAKS

function addBreak() {
    //echo '<p class="break"><span class="break_inner">*********************************************</span></p>';
    echo '<p class="break"><span class="break_inner">–––––––––––––––––––––––––––––––––––––––––––––</span></p>';
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

    echo "<img class='bg_image lazyload " . $class . "' 
    alt='X Bank'  
    data-src='" . $thumb . "' 
    width='" . $width . "' 
    height='" . $height . "' 
    data-sizes='auto' 
    data-srcset='" . $large . " 1280w, 
        " . $medium . " 800w, 
        " . $thumb . " 300w' 
    src=' " . $thumb . "' />";
}

// STAR FILLER

function starFiller ( $noChars, $firstString, $secondString ) {
    $converted = str_replace('–', '-', $firstString);
    $converted = preg_replace( "/&#?[a-z0-9]+;/i", "x", $converted);
    
    $a = strlen( utf8_decode( trim($converted) ) );
    $b = strlen( utf8_decode( trim($secondString) ) );
    // CALCULATE NO. OF ASTERISKS
    $filler = $noChars - $a - $b;
    echo "<span class='stars'>---</span>" . $firstString . "<span class='stars'>---</span><br class='star_break'><span class='star_filler'>";
    for ( $i=0; $i < $filler; $i++ ) {
        echo "-";
    }   
    echo "</span>" . $secondString;

}

// DATE CHECKERS

    // IS AFTER

function isPast ( $date ) {
    // CURRENT DATE
    $today = explode( "/", date("d/m/Y") );
    $today_day = $today[0];
    $today_month = $today[1];
    $today_year = $today[2];
    // INPUT DATE
    $show = explode( "/", $date );
    $show_day = $show[0];
    $show_month = $show[1];
    $show_year = $show[2];
    $past = False;
    if ( $show_year < $today_year ) {
        $past = True;
    } else if (  $show_year === $today_year ) {
        if ( $show_month < $today_month ) {
            $past = True;
        } else if ( $show_month === $today_month ) {
            if ( $show_day < $today_day ) {
               $past = True; 
            }
        }
    }
    return $past;
}

// SLUG GENERATOR
/*
function toAscii($str, $replace=array(), $delimiter='-') {
    if( !empty($replace) ) {
        $str = str_replace((array)$replace, ' ', $str);
    }

    $clean = iconv('UTF-8', 'ASCII//IGNORE', $str);
    // $clean = preg_replace("/[^a-zA-Z0-9\/_|+ -]/", '', $clean);
    $clean = preg_replace("/&038;/", 'and', $clean);

    // $clean = strtolower(trim($clean, '-'));
    // $clean = preg_replace("/[\/_|+ -]+/", $delimiter, $clean);

    return $clean;
}*/

function toAscii( $title ) {
    $raw_title = '';
    $context = 'display';

    $title = strip_tags($title);
    // Preserve escaped octets.
    $title = preg_replace('|%([a-fA-F0-9][a-fA-F0-9])|', '---$1---', $title);
    // Remove percent signs that are not part of an octet.
    $title = str_replace('%', '', $title);
    // Restore octets.
    $title = preg_replace('|---([a-fA-F0-9][a-fA-F0-9])---|', '%$1', $title);

    if (seems_utf8($title)) {
    if (function_exists('mb_strtolower')) {
      $title = mb_strtolower($title, 'UTF-8');
    }
    $title = utf8_uri_encode($title, 200);
    }

    $title = strtolower($title);
    $title = preg_replace('/&.+?;/', '', $title); // kill entities
    $title = str_replace('.', '-', $title);

    // Convert nbsp, ndash and mdash to hyphens
    $title = str_replace( array( '%c2%a0', '%e2%80%93', '%e2%80%94' ), '-', $title );

    // Strip these characters entirely
    $title = str_replace( array(
    // iexcl and iquest
    '%c2%a1', '%c2%bf',
    // angle quotes
    '%c2%ab', '%c2%bb', '%e2%80%b9', '%e2%80%ba',
    // curly quotes
    '%e2%80%98', '%e2%80%99', '%e2%80%9c', '%e2%80%9d',
    '%e2%80%9a', '%e2%80%9b', '%e2%80%9e', '%e2%80%9f',
    // copy, reg, deg, hellip and trade
    '%c2%a9', '%c2%ae', '%c2%b0', '%e2%80%a6', '%e2%84%a2',
    // acute accents
    '%c2%b4', '%cb%8a', '%cc%81', '%cd%81',
    // grave accent, macron, caron
    '%cc%80', '%cc%84', '%cc%8c',
    ), '', $title );

    // Convert times to x
    $title = str_replace( '%c3%97', 'x', $title );

    $title = preg_replace('/[^%a-z0-9 _-]/', '', $title);
    $title = preg_replace('/\s+/', '-', $title);
    $title = preg_replace('|-+|', '-', $title);
    $title = trim($title, '-');

    return $title;

}

?>