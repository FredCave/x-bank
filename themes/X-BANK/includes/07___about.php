<section id="about">
	
	<?php 
	$x_query = new WP_Query("name=about");
	if ( $x_query -> have_posts() ) :
		while ( $x_query -> have_posts() ) : $x_query->the_post(); ?>
			
			<!-- SECTION HEADER -->

			<?php addBreak(); ?>
			<div class="section_head">
				<h1><?php the_title(); ?></h1>
				<div class="back_to_top"><a href="">&uarr;</a></div>
			</div>
			<?php addBreak(); ?>

			<!-- SECTION CONTENT -->

			<div class="section_content">
				<?php the_content(); ?>

				<!--

				ADD OPENING TIMES

				-->
			
			</div>

	<?php endwhile;
	endif;
	wp_reset_postdata(); 
	?> 
	
</section>
