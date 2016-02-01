<section id="on_show">

	<!-- SECTION CONTENT -->
	<div class="section_content">

		<?php
		$args = array(
			'post_type' => 'show',
			'posts_per_page' => 1
		);		
		$show_query = new WP_Query( $args );
		if ( $show_query->have_posts() ):
			while ( $show_query->have_posts() ): $show_query->the_post(); ?> 

			<div id="r_current_text">
				<ul>
					<li>From*24/02/16</li>
					<li>To*27/03/16</li>
				</ul>
			</div>	

			<!--<a href="" class="show_toggle scroller">-->
				<div id="r_current_image">
					<?php $image = get_field( "show_title" ); 
					$width = $image['sizes'][ 'thumbnail-width' ];
				    $height = $image['sizes'][ 'thumbnail-height' ];
				    $thumb = $image['sizes'][ "thumbnail" ];
				    $medium = $image['sizes'][ "medium" ];
				    $large = $image['sizes'][ "large" ];
					echo "<img class='lazyload'
				    data-src=' " . $thumb . " ' 
				    width=' " . $width . " ' 
				    height=' " . $height . " ' 
				    data-sizes='auto' 
				    data-srcset=' " . $large . " 1280w, 
				        " . $medium . " 800w, 
				        " . $thumb . " 300w' 
				    src=' " . $thumb . " ' />";
					?>
				</div>
			<!--</a>-->		

			<div id="r_current_content" class="show_content scroll_target">
				<h1><?php the_title(); ?></h1>

				<div>
					<!-- TEXT GOES HERE -->
					<?php the_field( "show_text" ); ?>
				</div>
			
				<?php /*
				<div class="show_share">
					<ul>
						<li><a href=""><img src="<?php bloginfo('template_url'); ?>/img/icon_facebook.svg" /></a></li>
						<li><a href=""><img src="<?php bloginfo('template_url'); ?>/img/icon_instagram.svg" /></a></li>
						<li><a href=""><img src="<?php bloginfo('template_url'); ?>/img/icon_twitter.svg" /></a></li>
					</ul>				
				</div>
				*/ ?>
		
			</div><!-- end of #r_current_content -->
		
		<?php endwhile;
		endif; ?>


	</div><!-- end of .section_content -->

</section>