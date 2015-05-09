var EventEmitter = require('events').EventEmitter

var noddityLinkRegex = /\[\[([\/\w.-]+)(?:\|([^\]>\n]+))?\]\]/gm

function numberOfOccurrances(str, input) {
	var occurrances = 0
	var current = input.indexOf(str)
	while (current !== -1) {
		occurrances++
		current = input.indexOf(str, current + 1)
	}
	return occurrances
}

function linkify(emitter, rootPath, htmlString) {
	return htmlString.replace(noddityLinkRegex, function(found, page, linkText, offset, wholeString) {
		var numberOfPrecedingCodeOpeners = numberOfOccurrances('<code', wholeString.substr(0, offset))
		var numberOfPrecedingCodeClosers = numberOfOccurrances('</code', wholeString.substr(0, offset))

		if (numberOfPrecedingCodeOpeners !== numberOfPrecedingCodeClosers) {
			return found
		} else {
			linkText = linkText || page
			emitter.emit('link', page)
			return '<a href="' + rootPath + page + '">' + linkText + '</a>'
		}
	})
}

module.exports = function Linkifier(rootPath) {
	var emitter = Object.create(new EventEmitter())
	emitter.linkify = linkify.bind(null, emitter, rootPath)
	return emitter
}
