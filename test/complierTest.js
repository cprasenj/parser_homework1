var assert = require('chai').assert;
var expect = require('chai').expect;
var compiler = require('../compiler.js').compiler;
var strategies = require('../strategies.js').strategies;

describe("Compiler Test", function(){
  describe("When an input file is given",function(){
    it("Should group and give the taste based on actions", function(){
      var actual = compiler.compile('./test/data/compilerInput.txt',strategies);
      var excepted = ['ram hates butter and cheese', 'ram likes tea, coffee and biscuits'];
      expect(actual).to.have.members(excepted);
    });
  });
});
