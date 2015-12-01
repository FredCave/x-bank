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
		<?php
		echo "<ul id='index_letters'>";

		// Create a range of letters
		$letters = range('A', 'Z');
		// Loop through letters
		foreach ( $letters as $letter ) {
			
			// Create individual LIs
			echo "<li class='index_letter'><a href=''>";

			echo $letter;

			echo "</a></li>";

		}

		echo "</ul>";
		?>

		<!-- DIVs WITH CONTENT -->
		<?php include("06_a_index.php"); ?>

	</div>

</section>