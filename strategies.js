var _ = require('lodash');

var partitionNodes = function(parseTree, field) {
  return _.partition(parseTree, field);
}

exports.strategies = {
  'multiplePersonMultipleObjectSameVerb' : (groupedTree) => {
    return _.flowRight(_.uniq, _.values, _.mapValues)(groupedTree, 'NAME')
    .reduce((result, aName) => {
      result.push(partitionNodes(groupedTree, {'NAME':aName})[0]);
      return result;
    }, [])
    .map((aPartition) => {
      return {
        'NAME': _.head(aPartition)['NAME'],
        'VERBS': _.flowRight(_.uniq, _.values, _.mapValues)(aPartition, 'VERB')
          .map((aVerb) => {
              var result = {};
              result[aVerb] = _.filter(aPartition, {'VERB':aVerb})
                     .map((aFilteredSentence) => aFilteredSentence['ACTIONABLE']);
              return result;
            })
      }
    })
  }
}
