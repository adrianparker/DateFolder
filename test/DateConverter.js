var chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert,
    DateConverter = require('./../DateConverter.js');

describe('convertToYYYYMMDD', function () {
   it('should throw an error on null input', function(){
       assert.throws(DateConverter.convertToYYYYMMDD, Error, "Needs non-null date");
   });
   it('should throw an error on a parameter that has no getDate function', function(){
       assert.throws(function(){
           var noGetDate = {
               getMonth: function(){},
               getFullYear: function(){}
           }
           DateConverter.convertToYYYYMMDD(noGetDate)
       }, Error, "Not a date object");
   });
   it('should throw an error on a parameter that has no getFullYear function', function(){
       assert.throws(function(){
           var noGetFullYear = {
               getDate: function(){},
               getMonth: function(){}
           }
           DateConverter.convertToYYYYMMDD(noGetFullYear)
       }, Error, "Not a date object");
   });
   it('should throw an error on a parameter that has no getMonth function', function(){
       assert.throws(function(){
           var noGetMonth = {
               getDate: function(){},
               getFullYear: function(){}
           }
           DateConverter.convertToYYYYMMDD(noGetMonth)
       }, Error, "Not a date object");
   });
   it('should not error on a valid Date instantiated with params', function(){
       assert.doesNotThrow(function(){
            var birthday = new Date(1995, 11, 17);
            DateConverter.convertToYYYYMMDD(birthday);
       });
   });
   it('should not error on a valid Date instantiated with no params', function(){
       assert.doesNotThrow(function(){
            var birthday = new Date();
            DateConverter.convertToYYYYMMDD(birthday);
       });
   });
   
});