<?php 
// FUNCTIONS INCLUDED HERE
include( "03_a_agenda.php" ); 
?>

<section id="agenda">

	<!-- CURRENT -->

		<!-- SECTION HEADER -->
	<?php addBreak(); ?>
	<div class="section_head">
		<h1>Agenda On Show</h1>
		<div class="back_to_top"><a href=""><img src="<?php bloginfo('template_url'); ?>/img/up_arrow.png" alt="Back to top" /></a></div>
	</div>
	<?php addBreak(); ?>

		<!-- SECTION CONTENT -->
	<div class="section_content">
		<?php
		$args = array(
			'post_type' => 'show'
		);		
		$show_query = new WP_Query( $args );
		if ( $show_query->have_posts() ):
			while ( $show_query->have_posts() ): $show_query->the_post(); 
				// IF END DATE NOT PAST
				if ( !isPast( get_field("show_end") ) ) :
					// IF START DATE PAST
					if ( isPast( get_field("show_start") ) ) :				
						
						showPost("current");
						addInnerBreak();

					endif;
				endif; // SHOW END CHECK
			endwhile;
		endif; ?>
	</div><!-- end of .section_content -->

	<!-- UPCOMING -->

		<!-- SECTION HEADER -->
	<?php addBreak(); ?>
	<div class="section_head">
		<h1>Agenda Upcoming</h1>
		<div class="back_to_top"><a href=""><img src="<?php bloginfo('template_url'); ?>/img/up_arrow.png" alt="Back to top" /></a></div>
	</div>
	<?php addBreak(); ?>

		<!-- SECTION CONTENT -->
	<div id="upcoming_content" class="section_content">
		<?php
		$args = array(
			'post_type' => 'show'
		);		
		$show_query = new WP_Query( $args );
		if ( $show_query->have_posts() ):
			while ( $show_query->have_posts() ): $show_query->the_post(); 
				// IF END DATE NOT PAST
				if ( !isPast( get_field("show_end") ) ) :
					// IF START DATE NOT PAST
					if ( !isPast( get_field("show_start") ) ) :			
						
						showPost("upcoming");
						addInnerBreak();

					endif; 
				endif; // SHOW END CHECK
			endwhile;
		endif; ?>
	</div><!-- end of .section_content -->

</section>