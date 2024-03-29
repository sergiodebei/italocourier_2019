<?php
/**
 * The Template for displaying pages
 *
 */

if ( ! class_exists( 'Timber' ) ) {
  echo 'Timber not activated. Make sure you activate the plugin in <a href="./wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
  return;
}

$templates = array( 'index.twig' );
if ( is_home() ) {
	array_unshift( $templates, 'home.twig' );
}
$post                   = Timber::get_post();
$context                = Timber::get_context();
$context['post']        = $post;

Timber::render(array($template), $context);