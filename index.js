"use strict";

/**
 * Properties to prefix.
 */
var postcss = require("postcss"),
		list = require("postcss/lib/list"),
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
		],
		types = [
			"opentype",
			"woff"
		],
		rxTypes = new RegExp("format\\(['\"]?(" + types.join("|") + ")['\"]?\\)");

module.exports = postcss.plugin("postcss-epub", function(opts) {
	opts = opts || {};

	var
			/**
			 * Sets all other options to true.
			 * @type {boolean}
			 */
			isStrict = opts.strict,
			/**
			 * Set if we are to do strict font format checking and strip any non-epub prefixes.
			 * @type {boolean}
			 */
			isStrip = isStrict || opts.strip,
			/**
			 * Set if we are to only check that the font defaults are correct.
			 * @type {boolean}
			 */
			isFonts = isStrict || opts.fonts;

	/**
	 * PostCSS plugin to prefix ePub3 properties.
	 * @param {Object} css
	 */
	return function(css) {
		css.eachDecl(function(decl) {
			if (decl.value) {
				if (props.indexOf(decl.prop) >= 0) {
					decl.parent.insertBefore(decl, decl.clone({
						prop: "-epub-" + decl.prop
					}));
				} else if (isStrip && decl.prop[0] === "-" && !/^-epub-/.test(decl.prop)) {
					decl.parent.remove(decl);
				}
			}
		});
		if (isFonts) {
			css.eachAtRule(function(rule) {
				if (rule.name === "font-face") {
					var hasWeight = false,
							hasStyle = false;

					rule.eachDecl(function(decl) {
						switch (decl.prop) {
							case "src":
								var i,
										fonts = list.comma(decl.value),
										usable = [];

								for (i = 0; i < fonts.length; i++) {
									if (!/url\(/.test(fonts[i]) || rxTypes.test(fonts[i])) {
										usable.push(fonts[i]);
									}
								}
								if (usable.length) {
									decl.value = usable.join(",");
								} else {
									throw decl.error("No valid font format, must have one of: " + types.join(", "), {plugin: "postcss-epub"});
								}
								break;
							case "font-weight":
								hasWeight = true;
								break;
							case "font-style":
								hasStyle = true;
								break;
						}
					});
					if (!hasWeight) {
						rule.append({prop: "font-weight", value: "normal"});
					}
					if (!hasStyle) {
						rule.append({prop: "font-style", value: "normal"});
					}
				}
			});
		}
	};
});