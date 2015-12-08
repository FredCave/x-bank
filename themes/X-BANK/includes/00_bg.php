<?php

// get IDs of any media posts to be excluded — only logos for the time being
function x_images_exclude( $type ) {	
	$logo_ids = [];
	$the_query = new WP_Query( array("post_type" => "x-logos") );
	if ( $the_query->have_posts() ) { 		
		while ( $the_query->have_posts() ) : $the_query->the_post();
			if ( get_field('logos') ) {
				$x_fields = get_field('logos');
				// array of logo IDs				
				foreach ( $x_fields as $x_field ) {
					$logo_id = $x_field["logo"]["id"];
					array_push( $logo_ids, $logo_id );
				}
			}
		endwhile;
	} 
	wp_reset_postdata();
	return $logo_ids;
}

function x_get_attachments( $noPosts ) {
	
	/* THIS RETURNS AN ARRAY OF ALL THE AVAILABLE IMAGES */

	$args = array(
	    'post_type' => 'attachment',
	    'numberposts' => $noPosts,
	    'orderby' => 'rand',
	    'post__not_in' => x_images_exclude( "x-logos" )
	    ); 
	return get_posts($args);
}

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

function x_images( $noPosts ) {
	
	$attachments = x_get_attachments( $noPosts );
	echo "<ul class='img_loop'>";

	if ($attachments) {
		// loop through array
		$i = 0;
		foreach ($attachments as $attachment) {
			if ( $i === $noPosts ) {
	        	break 1;
	        } else {
	        	$img_id = $attachment->ID;
				x_image_object( $img_id, $i );
	        	$i++;	
	        }	
		}
	}
	echo "</ul>";
}

?>

<div id="load_wrapper" class="hide">
	<!-- IMAGES INITIALLY LOADED HERE, HTML DONE IN JQUERY -->
	<?php x_images( 12 ); ?>
</div>

<!-- COLUMN 1 -->
<div id="wrapper_1" class="wrapper">
</div>

<!-- COLUMN 2 -->
<div id="wrapper_2" class="wrapper">
</div>