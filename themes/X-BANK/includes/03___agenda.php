<section id="agenda">

	<?php addBreak(); ?>

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

			<div class="show_wrapper">

				<div id="r_current_text">
					<ul>
						<li>From*<?php the_field( "show_start" ); ?></li>
						<li>To*<?php the_field( "show_end" ); ?></li>
					</ul>
				</div>	

				<a href="" class="show_toggle scroller">
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

					<div class="show_toggle_text">
						<span>Click to read more</span>
					</div>

				</a>	

				<div id="r_current_content" class="show_content scroll_target">
					<h1><?php the_title(); ?></h1>

					<div>
						<!-- TEXT GOES HERE -->
						<?php the_field( "show_text" ); ?>
					</div>

					<!-- ARTISTS EXHIBITED -->
					<?php if ( have_rows( "show_artists" ) ) : ?>
						<ul class="show_artists">
							<!-- ARTISTS IN INDEX -->
							<?php 
							// RETURNS MULTIPLE ARTISTS
							$artists = get_field("show_artists");

							// PUT IN ALPHABETICAL ORDER
							function custom_sort( $a, $b ) {
								return strtolower ( $a->post_title ) > strtolower ( $b->post_title );
							}
							usort( $artists, "custom_sort" );

							// NEED SLUG FOR SEE MORE FUNCTION
							foreach ( $artists as $artist ) {
								$artist_slug = $artist->post_name; ?>	
								<li>
									<!--<a href="" data-artist="<?php echo $artist_slug; ?>" class="show_artist_link">-->
										<?php echo $artist->post_title; ?>
									<!--</a>-->
								</li>
							<?php
							} 
							?>
							<!-- ARTISTS NOT IN INDEX -->
							<?php if ( get_field( "show_artists_other" ) ) :
								while ( have_rows( "show_artists_other" ) ) : the_row(); ?>
									<li>
										<!-- IF LINK -->
										<?php if ( get_sub_field( "show_artist_link" ) ) { ?>
											<!--<a href="<?php the_sub_field('show_artist_link'); ?>" target="_blank" class="show_artist_link">-->
												<?php the_sub_field( "show_artist_name" ); ?>
											<!--</a>-->
										<?php } else { 
											the_sub_field( "show_artist_name" );
										} ?>
									</li>
							<?php 
								endwhile; 
							endif;
							?> 
						</ul>
					<?php endif; ?>

					<!-- SHOW IMAGES -->
					<?php if ( get_field( "show_images" ) ) : ?>
						<ul class="show_images">
							<?php while ( have_rows( "show_images" ) ) : the_row(); ?>
								<li>
									<?php 
									$image = get_sub_field( "show_image" );
									x_image_object( $image );
									?> 
								</li>
							<?php endwhile; ?>
						</ul>
						<div class="show_images_nav">
							<a href="" class="show_images_nav_left"><</a> 
							<a href="" class="show_images_nav_right">></a> 
						</div>
					<?php endif; ?>


					<div class="show_toggle_text_close">
						Read less
					</div>
			
				</div><!-- end of #r_current_content -->

			</div><!-- END OF .SHOW_WRAPPER -->
		
		<?php endwhile;
		endif; ?>


	</div><!-- end of .section_content -->

</section>