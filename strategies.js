var _ = require('lodash');

exports.strategies = {
  'multiplePersonMultipleObjectSameVerb' : (groupedTree) => {
    return _.flowRight(_.uniq, _.values, _.mapValues)(groupedTree, 'NAME')
    .reduce((result, aName) => {
      result.push(_.partition(groupedTree, {'NAME':aName})[0]);
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
