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
      var head = _.head(aPartition);
      var verbs = _.flowRight(_.uniq, _.values, _.mapValues)(aPartition, 'VERB');
      var objectSameVerb = verbs.map((aVerb) => {
        var result = {};
        result[aVerb] = aPartition.filter((sentence) => sentence['VERB'] == aVerb)
               .map((aFilteredSentence) => aFilteredSentence['ACTIONABLE']);
        return result;
      })
      return {
        'NAME': head['NAME'],
        'VERBS': objectSameVerb
      }
    })
  }
}
