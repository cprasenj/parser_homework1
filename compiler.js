var parser = require('./parser.js').parser;
var stringUtil = require('util');
var _ = require('lodash');
var compiler = {};

var decorator = function(accumulations){
    return _.flatten(accumulations.map((anAccumulation) => {
        var name = anAccumulation['NAME'];
        return anAccumulation['VERBS'].map((verbObjectMap) => {
            var verb = _.findKey(verbObjectMap);
            var objects = verbObjectMap[verb];
            return _.flatten(objects).length > 1 ?
            stringUtil.format('%s %s %s and %s',
              name, verb, _.dropRight(objects).join(', '), _.last(objects)) :
            stringUtil.format('%s %s %s',
              name, verb, _.head(objects));
        })
    }))
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
      decorator,
    _.valuesIn(strategies),
     compiler.group,
     parser.createParseTree
   )(inputFileName);
};

exports.compiler = compiler;
