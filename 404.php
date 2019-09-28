<?php
/**
 * The template for displaying 404 pages (Not Found)
 */

$context = Timber::get_context();

$context['body_class']  = 'page-404';
Timber::render( '404.twig', $context );