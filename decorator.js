exports.decorator = function(accumulations){
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
