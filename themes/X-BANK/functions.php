<?php

// FIX UPLOAD BUG
// add_filter( 'wp_image_editors', 'change_graphic_lib' );

// function change_graphic_lib($array) {
//     return array( 'WP_Image_Editor_GD', 'WP_Image_Editor_Imagick' );
// }

// ENQUEUE CUSTOM SCRIPTS
function enqueue_cpr_scripts() {
  
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js');
    wp_enqueue_script( 'jquery' );  
    
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
    echo '<p class="break"><span class="break_inner">–––––––––––––––––––––––––––––––––––––––––––––</span></p>';
}

function addInnerBreak() {
    echo '<p class="inner_break"><span class="break_inner">–––––––––––––––––––––––––––––––––––––––––––––</span></p>';
}

// IMAGE OBJECT

function x_image_object( $image, $bg = null ) {
    if( !empty($image) ):                                     
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
        // IF BG IMAGE
        if ( $bg ) {
            $class = $class . " bg_image";
        }

        echo "<img class='lazyload " . $class . "' 
        alt='X Bank'  
        data-src='" . $thumb . "' 
        width='" . $width . "' 
        height='" . $height . "' 
        data-sizes='auto' 
        data-srcset='" . $large . " 1280w, 
            " . $medium . " 800w, 
            " . $thumb . " 300w' 
        src=' " . $thumb . "' />";
    endif; 
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

// CREATE SOCIAL MEDIA LINKS

function soc_med_links( $_slug, $_name, $_image ) {
    // IF POST NAME
    if ( $_name !== "" ) {
        $_text = $_name . " at xbank.amsterdam";
    } else {
        $_text = "xbank.amsterdam";
    } 
    // IF POST SLUG
    if ( $_slug !== "" ) {
         $_link = "http://xbank.amsterdam/#" . $_slug; 
    } else {
        $_link = "http://xbank.amsterdam";
    } 
    ?>
    <!-- FACEBOOK -->
    <li>
        <a target="_blank" 
            href="" 
            class="facebook_share" 
            data-text="<?php echo $_text; ?>" 
            data-img="<?php echo $_image; ?>" 
            data-link="<?php echo $_link; ?>">
            <img src="<?php bloginfo('template_url'); ?>/img/icon_facebook.png" alt="Facebook icon" />
        </a>
    </li>
    <!-- TWITTER -->
    <li>
        <a class="twitter-share-button" 
            target="_blank" 
            data-url="<?php echo createTwitterUrl ( $_name, $_link )[1]; ?>" 
            href="<?php echo createTwitterUrl ( $_name, $_link )[2]; ?>">
            <img src="<?php bloginfo('template_url'); ?>/img/icon_twitter.png" alt="Twitter icon" />
        </a>
    </li>
    <!-- PINTEREST -->
    <li>
        <a data-pin-do="buttonPin" 
        data-pin-description="<?php echo $_text; ?>" 
        data-pin-url="<?php echo $_link; ?>" 
        data-pin-media="<?php echo $_image; ?>" 
        data-pin-custom="true" 
        class="pinterest" 
        target="_blank" 
        href="https://www.pinterest.com/pin/create/button/" >
            <img src="<?php bloginfo('template_url'); ?>/img/icon_pinterest.png" alt="Pinterest icon" />
        </a> 
    </li>
    <?php 
}

function encodeURIComponent( $str ) {
    $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')');
    return strtr(rawurlencode($str), $revert);
}

function createTwitterUrl ( $_name, $_link ) {
    // $_NAME = POST TITLE
    $twitter_url = [];
    if ( $_name !== "" ) {
        $_text = $_name . " at xbank.amsterdam";
    } else {
        $_text = "xbank.amsterdam";
    }   
    $_url = encodeURIComponent ( $_link );
    $_url = "test.xbank.amsterdam%23potluck";
    $twitter_url[1] = $_url;
    $twitter_url[2] = "https://twitter.com/share" . 
        "?text=" . $_text . 
        "&hashtags=XBank, Amsterdam, " . str_replace( " ", "", $_name );        
    return $twitter_url; 
}

// CUSTOM SORT

function custom_sort( $a, $b ) {
    return strtolower ( $a->post_title ) > strtolower ( $b->post_title );
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
    /*  
        PAST = 0
        CURRENT = 1
        FUTURE = 2
    */
    $past = 2;
    if ( $show_year < $today_year ) {
        $past = 0;
    } else if (  $show_year === $today_year ) {
        if ( $show_month < $today_month ) {
            $past = 0;
        } else if ( $show_month === $today_month ) {
            if ( $show_day < $today_day ) {
                $past = 0; 
            } else if ( $show_day === $today_day ) {
                $past = 1;
            }
        }
    }
    return $past;
}

// SLUG GENERATOR

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