"use strict";

/**
 * Properties to prefix.
 */
var postcss = require("postcss"),
		props = [
			// text
			"hyphens",
			"line-break",
			"text-align-last",
			"text-emphasis",
			"text-emphasis-color",
			"text-emphasis-style",
			"word-break",
			// writing modes
			"writing-mode",
			"text-orientation",
			"text-combine-upright",
			// text to speech
			"cue",
			"cue-before",
			"cue-after",
			"pause",
			"rest",
			"speak",
			"speak-as",
			"voice-family"
		];

/**
 * PostCSS plugin to prefix ePub3 properties.
 * @param {Object} style
 */
function plugin(style) {
	style.eachDecl(function(decl) {
		if (decl.value) {
			if (props.indexOf(decl.prop) >= 0) {
				decl.parent.insertBefore(decl, decl.clone({prop: "-epub-" + decl.prop}));
			}
		}
	});
}

/*
 * ...and export for use...
 */
module.exports = {
	postcss: plugin,
	process: function(css, opts) {
		return postcss(plugin).process(css, opts).css;
	}
};
