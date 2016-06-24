var util = {};
var _ = require("lodash");
var fs = require('fs');

util.contains = function(array, element) {
  return array.indexOf(element) >= 0;
}

util.allCombinations = function combinations(list) {
    var combinator = function(active, rest, bucket) {
        if (!active.length && !rest.length)
            return [];
        if (!rest.length) {
            bucket.push(_.compact(_.flattenDeep(active)));
        } else {
            combinator([active, _.head(rest)], _.tail(rest), bucket);
            combinator([active], _.tail(rest), bucket);
        }
        return bucket;
    }
    return combinator("", list, []);
}

util.subSet = function(oneStateSet, aNotherStateSet) {
  return (aNotherStateSet.length > 0) && aNotherStateSet.every(function(state) {
    return util.contains(oneStateSet, state);
  });
}

util.evalNestedValue = function(object, keys) {
    return keys.reduce(function(nextObject, key) {
      return !nextObject ? nextObject : nextObject[key];
    }, object) || [];
}

util.sortedJoin = function(list) {
  return list.sort().join('');
}

util.readFile = function(fileName) {
  return fs.readFileSync(fileName).toString();
}

util.splitFile = function(content) {
  return _.dropRight(content.split('\n'));
}

exports.util = util;
