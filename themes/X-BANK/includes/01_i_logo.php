<!-- TEST IMAGE -->
<!-- <img src="<?php bloginfo('template_url'); ?>/img/x-bankLogo5_1200.png" /> -->

<?php $the_query = new WP_Query( array("post_type" => "x-logos") ); ?>
<?php if ( $the_query->have_posts() ) { ?>
	<?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
	
		<!-- The post -->

		<?php
		$rows = get_field('logos' ); // get all rows
		$rand_row = $rows[ array_rand( $rows ) ]; // get random row
		$image = $rand_row['logo'];
		?>
			<?php 
			if( !empty($image) ): 
				$thumb = $image['sizes'][ "thumbnail" ];
				$medium = $image['sizes'][ "medium" ];
				$large = $image['sizes'][ "large" ];
				$width = $image['width'];
				$height = $image['height'];
				?>

				<img class="lazyload"
					data-src="<?php echo $thumb; ?>" 
					width="<?php echo $width; ?>" 
					height="<?php echo $height; ?>" 
					data-sizes="auto" 
					data-srcset="<?php echo $large; ?> 1280w, 
						<?php echo $medium; ?> 800w, 
						<?php echo $thumb; ?> 300w" />
				<noscript>
					<img src="<?php echo $large; ?>" />										
				</noscript>

			<?php endif; ?>

		<!-- End of post -->

	<?php endwhile; ?>
<?php } ?>