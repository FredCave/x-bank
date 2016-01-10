<?php get_header(); ?>

	<style>
	#test_container {
/*		border: 1px solid orange;*/
		width: 100%;
/*		left: 25%;
		top: 33%;*/
		height: 100%;
		position: fixed;
	}
	.test_column {		
		width: 25%;
		height: 100%;
		position: absolute;
	}
	.test_column:nth-child(1) {
		left: 0%;
	}	
	.test_column:nth-child(2) {
		left: 25%;
	}
	.test_column:nth-child(3) {
		left: 50%;
	}
	.test_column:nth-child(4) {
		left: 75%;
	}
	.test_column ul {	
/*		position: absolute;*/
		top: 0%;
		width: 100%;
		/*height: 500px;*/
		text-align: center;
	}
	.test_column li {	
/*		border: 1px solid purple;*/
		margin-bottom: 90px;
	}
	.test_column img {
		width: 80%;
		height: auto;
		margin: 0% auto;
	} 
	.a {
/*		border: 1px solid red;*/
	}
	.b {
/*		border: 1px solid green;*/
/*		display: none;*/
	}
	</style>

	<div id="test_container">

		<div class="test_column">
			<ul id="test_ul_1" class="a">
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
			</ul>
		</div>

		<div class="test_column">
			<ul id="test_ul_1" class="a">
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
			</ul>
		</div>

		<div class="test_column">
			<ul id="test_ul_1" class="a">
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
			</ul>
		</div>

		<div class="test_column">
			<ul id="test_ul_1" class="a">
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
				<li><img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" /></li>
			</ul>
		</div>

	</div>

	<script>
	$(document).ready( function(){

		// each individual LI animated

		// when no longer visible, appended to bottom of list





		var ulH = $(".a").height();
		var conH = $("#test_container").height();
		console.log(ulH, conH);

		$.keyframe.define({
		    name: 'up',
		    from: {
		    	'transform': 'translateY(0px)'  
		    },
		    to: {
		        'transform': 'translateY(-' + ( ulH - conH ) + 'px)'  
		    }
		});

		$.keyframe.define({
		    name: 'down',
		    from: {
		    	'transform': 'translateY(-' + ( ulH - conH ) + 'px)'   
		    },
		    to: {
		        'transform': 'translateY(0px)' 
		    }
		});

		$(".test_column:nth-child(1), .test_column:nth-child(3)").playKeyframe({
		    name: 'up', 
		    duration: '60s', 
		    timingFunction: 'ease-out',
		    direction: 'alternate',

		    iterationCount: 'infinite',
		    complete: function(){
		    	
		    } 
		});

		$(".test_column:nth-child(2), .test_column:nth-child(4)").playKeyframe({
		    name: 'down', 
		    duration: '60s', 
		    timingFunction: 'ease-out',
		    direction: 'alternate', 
		    iterationCount: 'infinite',
		    complete: function(){
		    	
		    } 
		});	

		// $(".b").playKeyframe({
		//     name: 'up', 
		//     duration: '10s', 
		//     timingFunction: 'linear', 
		//     complete: function(){
		//     	$(".b").playKeyframe({
		// 		    name: 'down', 
		// 		    duration: '20s', 
		// 		    timingFunction: 'linear',
		// 		    iterationCount: 'infinite'
		// 		});
		//     } 
		// });	


	});
	</script>

<?php get_footer(); ?>

