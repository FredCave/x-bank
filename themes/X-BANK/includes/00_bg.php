<?php

function x_images() {

	/* NEED TO FIND A WAY TO MAKE THIS GLOBAL */

	// get IDs of any logo posts
	$the_query = new WP_Query( array("post_type" => "x-logos") );
	if ( $the_query->have_posts() ) { 
		while ( $the_query->have_posts() ) : $the_query->the_post();
			if ( get_field('logos') ) {
				$x_fields = get_field('logos');
				// array of logo IDs
				$logo_ids = [];
				foreach ( $x_fields as $x_field ) {
					$logo_id = $x_field["logo"]["id"];
					array_push( $logo_ids, $logo_id );
				}
			}
		endwhile;
	} 
	wp_reset_postdata;

	// start main loop through media, excluding logo IDs

	$args = array(
	    'post_type' => 'attachment',
	    'numberposts' => 3,
	    'orderby' => 'rand',
	    'post__not_in' => $logo_ids
	    ); 
	// returns list of all attachments
	$attachments = get_posts($args);
	if ($attachments) {
	    
	    foreach ($attachments as $attachment) {
			
	        $img_id = $attachment->ID;		
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

	        echo "<li>" . "<img src='". $medium ."' />" . "</li>";

	    }
	}

} // end of function

?>


<!-- COLUMN 1 -->

<div id="wrapper_1" class="wrapper">

	<!-- HOW TO LOAD AJAX?? -->

	<div class="movable_wrapper slide_up loop_1">

		<ul class="img_loop">
			<?php x_images(); ?>
		</ul>

		<ul class="img_loop">
			<?php x_images(); ?>
		</ul>

		<ul class="img_loop">
			<!-- CONTENT FROM FIRST UL IS REPEATED HERE -->
		</ul>

	</div>

	<div class="movable_wrapper slide_down loop_2">

		<ul class="img_loop">
			<!-- CONTENT FROM LAST UL IS REPEATED HERE -->
		</ul>

		<ul class="img_loop">
			<?php x_images(); ?>
		</ul>

		<ul class="img_loop">
			<?php x_images(); ?>
		</ul>

	</div>

	<div class="movable_wrapper slide_up loop_3">

		<ul class="img_loop">
			<?php x_images(); ?>
		</ul>

		<ul class="img_loop">
			<?php x_images(); ?>
		</ul>

		<ul class="img_loop">
			<!-- CONTENT FROM FIRST UL IS REPEATED HERE -->
		</ul>

	</div>

	<div class="movable_wrapper slide_down loop_4">

		<ul class="img_loop">
			<!-- CONTENT FROM LAST UL IS REPEATED HERE -->
		</ul>

		<ul class="img_loop">
			<?php x_images(); ?>
		</ul>

		<ul class="img_loop">
			<?php x_images(); ?>
		</ul>

	</div>

</div>

<!-- COLUMN 2 -->

<div id="wrapper_2" class="wrapper">


</div>