<?php

function showPost ( $type ) {

	// COUNT IMAGES
	$count = 0;
	if ( have_rows( "show_images" ) ):
		$images = get_field_object("show_images");
		$count = count( $images['value'] );
	endif; ?>

	<?php global $post; ?>
	<div class="show_wrapper" id="show-<?php the_ID(); ?>" data-count="<?php echo $count; ?>" data-slug="<?php echo $post->post_name; ?>">

		<?php if ( $type === "upcoming" ) : 
			// UPCOMING
			?>

			<a href="" class="show_toggle scroller upcoming">
				<div class="show_title scroll_target">
					<h1><?php the_title(); ?></h1>
				</div>
				<div class="show_dates">
					<ul>
						<li>From <?php the_field( "show_start" ); ?></li>
						<li>To <?php the_field( "show_end" ); ?></li>
					</ul>
				</div>	
				<div class="show_toggle_text">
					<span>Click to read more</span>
				</div>
			</a>

			<div class="show_content">

			<?php else: 
				// CURRENT
				?>
				<div class="show_dates">
					<ul>
						<li>From <?php the_field( "show_start" ); ?></li>
						<li>To <?php the_field( "show_end" ); ?></li>
					</ul>
				</div>	
				<a href="" class="show_toggle scroller">
					<div class="show_main_image">
						<?php $image = get_field( "show_title" ); 
						if ( !empty($image) ) {
							$width = $image['sizes'][ 'thumbnail-width' ];
						    $height = $image['sizes'][ 'thumbnail-height' ];
						    $thumb = $image['sizes'][ "thumbnail" ];
						    $medium = $image['sizes'][ "medium" ];
						    $large = $image['sizes'][ "large" ];
							echo "<img class='lazyload' 
							alt='" . get_the_title() . "' 
						    data-src='" . $thumb . "' 
						    width='" . $width . "' 
						    height='" . $height . "' 
						    data-sizes='auto' 
						    data-srcset='" . $large . " 1280w, 
						        " . $medium . " 800w, 
						        " . $thumb . " 300w' 
						    src=' " . $thumb . "' />";
						}
						?>
					</div>
					<div class="show_toggle_text">
						<span>Click to read more</span>
					</div>
				</a>

				<div class="show_content scroll_target">
					<h1><?php the_title(); ?></h1>

			<?php endif; ?>

			<div>
				<!-- TEXT GOES HERE -->
				<?php the_field( "show_text" ); ?>
			</div>

			<!-- MAIN IMAGE -->
			<?php if ( get_field("show_main_image") ) : ?>
				<div class="show_sec_image">
					<?php $image = get_field("show_main_image");
					if( !empty( $image ) ) {
						x_image_object( $image );	
					}
					?>
				</div>
			<?php endif; ?>


			<!-- ARTISTS EXHIBITED -->
			<?php if ( have_rows( "show_artists" ) ) : ?>
				<ul class="show_artists">
					<!-- ARTISTS IN INDEX -->
					<?php 
					// RETURNS MULTIPLE ARTISTS
					$artists = get_field("show_artists");

					// PUT IN ALPHABETICAL ORDER
					usort( $artists, "custom_sort" );

					// NEED SLUG FOR SEE MORE FUNCTION
					foreach ( $artists as $artist ) {
						$artist_slug = $artist->post_name; ?>	
						<li>
							<?php if ( get_field( "index_activate", $artist->ID ) ) : ?>
							<a href="" data-artist="<?php echo $artist_slug; ?>" class="show_artist_link">
								<?php echo $artist->post_title; ?>
							</a>
							<?php else : 
								echo $artist->post_title; 
							endif; ?>
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

			<div class="show_toggle_text_close">
				Read less
			</div>

			<!-- SHARE BUTTONS -->

			<?php 
			$image = get_field("show_main_image")["url"];
			if( empty( $image ) ) {
				$image = "http://xbank.amsterdam/wp-content/uploads/2016/01/x_bank.jpg";	
			}
			?>

			<ul class="show_share">
				<!-- FACEBOOK -->
				<?php $title = get_the_title(); ?>
				<li>
					<a target="_blank" href="<?php echo createFBUrl ( $image, $title ); ?>">
						<img src="<?php bloginfo('template_url'); ?>/img/icon_facebook.png" alt="Facebook icon" />
					</a>
				</li>
				<!-- TWITTER -->
				<li>
					<a class="twitter-share-button" 
						target="_blank" 
						data-url="<?php echo createTwitterUrl ( $image, $title )[1]; ?>" 
						href="<?php echo createTwitterUrl ( $image, $title )[2]; ?>">
						<img src="<?php bloginfo('template_url'); ?>/img/icon_twitter.png" alt="Twitter icon" />
					</a>
				</li>
			</ul>

		</div><!-- END OF .SHOW_CONTENT -->

	</div><!-- END OF .SHOW_WRAPPER -->	

<?php
	// RESET GLOBAL POST
	wp_reset_postdata();
}

?>