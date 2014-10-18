[![Build Status](https://travis-ci.org/TehShrike/noddity-linkifier.svg)](https://travis-ci.org/TehShrike/noddity-linkifier)

Given an html document, turns the bracket-based link syntax into html links, in a manner very similar to MediaWiki's [Wikilinks](https://meta.wikimedia.org/wiki/Help:Link#Wikilinks).

So, given a root path of `#/myposts/` the linkify function turns `[[my-page.md]]` into `<a href="#/myposts/my-page.md">my-page.md</a>`, and turns `[[super-awesome-post.md|CLICK HERE to read awesome things]]` into `<a href="#/myposts/super-awesome-post.md">CLICK HERE to read awesome things</a>`.

Usage
=====

Constructor(rootPath)
-----

Create yourself a linkifier object with a root path, like so:

	var Linkifier = require('noddity-linkifier')

	var linkifier = new Linkifier('#/myposts/')

The linkifier object is an event emitter with one other property "linkify":

linkifier.linkify(string)
------

Takes a string with html or whatever and returns a string with all of the links that aren't inside of `<code>` tags are replaced with html links.

Events
------

The linkifier object is an event emitter - it emits a 'link' event whenever a link is found and replaced.  The sole argument is the target page - the examples from the top of the readme would have each emitted a 'link' event with a single argument 'my-page.md' and 'super-awesome-post.md', respectively.
