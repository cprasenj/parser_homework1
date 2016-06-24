var grammar = require('./grammar.js');
var _ = require('lodash');
var util = require('./util.js').util;
var parser = {};

parser.parseInput = function(sentences) {
  return sentences.map(function(sentence) {
    return grammar.parse(sentence);
  });
}

parser.createParseTree = function(inputFile) {
  return _.flowRight(parser.parseInput, util.splitFile, util.readFile)(inputFile);
}

exports.parser = parser;
