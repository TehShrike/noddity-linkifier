var makeEmitter = require('make-object-an-emitter')

var noddityLinkRegex = /\[\[([^\]\|]+)(?:\|([^\]>\n]+))?\]\]/gm

function numberOfOccurrances(str, input) {
	var occurrances = 0
	var current = input.indexOf(str)
	while (current !== -1) {
		occurrances++
		current = input.indexOf(str, current + 1)
	}
	return occurrances
}

function encodeFolderUsingUri(file) {
	return file.split('/').map(function (part) { return encodeURIComponent(part) }).join('/')
}

function pureLinkify(emitter, rootPath, htmlString) {
	return htmlString.replace(noddityLinkRegex, function(found, page, linkText, offset, wholeString) {
		var numberOfPrecedingCodeOpeners = numberOfOccurrances('<code', wholeString.substr(0, offset))
		var numberOfPrecedingCodeClosers = numberOfOccurrances('</code', wholeString.substr(0, offset))

		if (numberOfPrecedingCodeOpeners !== numberOfPrecedingCodeClosers) {
			return found.replace('[[', '&#91;&#91;').replace(']]', '&#93;&#93;')
		} else {
			linkText = linkText || page
			emitter.emit('link', page)
			return '<a href="' + rootPath + encodeFolderUsingUri(page) + '">' + linkText + '</a>'
		}
	})
}

module.exports = function Linkifier(rootPath) {
	var linkify = function curryLinkify(htmlString) {
		return pureLinkify(linkify, rootPath, htmlString)
	}

	makeEmitter(linkify)

	linkify.linkify = linkify

	return linkify
}
