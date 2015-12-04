<ul class="sub_index">

	<ul class="index_results">



	</ul>
	
	<?php
	$args = array(
		"post_type" => "index",
		"posts_per_page" => -1,
		"orderby" => name
	);
	$index_query = new WP_Query( $args );
	if ( $index_query->have_posts() ) :
		while ( $index_query->have_posts() ): $index_query->the_post(); ?>
			<?php 
			$initial = get_the_title();
			?>
			<li class="index_artist <?php echo print_categories(); ?>" data-initial="<?php echo $initial[0]; ?>">
				
				<!-- TITLE, VISIBLE IN LIST -->
				<span class="index_artist_title"><a href=""><?php the_title(); ?></a></span>

				<!-- REST OF CONTENT, VISIBLE WHEN EXPANDED -->
				<div class="index_artist_content">
					
					<div class="index_artist_image">
						<a class="artist_vitrine_toggle" href=""><img src="<?php bloginfo( "template_url" ); ?>/img/BK.jpg" /></a>
					</div>

					<h1><a class="artist_vitrine_toggle" href=""><?php the_title(); ?></a></h1>

					<!-- VITRINE CODE -->

					</div></li></ul></ul></div></section>
					<div class="r_hole">
						<div class="r_hole_l"></div>
						<div class="r_hole_inset"></div>
						<div class="r_hole_r"></div>
					</div>

<section>
	<div class="section_content">
		<ul class="sub_index">
			<ul class="index_results">
			<li class="index_artist">
				<div class="index_artist_content">

					<!-- END OF VITRINE CODE -->

					<div class="index_artist_bio">
						<?php the_field("index_artist_bio"); ?>
					</div>

					<div class="clear"></div>
				</div>

			</li>

		<?php	
		endwhile;
	endif;
	wp_reset_postdata;
?>
</ul><!-- END OF #SUB_INDEX -->

