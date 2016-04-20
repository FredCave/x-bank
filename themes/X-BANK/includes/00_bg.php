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
			global $post;
    		$post_slug = $post->post_name;
			
			if ( have_rows("index_images") ) :
							
				while ( have_rows("index_images") ) : the_row(); ?>
					
					<li id="<?php echo $imgName; ?>" class="img">
						
						<span class="img_info_top img_info">
							<!-- 
							LINK TO INDEX SECTION / LINK TO WEBSHOP
							-->
							<a id="see_more" href="#index" data-artist="<?php echo $post_slug; ?>">See more</a> <!--/ <a href="">Buy it</a>-->
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
													// GET IMAGE
													$image = get_sub_field("bg_column_image");

												/*
													// twitter cards hack
													if(is_single() || is_page()) {
														$twitter_url    = get_permalink();
														$twitter_title  = get_sub_field("bg_column_name");
														$twitter_desc   = get_sub_field("bg_column_name") . "available at xbank.amsterdam";
														$twitter_thumbs = $image;
														$twitter_thumb  = $image;
														// if(!$twitter_thumb) {
														// 	$twitter_thumb = 'http://www.gravatar.com/avatar/8eb9ee80d39f13cbbad56da88ef3a6ee?rating=PG&size=75';
														// }
														$twitter_name   = str_replace('@', '', get_the_author_meta('twitter'));
														?>
														<meta name="twitter:card" value="summary" />
														<meta name="twitter:url" value="<?php echo $twitter_url; ?>" />
														<meta name="twitter:title" value="<?php echo $twitter_title; ?>" />
														<meta name="twitter:description" value="<?php echo $twitter_desc; ?>" />
														<meta name="twitter:image" value="<?php echo $twitter_thumb; ?>" />
														<meta name="twitter:site" value="@libdemvoice" />
														<?
															if($twitter_name) {
															?>
															<meta name="twitter:creator" value="@<?php echo $twitter_name; ?>" />
															<?
														}
													}
												?>

												<span class="img_info_top img_info">
													<!-- LINK TO INDEX SECTION / LINK TO WEBSHOP -->
													<?php $customSlug = toAscii( get_sub_field("bg_column_name") ); ?>
													<a class="see_more" href="#index" data-artist="<?php echo $customSlug; ?>">See More</a> <!--/ <a href="">Buy it</a>-->
												</span>

												<?php 
												 */
												x_image_object( $image ); 
												/*
												?>

												<span class="img_info_bottom img_info">
													<ul class="img_info_icons">

														<!-- FACEBOOK -->
														<li><a href=""><img src="<?php bloginfo('template_url'); ?>/img/icon_facebook.svg" /></a></li>
														<!-- TWITTER -->
														<li>
															<a class="twitter-share-button" 
																target="_blank" 
																href="https://twitter.com/intent/tweet?text=<?php the_sub_field("bg_column_name"); ?> available at xbank.amsterdam">
																<img src="<?php bloginfo('template_url'); ?>/img/icon_twitter.svg" />
															</a>
														</li>
													</ul>
												</span>
												*/ ?>
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