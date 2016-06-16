<!-- AJAX LOADED CONTENT / JUST IMAGES -->
<ul class="img_loop">
	<?php 
	if( have_rows('show_images') ):
	    while ( have_rows('show_images') ) : the_row(); ?>
			<!-- FUNCTION EXPORTS JUST IMG TAGS -->
        	<li class="img">
				<!-- IMAGE OBJECT FUNCTION IN FUNCTIONS.PHP -->
				<?php $image = get_sub_field('show_image'); 			
                if( !empty($image) ): 
					x_image_object( $image );
                endif; ?>		
		    </li>
	    <?php
	    endwhile;
	endif;
	?>
</ul>