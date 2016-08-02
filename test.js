var Linkify = require('./index.js')
var test = require('tape')

test('replaces a title-less link with an <a> element', function(t) {
	var input = "<p>wassup my home [[target]]</p>"

	var linkify = new Linkify('#/wat/').linkify

	var output = linkify(input)

	t.equal(output, '<p>wassup my home <a href="#/wat/target">target</a></p>', 'equal to the string that I said it should be')
	t.end()
})

test('replaces a title-less link containing a "/" with an <a> element', function(t) {
	var input = "<p>wassup my home [[target/child]]</p>"

	var linkify = new Linkify('#/wat/').linkify

	var output = linkify(input)

	t.equal(output, '<p>wassup my home <a href="#/wat/target/child">target/child</a></p>', 'equal to the string that I said it should be')
	t.end()
})

test('turns a link with a title into an <a> element', function(t) {
	var input = "<p>wassup my home [[target|teh page]]</p>"

	var linkify = new Linkify('#/wat/').linkify

	var output = linkify(input)

	t.equal(output, '<p>wassup my home <a href="#/wat/target">teh page</a></p>', 'equal to the string that I said it should be')
	t.end()
})

test('turns a link with a "/" and a title into an <a> element', function(t) {
	var input = "<p>wassup my home [[target/child|teh page]]</p>"

	var linkify = new Linkify('#/wat/').linkify

	var output = linkify(input)

	t.equal(output, '<p>wassup my home <a href="#/wat/target/child">teh page</a></p>', 'equal to the string that I said it should be')
	t.end()
})

test('turns a link with an extension and a title into an <a> element', function(t) {
	var input = "<p>wassup my home [[my-target.butts|teh page]]</p>"

	var linkify = new Linkify('#/wat/').linkify

	var output = linkify(input)

	t.equal(output, '<p>wassup my home <a href="#/wat/my-target.butts">teh page</a></p>', 'equal to the string that I said it should be')
	t.end()
})

test('turns a link with a "/" and an extension and a title into an <a> element', function(t) {
	var input = "<p>wassup my home [[my-target/child.butts|teh page]]</p>"

	var linkify = new Linkify('#/wat/').linkify

	var output = linkify(input)

	t.equal(output, '<p>wassup my home <a href="#/wat/my-target/child.butts">teh page</a></p>', 'equal to the string that I said it should be')
	t.end()
})

test("Doesn't convert items inside code elements", function(t) {
	var input = "<p><code>wassup my home [[target|teh page]]</code></p>"

	var linkify = new Linkify('#/wat/').linkify

	var output = linkify(input)

	var expected = "<p><code>wassup my home &#91;&#91;target|teh page&#93;&#93;</code></p>"

	t.equal(output, expected, 'equal to the string that I said it should be')
	t.end()
})

test("Converts links following code elements", function(t) {
	var input = "<p><code>wassup</code> my home [[target|teh page]]</p>"

	var linkify = new Linkify('#/wut/').linkify

	var output = linkify(input)

	t.equal(output, '<p><code>wassup</code> my home <a href="#/wut/target">teh page</a></p>', 'equal to the string that I said it should be')
	t.end()
})

test("Converts links following code elements and newlines", function(t) {
	var input = "<p><code>wassup</code>\n\nmy home [[target|teh page]]</p>"

	var linkify = new Linkify('#/wut/').linkify

	var output = linkify(input)

	t.equal(output, '<p><code>wassup</code>\n\nmy home <a href="#/wut/target">teh page</a></p>', 'equal to the string that I said it should be')
	t.end()
})

test("Testing this one string that isn't working for some reason", function(t) {
	var input = "<p>In addition, the client is also turning <code>[[some-page-you-want-to-link-to.md|wiki-style internal links]]</code> into [[some-page-you-want-to-link-to.md|wiki-style internal links]].</p>"
	var linkify = new Linkify('#/wut/').linkify

	var output = linkify(input)

	t.equal(output, '<p>In addition, the client is also turning <code>&#91;&#91;some-page-you-want-to-link-to.md|wiki-style internal links&#93;&#93;</code> into <a href="#/wut/some-page-you-want-to-link-to.md">wiki-style internal links</a>.</p>', 'equal to the string that I said it should be')
	t.end()
})

test("Emits an event when parsing a link", function(t) {
	t.plan(2)

	var emitter = new Linkify('#/wat/')

	emitter.once('link', function(pageName) {
		t.equal('target', pageName, 'the page name matches the link target')
	})
	emitter.linkify("<p>wassup my home [[target|teh page]]</p>")

	emitter.once('link', function(pageName) {
		t.equal('butts', pageName, 'the page name matches the link target')
	})

	emitter.linkify("<p>wassup my home [[butts|teh page]]</p>")
})

test("The emitter is also a function", function(t) {
	t.plan(2)

	var emitter = new Linkify('#/wat/')

	emitter.once('link', function(pageName) {
		t.equal('target', pageName, 'the page name matches the link target')
	})
	emitter("<p>wassup my home [[target|teh page]]</p>")

	emitter.once('link', function(pageName) {
		t.equal('butts', pageName, 'the page name matches the link target')
	})

	emitter("<p>wassup my home [[butts|teh page]]</p>")
})

test("A post name with slashes and stuff", function(t) {
	var testString = "[[Web/Sermons/New Testament/Revelation/Pickering's Translation/PickeringTranslationRevelation.md|translation]]"

	var linkify = new Linkify('#/wat/')

	var output = linkify(testString)

	t.equal(output, '<a href="#/wat/Web/Sermons/New Testament/Revelation/Pickering\'s Translation/PickeringTranslationRevelation.md">translation</a>')

	t.end()
})
