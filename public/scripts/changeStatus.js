$(document).ready(function() {
  $('.statusList').on('change', function() {
    console.log('test change status');
    $('.changeStatus').submit();
  });
  
});
