<?php

/* 
	INITIAL BG IMAGE SELECTION HERE

	CHECK BG IMAGE POST (BOTTOM OF PAGE)
		IF ACTIVATED USE IMAGES FROM THAT SELECTION
		ELSE USE DEFAULT RANDOM IMAGE SELECTION
*/

/* DEFAULT RANDOM IMAGES */

function x_images ( $noPosts ) {
	// Loop through number of index posts corresponding to $noPosts
	$args = array(
		"post_type" => "index",
		"posts_per_page" => $noPosts,
		"orderby" => "rand"
	);
	$the_query = new WP_Query( $args );
	if ( $the_query->have_posts() ) :
		echo "<ul id='init' class='img_loop'>";
		while ( $the_query->have_posts() ): $the_query->the_post(); 
			
			/* NEED TO LOOP THROUGH IMAGE ROWS AND ACCESS INFORMATION THERE */
			/*
				ATTACHED IMAGE INFO/LINKS:
				—	ARTIST NAME
				—	TITLE??
				—	WEBSHOP LINK (TO ARTIST)	
						OR OPTIONAL EXTERNAL LINK
					SOCIAL MEDIA SHARE
			*/

			$imgName = get_the_title();
			if ( have_rows("index_images") ) : 			
				while ( have_rows("index_images") ) : the_row(); ?>
					
					<li>
						<!-- image object function in functions.php -->
						<?php $image = get_sub_field('index_image'); 
						
	                    if( !empty($image) ): 
							x_image_object( $image );
	                    endif; ?>
						<!-- image info/links -->
						
						<div class="image_info hide">
							
								<span><?php echo $imgName; ?></span>
								<span><?php the_sub_field( "index_image_title" ); ?></span>
								<span>
									<?php if ( has_sub_field( "index_image_link_url" ) ) { ?>
										<a href="<?php the_sub_field( "index_image_link_url" ); ?>">
											<?php the_sub_field( "index_image_link_title" ); ?>
										</a>
									<?php } else { ?>
										<!-- NEED TO ADD LINK TO WEBSHOP -->
										<a href="">Go to the webshop</a>
									<?php } ?>
								</span>
								<span>
									<!-- SOCIAL MEDIA LINKS -->
								</span>
							
						</div>
						
					</li> 
				
				<?php 
				endwhile;
			endif; // end of image rows loop

		endwhile;
		echo "</ul>";
		wp_reset_postdata();
	endif;
}

?>

<!-- COLUMN 1 -->
<div id="wrapper_1" class="wrapper">
	<div id="init_container" class="container">
		<!-- INITIAL CONTAINER -->
		<div class="load_wrapper hide">
			<!-- IMAGES INITIALLY LOADED HERE AS UNSTYLED UL, ALL FURTHER HTML DONE IN JQUERY -->
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
						x_images( 16 );
					
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