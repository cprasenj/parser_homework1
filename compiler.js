var parser = require('./parser.js').parser;
var _ = require('lodash');
var compiler = {};

compiler.group = function(parseTree) {
  return parseTree.map(function(node) {
    var mergedNodes = node['child'].reduce(function(result, child) {
      return _.mergeWith(result, child, function(val1, val2) {
        return _.flatten([val1, val2]);
      });
    });
    return _.zipObject(mergedNodes['header'], mergedNodes['child']);
  });
}

compiler.compile = function(inputFileName, strategies){
  return _.flowRight(
    _.valuesIn(strategies),
     compiler.group,
     parser.createParseTree
   )(inputFileName);
};

exports.compiler = compiler;
