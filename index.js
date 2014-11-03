/**
 * Properties to prefix.
 */
var props = [
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
 */
module.exports = function plugin() {
	return function(style) {
		style.eachDecl(function(decl) {
			if (decl.value) {
				try {
					if (props.indexOf(decl.prop) >= 0) {
						decl.insertBefore(decl.clone({prop: "-epub-" + decl.prop}));
					}
				} catch (err) {
					err.message = gnuMessage(err.message, decl.source);
					throw err;
				}
			}
		});
	};
};

/**
 * return GNU style message
 *
 * @param {String} message
 * @param {Object} source
 */
function gnuMessage(message, source) {
	return (source ? (source.file ? source.file : "<css input>") + ":" + source.start.line + ":" + source.start.column : "") + " " + message;
}
