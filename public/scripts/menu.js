const createMenuItem = (data) => {
  const $menuItem = $(`
    <article class="menu_item">
      <h2>${data.name}</h2>
    </article>
  `);
  return $menuItem;
};

const renderMenuItems = function(menuItems) {
  $('#menu-list').empty();
  menuItems.forEach(element => {
    const $menuItem = createMenuItem(element);
  });
};

const loadMenuItems = () => {
  $.ajax({
    url: "/api/all-restaurants",
    type: "GET",
    success: (result) => {
      renderMenuItems(result);
    },
    error: (error) => {
      console.error("An error occurred, ", error);
    },
  });
};

$(documnet).ready(function() {
  loadMenuItems();
});
