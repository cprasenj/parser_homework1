var inputFile = process.argv[2];
var parser = require('./parser.js').parser;
var _ = require('lodash');
var stringUtil = require('util');

var compiler = {};

var strategies = {
  'multipleObjectSameVerb' : function(groupedTree) {
    var partitionByVerb = compiler.partitionNodes(groupedTree, {'VERB':'likes'});
    return partitionByVerb.map(function(aPartition) {
      var head = _.head(aPartition);
      var name = head['NAME'];
      var verb = head['VERB'];
      var objects = aPartition.reduce(function(bucket, aNode) {
        return _.flatten([bucket, aNode['OBJECT']]);
      }, []);
      return stringUtil.format('%s %s %s and %s',
        name, verb, _.dropRight(objects).join(''), _.last(objects));
    })
  }
}

compiler.partitionNodes = function(parseTree, field) {
  return _.partition(parseTree, field);
}

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

compiler.complie = function(inputFileName){
  var parseTree = parser.createParseTree(inputFileName);
  var collected = compiler.group(parseTree);
  var compiled = _.flowRight(_.valuesIn(strategies))(collected);
  console.log(compiled)
};

compiler.complie(inputFile);
exports.compiler = compiler;
