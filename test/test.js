var assert = require("assert"),
		epub = require(".."),
		read = require("fs").readFileSync,
		postcss = require("postcss");

function readFile(name) {
	return read("test/" + name + ".css", "utf8").trim();
}

function processFile(name) {
	return postcss()
			.use(epub)
			.process(readFile(name))
			.css
			.trim();
}

exports["test epub css \"text\" output gets correct prefixes"] = function() {
	assert.equal(processFile("epub-text"), readFile("epub-text.out"), "CSS Text not as expected");
};
exports["test epub css \"writing\" output gets correct prefixes"] = function() {
	assert.equal(processFile("epub-writing"), readFile("epub-writing.out"), "CSS Writing not as expected");
};
exports["test epub css \"speech\" output gets correct prefixes"] = function() {
	assert.equal(processFile("epub-speech"), readFile("epub-speech.out"), "CSS Speech not as expected");
};

if (module === require.main) {
	require("test").run(exports);
}
