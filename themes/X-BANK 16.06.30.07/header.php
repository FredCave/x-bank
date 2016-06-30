<!DOCTYPE html>
<html <?php language_attributes(); ?> style="margin-top: 0px !important" data-scroll="0">

<head>
	<title>X BANK</title>
    <meta name="description" content="">
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta property="og:url" content="<?php bloginfo('url'); ?>" />
    <meta property="og:type" content="Website" />
    <meta property="og:title" content="X-Bank" />
    <meta property="og:description" content="X BANK is a 700 m2 hybrid store in the center of Amsterdam presenting the most comprehensive collection of predominantly Dutch fashion, art and design in the world." />
    <meta property="og:image" content="http://xbank.amsterdam/wp-content/uploads/2016/01/x_bank.jpg" />

    <!-- TWITTER -->
    <meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@xbank_amsterdam">
	<meta name="twitter:description" content="X BANK is a 700 m2 hybrid store in the center of Amsterdam presenting the most comprehensive collection of predominantly Dutch fashion, art and design in the world.">
	<?php if ( isset( $wp_query->query_vars['artist'] ) ) {
		$_url_name = urldecode( $wp_query->query_vars['artist'] );
		?>
		<meta name="twitter:title" content="<?php echo $_url_name; ?> available at xbank.amsterdam">
	<?php } else { ?>
		<meta name="twitter:title" content="xbank.amsterdam">
	<?php } ?>
	<?php if ( isset( $wp_query->query_vars['image'] ) ) { 
		$_url_image = urldecode( $wp_query->query_vars['image'] );
		?>
		<meta name="twitter:image" content="<?php echo $_url_image; ?>">
	<?php } else { ?>
		<meta name="twitter:image" content="http://xbank.amsterdam/wp-content/uploads/2016/01/x_bank.jpg">
	<?php } ?>

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url') ?>">
	
	<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
	<link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194">
	<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
	<link rel="manifest" href="/manifest.json">
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="msapplication-TileImage" content="/mstile-310x310.png">
	<meta name="theme-color" content="#ffffff">

	<script>
		// Picture element HTML5 shiv
		document.createElement( "picture" );
		// FIX IE CONSOLE ERRORS
		if (!window.console) console = {log: function() {}}; 
	</script>

	<?php wp_head(); ?>

</head>

<body>
	<script>
		// ANALYTICS
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-76520377-1', 'auto');
		ga('send', 'pageview');
		// FACEBOOK
		window.fbAsyncInit = function() {
			FB.init({
				appId      : '1196911897000591',
				xfbml      : true,
				version    : 'v2.6'
			});
		};
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	</script>