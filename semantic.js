var inputFile = process.argv[2];
var grammar = require('./grammar.js');
var _ = require('lodash');
var util = require('./util.js').util;
var semantic = {};

semantic.parseInput = function(sentences) {
  return sentences.map(function(sentence) {
    return grammar.parse(sentence);
  });
}

semantic.createParseTree = function(inputFile) {
  return _.flowRight(parseInput, util.splitFile, util.readFile)(inputFile);
}

// semantic.verifyChild = function(node) {
//   var collected = node.reduce(function(result, child) {
//     return _.mergeWith(result, child, function(val1, val2) {
//       return _.flatten([val1, val2]);
//     });
//   });
//   var ziped = _.zipObject(collected['header'], collected['child']);
//   var isValidActionTaken = isValidAction(ziped['ACTION'], ziped['ACTIONABLE']);
//   return {
//     'node' : node,
//     'isValid' : Boolean(isValidActionTaken),
//     'message' : util.evalNestedValue(messages, ['ACTIONABLE', Boolean(isValidActionTaken)])
//       (ziped['ACTION'], _.valuesIn(ziped['ACTIONABLE']))
//   };
// }

// semantic.semanticCheck = function(parseTree) {
//   return parseTree.map(function(node) {
//     return _.flowRight(verifyChild, util.evalNestedValue)(node, ['child']);
//   })
// }
//
// semantic.check = function(inputFile) {
//   var parseTree = _.flowRight(parseInput, util.splitFile, util.readFile)(inputFile);
//   var semanticChecked = semanticCheck(parseTree);
//   return semanticChecked;
// }
//
// semantic.semanticChecker = function(inputFile) {
//   var semanticChecked = check(inputFile);
//   var semanticErrors = semanticChecked.filter(function(aCheckedNode) {
//     return !aCheckedNode['isValid'];
//   })
//   return semanticErrors.length ? _.first(semanticErrors)['message'] : 'success';
// }

exports.semantic = semantic;
// console.log(semanticChecker(inputFile))
