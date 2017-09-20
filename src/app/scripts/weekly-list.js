// var $ = require('jquery');
// console.log('blabla')   
(function() {
   // your page initialization code here
   // the DOM will be available here

})();

$(document).ready(function(){
    $('[data-toggle="datepicker"]').on('change',function(){
        $(this).val(this.value)})
    $('.currentYear')[0].scrollIntoView();
    $('[data-toggle="datepicker"]').datepicker();
});