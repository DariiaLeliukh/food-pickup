$(document).ready(function() {
  $('.add-to-order').on('click', function() {

    const menuItemId = $(this).closest('.menu-item').data('id');
    const itemName = $(this).closest('.menu-item').find('.item-name').text();
    const itemPrice = $(this).closest('.menu-item').find('.price').text().replace('$', '');
    const itemQuantity = $(this).closest('.menu-item').find('.item-quantity').text();

    const existingItems = $(`.cart-item[data-id="${menuItemId}"]`);
    if (existingItems.length > 0) {
      const newQuantity = parseInt(itemQuantity) + parseInt(existingItems.find('.itemQuantity').text());
      const idividualPrice = parseFloat(existingItems.find('.totalPrice').text()) / parseInt(existingItems.find('.itemQuantity').text());
      const newTotal = (idividualPrice * newQuantity).toFixed(2);
      existingItems.find('.totalPrice').text(newTotal);
      existingItems.find('.itemQuantity').text(newQuantity);
    } else {
      const total = (itemPrice * itemQuantity) / 100;
      const $cartItem = $(`
      <div class="cart-item row" data-id="${menuItemId}">
        <div class="col-8">
          <p class="itemName">${itemName}</p>
        </div>
        <div class="col-4">
          <p class="itemQuantity">${itemQuantity}</p>
        </div>
        <div class="col-12">
          <p class="totalPrice">${(itemPrice * itemQuantity).toFixed(2)}</p>
        </div>
      </div>
    `);

      $('#cart-list').append($cartItem);
    }
  });

  // Increase quantity
  $('.quantity .add').on('click', function() {
    let quantity = $(this).closest('.quantity').find('.item-quantity');
    quantity.text(parseInt(quantity.text()) + 1);
  });

  // Decrease quantity
  $('.quantity .subtract').on('click', function() {
    console.log('subtract');
    let quantity = $(this).closest('.quantity').find('.item-quantity');
    if (parseInt(quantity.text()) !== 1) {
      quantity.text(parseInt(quantity.text()) - 1);
    }
  });
});

