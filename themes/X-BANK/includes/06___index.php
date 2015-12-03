<section id="index">

	<!-- SECTION HEADER -->

	<?php addBreak(); ?>
	<div class="section_head">
		<h1>INDEX</h1>
		<div class="back_to_top"><a href="">&uarr;</a></div>
	</div>
	<?php addBreak(); ?>

	<div class="section_content">
		
		<!-- LETTERS -->
		<ul id="index_letters" class="index_menu">
			<?php
			// Create a range of letters
			$letters = range('A', 'Z');
			// Loop through letters
			foreach ( $letters as $letter ) {			
				// Create individual LIs
				echo "<li class='index_letter'><a href=''>" . $letter . "</a></li>";
			} ?>
		</ul>

		<!-- CATEGORIES -->
		<ul id="index_categories" class="index_menu">
			<li><a href="">Art</a></li>
			<li><a href="">Fashion</a></li>
			<li><a href="">Design</a></li>
			<div class="clear"></div>
		</ul>

		<!-- DIVs WITH CONTENT -->
		<?php include("06_a_index.php"); ?>

	</div>

</section>