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

				<?php 
				
				if( have_rows('opening_times') ):
					$i = 0;
					while ( have_rows('opening_times') ) : the_row();		
						/* get day */
						switch ($i) {
						    case 0: $day = "Monday"; break;
						    case 1: $day = "Tuesday"; break;
						    case 2: $day = "Wednesday"; break;
						    case 3: $day = "Thursday"; break;
						    case 4: $day = "Friday"; break;
						    case 5: $day = "Saturday"; break;	
						    case 6: $day = "Sunday"; break;						       
						}
						$i++;
						
						// times
						$times = get_sub_field('times');
						echo "<li>";
						// put into star function
						starFiller( 26, $day, $times );
						echo "</li>";
					endwhile;
				endif; ?>
			
			</div>

	<?php endwhile;
	endif;
	wp_reset_postdata(); 
	?> 
	
</section>
