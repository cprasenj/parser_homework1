var parser = require('./parser.js').parser;
var stringUtil = require('util');
var _ = require('lodash');
var compiler = {};

var decorator = {
  'default' : (accumulations) => {
    return accumulations.map((anAccumulation) => {
      var object = anAccumulation['OBJECTS'];
      return object.length > 1 ?
      stringUtil.format('%s %s %s and %s',
        anAccumulation['NAME'], anAccumulation['VERB'], _.dropRight(object).join(', '), _.last(object)) :
      stringUtil.format('%s %s %s',
        anAccumulation['NAME'], anAccumulation['VERB'], _.head(object));
    })
  }
}

compiler.group = function(parseTree) {
  return parseTree.map((node) => {
    var mergedNodes = node['child'].reduce(
      (result, child) =>  _.mergeWith(result, child,
        (val1, val2) =>  _.flatten([val1, val2])));
    return _.zipObject(mergedNodes['header'], mergedNodes['child']);
  });
}

compiler.compile = function(inputFileName, strategies){
  return _.flowRight(
    decorator['default'],
    _.valuesIn(strategies),
     compiler.group,
     parser.createParseTree
   )(inputFileName);
};

exports.compiler = compiler;
