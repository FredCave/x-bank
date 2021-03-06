<!-- AJAX LOADED CONTENT / JUST IMAGES (+ OPTIONS MENU ) -->
<ul class="img_loop">
	<?php 
	if( have_rows('index_images') ):
	    while ( have_rows('index_images') ) : the_row(); ?>
			<!-- FUNCTION EXPORTS JUST IMG TAGS -->
        	<li class="img">
        		<span class="img_info_top img_info hide">
        			<!-- BUY BUTTON HIDDEN -->
				</span>

				<!-- IMAGE OBJECT FUNCTION IN FUNCTIONS.PHP -->
				<?php 
				$image = get_sub_field('index_image'); 
                if( !empty($image) ): 
					x_image_object( $image, True );
                endif; ?>
				<!-- IMAGE INFO/LINKS -->			
				<span class="img_info_bottom img_info">
					<ul class="img_info_icons">
						<?php
						global $post;
    					$post_slug = $post->post_name;
    					$post_title = $post->post_title;
    					$image_url = $image["url"];
						echo soc_med_links( $post_slug, $post_title, $image_url ); 
						wp_reset_postdata();
						?>
					</ul>
				</span>
		    </li>
	    <?php
	    endwhile;
	    wp_reset_postdata();
	endif;
	?>
</ul>