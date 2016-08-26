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
    					$post_title = $post->post_title;
    					$image_url = $image["sizes"]["medium"];
						echo soc_med_links( $post_slug, $post_title, $image_url ); 
						wp_reset_postdata();
						?>
					</ul>
				</span>	
				
		    </li> 
	    <?php
	    endwhile;
	endif;
	?>
</ul>