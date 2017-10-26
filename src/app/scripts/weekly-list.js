// var $ = require('jquery');
// console.log('blabla')   
(function() {
   // your page initialization code here
   // the DOM will be available here

})();

$(document).ready(function(){  
    ($('.currentYear')[0] || $('.week-list-item')[0]).scrollIntoView();
    $('[data-toggle="datepicker"]').datepicker();
});