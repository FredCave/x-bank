<!-- AJAX LOADED CONTENT / JUST IMAGES -->
<ul class="img_loop">
	<?php 
	if( have_rows('show_images') ):
	    while ( have_rows('show_images') ) : the_row(); 
	    	?>
			<!-- FUNCTION EXPORTS JUST IMG TAGS -->
        	<li class="img">
				<!-- IMAGE OBJECT FUNCTION IN FUNCTIONS.PHP -->
				<?php $image = get_sub_field('show_image'); 					
                if( !empty($image) ): 
					x_image_object( $image, True );
                endif; 
                ?>	
				<!-- IMAGE INFO/LINKS -->			
				<span class="img_info_bottom img_info">
					<ul class="img_info_icons">
						<?php
						global $post;
    					$post_slug = $post->post_name;
    					$a_name = $post_slug;
    					?>
						<!-- FACEBOOK -->
						<li>
							<a target="_blank" href="<?php echo createFBUrl ( $image, $a_name ); ?>">
								<img src="<?php bloginfo('template_url'); ?>/img/icon_facebook.png" alt="Facebook icon" />
							</a>
						</li>
						<!-- TWITTER -->
						<li>
							<a class="twitter-share-button" 
								target="_blank" 
								data-url="<?php echo createTwitterUrl ( $image, $a_name )[1]; ?>" 
								href="<?php echo createTwitterUrl ( $image, $a_name )[2]; ?>">
								<img src="<?php bloginfo('template_url'); ?>/img/icon_twitter.png" alt="Twitter icon" />
							</a>
						</li>
						
					</ul>
				</span>	
				
		    </li> 
	    <?php
	    endwhile;
	endif;
	?>
</ul>