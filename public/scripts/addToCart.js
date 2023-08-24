$(document).ready(function() {
  $('.add-to-order').on('click', function() {
    const menuItemId = $(this).closest('.menu-item').data('id');
    const itemName = $(this).closest('.menu-item').find('.item-name').text();
    const itemPrice = $(this).closest('.menu-item').find('.price').text().replace('$', '');
    const itemQuantity = $(this).closest('.menu-item').find('.item-quantity').text();
    console.log(menuItemId);
    console.log(itemName);
    console.log(itemPrice);
    console.log(itemQuantity);
    
    const $cartItem = $(`
      <div class="cart-item" data-id="${menuItemId}">
        <p className="itemName">${itemName}</p>  
        <p className="totalPrice">${itemPrice * itemQuantity}</p>  
        <p className="itemQuantity">${itemQuantity}</p>  
      </div>
    `);

    $('#cart-list').append($cartItem);
    // this.parent('.menu-item');
  });
});