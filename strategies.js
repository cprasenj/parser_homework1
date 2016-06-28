var _ = require('lodash');

var partitionNodes = function(parseTree, field) {
  return _.partition(parseTree, field);
}

exports.strategies = {
  // 'multipleObjectSameVerb' : (groupedTree) => {
  //   var allNames = _.flowRight(_.uniq, _.values, _.mapValues)(groupedTree, 'NAME');
  //   console.log(allNames);
  //   return _.flowRight(_.uniq, _.values, _.mapValues)(groupedTree, 'VERB')
  //   .reduce((result, aVerb) => {
  //     result.push(partitionNodes(groupedTree, {'VERB':aVerb})[0]);
  //     return result;
  //   }, [])
  //   .map((aPartition) => {
  //     var head = _.head(aPartition);
  //     return {
  //       'NAME': head['NAME'],
  //       'VERB': head['VERB'],
  //       'OBJECTS': aPartition.reduce((bucket, aNode) => _.flatten([bucket, aNode['OBJECT']]), [])
  //     };
  //   })
  // }

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
               .map((aFilteredSentence) => aFilteredSentence['OBJECT']);
        return result;
      })
      return {
        'NAME': head['NAME'],
        'VERBS': objectSameVerb
      }
    })
  }
}
