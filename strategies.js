var _ = require('lodash');
var stringUtil = require('util');

var partitionNodes = function(parseTree, field) {
  return _.partition(parseTree, field);
}

exports.strategies = {
  'multipleObjectSameVerb' : function(groupedTree) {
    var allVerbs = _.flowRight(_.uniq, _.values, _.mapValues)(groupedTree, 'VERB');
    var partitionByVerb = allVerbs.reduce(function(result, aVerb) {
      result.push(partitionNodes(groupedTree, {'VERB':aVerb})[0]);
      return result;
    }, []);
    return partitionByVerb.map(function(aPartition) {
      var head = _.head(aPartition);
      var objects = aPartition.reduce(function(bucket, aNode) {
        return _.flatten([bucket, aNode['OBJECT']]);
      }, []);
      return stringUtil.format('%s %s %s and %s',
        head['NAME'], head['VERB'], _.dropRight(objects).join(', '), _.last(objects));
    })
  }

  // '' : function() {
  //
  // }
}
