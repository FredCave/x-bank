<!-- AJAX LOADED CONTENT / JUST IMAGES (+ OPTIONS MENU ) -->
<ul class="img_loop">
	<?php 
	if( have_rows('index_images') ):
	    while ( have_rows('index_images') ) : the_row(); ?>
			<!-- FUNCTION EXPORTS JUST IMG TAGS -->
        	<li class="img">
        		<span class="img_info_top img_info">
					See more / Buy it
				</span>

				<!-- IMAGE OBJECT FUNCTION IN FUNCTIONS.PHP -->
				<?php 
				$image = get_sub_field('index_image'); 
                if( !empty($image) ): 
					x_image_object( $image );
                endif; ?>
				<!-- IMAGE INFO/LINKS -->			
				<span class="img_info_bottom img_info">
					<ul class="img_info_icons">
						<li><img src="<?php bloginfo('template_url'); ?>/img/icon_facebook.svg" /></li>
						<li><img src="<?php bloginfo('template_url'); ?>/img/icon_instagram.svg" /></li>
						<li><img src="<?php bloginfo('template_url'); ?>/img/icon_twitter.svg" /></li>
					</ul>
				</span>
		    </li>
	    <?php
	    endwhile;
	endif;
	?>
</ul>