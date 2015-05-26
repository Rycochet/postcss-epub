# postcss-epub [![Build Status](https://travis-ci.org/Rycochet/postcss-epub.png)](https://travis-ci.org/Rycochet/postcss-epub)

> [PostCSS](https://github.com/postcss/postcss) plugin to give correct ePub3 css output.

See the [EPUB 3 CSS Profile](http://www.idpf.org/epub/30/spec/epub30-contentdocs.html#sec-css-text) for more information.

## Installation

    $ npm install postcss-epub

## Options

* ```fonts:true``` - This will ensure fonts have the correct font-weight and font-style defaults. This will also throw an error if any there is not a valid font source format (opentype or woff).
* ```strip:true``` - This will strip any non ```-epub-``` prefixes.
* ```strict:true``` - Implies all other options are set.

## Usage

```js
postcss([ require("postcss-epub") ])
// or
postcss([ require("postcss-epub")({strict:true}) ])
```

See [PostCSS] docs for examples for your environment.

## Example

```css
@font-face {
	font-family: 'Fake Font';
	src: local('Fake Font'),
		url('path/to/font.woff') format('woff'),
		url('path/to/font.ttf') format('truetype'),
		url('path/to/font.otf') format('opentype');
}

stuff {
	dont: care;
	hyphens: all;
	line-break: normal;
	text-align-last: center;
	text-emphasis: red triangle;
	text-emphasis-color: red;
	text-emphasis-style: triangle;
	word-break: break-all;
	-webkit-prefix: something;
}
```

```css
@font-face {
	font-family: 'Fake Font';
	src: local('Fake Font'),url('path/to/font.woff') format('woff'),url('path/to/font.otf') format('opentype');
	font-weight: normal;
	font-style: normal;
}

stuff {
	dont: care;
	-epub-hyphens: all;
	hyphens: all;
	-epub-line-break: normal;
	line-break: normal;
	-epub-text-align-last: center;
	text-align-last: center;
	-epub-text-emphasis: red triangle;
	text-emphasis: red triangle;
	-epub-text-emphasis-color: red;
	text-emphasis-color: red;
	-epub-text-emphasis-style: triangle;
	text-emphasis-style: triangle;
	-epub-word-break: break-all;
	word-break: break-all;
}
```

---

## [License](LICENSE)

[PostCSS]: https://github.com/postcss/postcss