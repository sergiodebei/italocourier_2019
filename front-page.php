<?php
/**
 * The Template for displaying pages
 *
 */

$template               = 'home.twig';
$context                = Timber::get_context();
$post                   = new TimberPost();
$context['post']        = $post;

// $context['post']->blocks = $post->get_field('blocks');
// $context['fieldname'] = get_field('fieldname');
$context['post']->home_blocks = $post->get_field('home_blocks');
$context['currentlanguage'] = pll_current_language();

//get google map api
$context['gmapi'] = GMAPI;

$context['body_class']  = 'page-home';
$context['is_front_page'] = 'true';

Timber::render([$template], $context);