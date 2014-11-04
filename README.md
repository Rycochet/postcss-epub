# postcss-epub [![Build Status](https://travis-ci.org/Rycochet/postcss-epub.png)](https://travis-ci.org/Rycochet/postcss-epub)

> [PostCSS](https://github.com/postcss/postcss) plugin to prefix ePub3 properties.

See the [EPUB 3 CSS Profile](http://www.idpf.org/epub/30/spec/epub30-contentdocs.html#sec-css-text) for more information.

**Note:** This will leave the unprefixed property, there are other plugins to remove them if creating ePub3-only files.

## Installation

    $ npm install postcss-epub

## Usage

```js
// dependencies
var fs = require("fs")
var postcss = require("postcss")
var epub = require("postcss-epub")

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

// process css
var output = postcss()
  .use(epub)
  .process(css)
  .css
```

---

## [License](LICENSE)
