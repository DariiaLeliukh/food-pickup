$(document).ready(function() {
  $('.statusList').on('change', function() {
    $(this).closest('.changeStatus').submit();
  });

});
