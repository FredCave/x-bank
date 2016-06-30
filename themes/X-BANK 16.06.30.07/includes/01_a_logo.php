<!-- TEST IMAGE -->

<?php $the_query = new WP_Query( array("name" => "logos") ); ?>
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
					alt="X Bank logo" 
					data-src="<?php echo $thumb; ?>" 
					src="<?php echo $thumb; ?>" 
					width="<?php echo $width; ?>" 
					height="<?php echo $height; ?>" 
					data-sizes="auto" 
					data-srcset="<?php echo $large; ?> 1280w, 
						<?php echo $medium; ?> 800w, 
						<?php echo $thumb; ?> 300w" />
				<noscript>
					<img alt="X Bank logo" src="<?php echo $large; ?>" />										
				</noscript>

			<?php endif; ?>

		<!-- End of post -->

	<?php endwhile; ?>
<?php } ?>