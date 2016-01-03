<?php

/* 
	INITIAL BG IMAGE SELECTION HERE

	CHECK BG IMAGE POST (BOTTOM OF PAGE)
		IF ACTIVATED USE IMAGES FROM THAT SELECTION
		ELSE USE DEFAULT RANDOM IMAGE SELECTION
*/

/* DEFAULT RANDOM IMAGES */

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

/* CREATES UL WITH IMAGES USING X_IMAGE_OBJECT FUNCTION IN FUNCTIONS.PHP */

function x_images( $noPosts ) {
	
	$attachments = x_get_attachments( $noPosts );
	echo "<ul id='init' class='img_loop'>";

	if ($attachments) {
		// loop through array
		$i = 0; 
		/* $i = temporary parameter just to know if all images are being loaded */
		foreach ($attachments as $attachment) {
			if ( $i === $noPosts ) {
	        	break 1;
	        } else {
	        	$img_id = $attachment->ID;
				echo "<li id='" . $img_id ."'>";
				x_image_object( $img_id ); // Moved to functions.php
	        	echo "</li>";
	        	$i++;	
	        }	
		}
	}
	echo "</ul>";
}

?>

<!-- COLUMN 1 -->
<div id="wrapper_1" class="wrapper">
	<div id="init_container" class="container">
		<!-- INITIAL CONTAINER -->
		<div class="load_wrapper hide">
			<!-- IMAGES INITIALLY LOADED HERE, HTML DONE IN JQUERY -->
			<!-- FIRST LOOP THROUGH CURATED BG IMAGE POST -->
			<?php
			$wp_query = new WP_Query("name=background-images");
			if ( $wp_query->have_posts() ) :
				while ( $wp_query->have_posts() ) : $wp_query->the_post();
					// If activate field is checked
					if( get_field('bg_activate') ) {		
						// Create UL
						echo "<ul>";
							// Loop through images
							if ( have_rows("bg_images") ) :
								while ( have_rows("bg_images") ) : the_row(); ?>
									<li>
										<?php 
										$image = get_sub_field("bg_image");
										//echo $image["ID"];
										x_image_object( $image["ID"] );
										?>
									</li>
								<?php
								endwhile;
							endif;
						echo "</ul>";
					} else {
						
						// IF DEACTIVATED USE DEFAULT RANDOM IMAGE FUNCTION
						x_images( 12 );
					
					}
				endwhile;
				wp_reset_postdata();
			endif;

			?>
		</div>
	</div>
</div>

<!-- COLUMN 2 -->
<div id="wrapper_2" class="wrapper">

</div>