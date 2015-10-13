[![Build Status](https://travis-ci.org/TehShrike/noddity-linkifier.svg)](https://travis-ci.org/TehShrike/noddity-linkifier)

Given an html document, turns the bracket-based link syntax into html links, in a manner very similar to MediaWiki's [Wikilinks](https://meta.wikimedia.org/wiki/Help:Link#Wikilinks).

Example
=======

```js

var Linkifier = require('.')
var linkify = new Linkifier('#/myposts/')

linkify('[[my-page.md]]') // => '<a href="#/myposts/my-page.md">my-page.md</a>'

linkify('[[super-awesome-post.md|CLICK HERE to read awesome things]] dawg!') // => '<a href="#/myposts/super-awesome-post.md">CLICK HERE to read awesome things</a> dawg!'


```


Usage
=====

Constructor(rootPath)
-----

Create yourself a linkifier object with a root path, like so:

	var Linkifier = require('noddity-linkifier')

	var linkify = new Linkifier('#/myposts/')

`linkify` is both a function, and an event emitter.

linkify(string)
------

Takes a string with html or whatever and returns a string with all of the links that aren't inside of `<code>` tags are replaced with html links.

Events
------

The linkifier object is an event emitter - it emits a 'link' event whenever a link is found and replaced.  The sole argument is the target page - the examples from the top of the readme would have each emitted a 'link' event with a single argument 'my-page.md' and 'super-awesome-post.md', respectively.
