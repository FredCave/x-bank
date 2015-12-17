<?php get_header(); ?>

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

/* MOVE TO FUNCTIONS SO SINGLE POST CAN ACCESS IT AS WELL */

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
				x_image_object( $img_id, $i ); // Moved to functions.php
	        	$i++;	
	        }	
		}
	}
	echo "</ul>";
}

?>

<div id="wrapper_1" class="wrapper wrapper_test">
	<div id="init_container" class="container">
		<!-- INITIAL CONTAINER -->
		<div class="load_wrapper hide">
			<!-- IMAGES INITIALLY LOADED HERE, HTML DONE IN JQUERY -->
			<?php x_images( 12 ); ?>
		</div>
	</div>
</div>

<script>

	$(".wrapper_test li").each( function(){
		$(this).prepend("<div class='img_before'><a href=''>Artist info</a></div>");
		$(this).find("img").after("<div class='img_after'><a href=''>Go to webshop</a></div>");
	});

	$(".wrapper_test").on("click", "img", function(){
		var imgH = $(this).height();
		console.log(imgH);
		$(".img_before, .img_after").hide();
		$(this).next(".img_after").css("top", imgH).show();
		$(this).prev(".img_before").show();
	});

</script>


<?php get_footer(); ?>

