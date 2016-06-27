var _ = require('lodash');

var partitionNodes = function(parseTree, field) {
  return _.partition(parseTree, field);
}

exports.strategies = {
  'multipleObjectSameVerb' : (groupedTree) => {
    var allVerbs = _.flowRight(_.uniq, _.values, _.mapValues)(groupedTree, 'VERB');
    return allVerbs.reduce((result, aVerb) => {
      result.push(partitionNodes(groupedTree, {'VERB':aVerb})[0]);
      return result;
    }, []).map((aPartition) => {
      var head = _.head(aPartition);
      return {
        'NAME': head['NAME'],
        'VERB': head['VERB'],
        'OBJECTS': aPartition.reduce((bucket, aNode) => _.flatten([bucket, aNode['OBJECT']]), [])
      };
    })
  }
}
