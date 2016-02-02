<?php

/* DEFAULT RANDOM IMAGE FUNCTION */

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

			$imgName = get_the_title();
			
			if ( have_rows("index_images") ) :
							
				while ( have_rows("index_images") ) : the_row(); ?>
					
					<li class="img">
						
						<span class="img_info_top img_info">
							<!-- 
							LINK TO INDEX SECTION
							LINK TO WEBSHOP
							-->

							<a href="#index">See more</a> <!--/ <a href="">Buy it</a>-->
						</span>

						<!-- image object function in functions.php -->
						<?php $image = get_sub_field('index_image'); 
						
	                    if( !empty($image) ): 
							x_image_object( $image );
	                    endif; ?>
						<!-- image info/links -->
						
						<span class="img_info_bottom img_info">
							<ul class="img_info_icons">

								<!-- 
								GENERIC SHARE PHRASE:
								*NAME* AVAILABLE AT *LINK*
								-->

								<!-- FACEBOOK -->
								<li><a href=""><img src="<?php bloginfo('template_url'); ?>/img/icon_facebook.svg" /></a></li>
								<!-- TWITTER -->
								<li>
									<a class="twitter-share-button" 
										target="_blank" 
										href="https://twitter.com/intent/tweet?text=<?php echo $imgName; ?> available at xbank.amsterdam">
										<img src="<?php bloginfo('template_url'); ?>/img/icon_twitter.svg" />
									</a>
								</li>
							</ul>
						</span>
						
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
<div id="wrapper_1" class="wrapper current">
	<div id="init_container" class="container" data-cols="4">
		<!-- INITIAL CONTAINER -->
		<div class="load_wrapper hide">
			<!-- IMAGES INITIALLY LOADED HERE AS UNSTYLED UL, ALL FURTHER HTML DONE IN JQUERY -->
			<!-- FIRST LOOP THROUGH CURATED BG IMAGE POST -->
			<?php
			$wp_query = new WP_Query("name=background-images");
			if ( $wp_query->have_posts() ) :
				$i = 0;
				while ( $wp_query->have_posts() ) : $wp_query->the_post();
					// If activate field is checked
					if( get_field('bg_activate') ) {		

						if ( have_rows("bg_column_images") ) :
							// While corresponds to columns
							while ( have_rows("bg_column_images") ) : the_row();
															
								echo "<ul class='column_view'>";
	
									if ( have_rows("bg_column") ) :
										
										while ( have_rows("bg_column") ) : the_row(); ?>
											<li id="" class="img">

												<?php 
												$image = get_sub_field("bg_column_image");
												
												x_image_object( $image );
												?>

											</li>
										<?php
										endwhile;
									endif;

								echo "</ul>";
								
							endwhile;
						endif;
						
					// If activate field is unchecked
					} else {						
						
						// IF DEACTIVATED USE DEFAULT RANDOM IMAGE FUNCTION
						x_images( 16 );
					}
					$i++;
				endwhile;
				wp_reset_postdata();
			endif;

			?>
		</div>
	</div>
</div>

<!-- COLUMN 2 -->
<div id="wrapper_2" class="wrapper toLoad">

</div>

<!-- IMAGE INFO BLOCK FOR SMALL SCREENS -->
<div id="img_info_fixed">

</div>
