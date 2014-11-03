"use strict";

/**
 * Properties to prefix.
 */
var postcss = require("postcss"),
		props = [
			"hyphens",
			"line-break",
			"text-align-last",
			"text-emphasis",
			"text-emphasis-color",
			"text-emphasis-style",
			"word-break"
		];

/**
 * PostCSS plugin to prefix ePub3 properties.
 * @param {Object} style
 */
function plugin(style) {
	style.eachDecl(function(decl) {
		if (decl.value) {
			try {
				if (props.indexOf(decl.prop) >= 0) {
					decl.parent.insertBefore(decl, decl.clone({prop: "-epub-" + decl.prop}));
				}
			} catch (err) {
				err.message = gnuMessage(err.message, decl.source);
				throw err;
			}
		}
	});
}

/**
 * return GNU style message
 *
 * @param {String} message
 * @param {Object} source
 */
function gnuMessage(message, source) {
	return (source ? (source.file ? source.file : "<css input>") + ":" + source.start.line + ":" + source.start.column : "") + " " + message;
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
