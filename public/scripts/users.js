// Client facing scripts here

/*
  Creates an article element with the tweeter data provided
  Returns string with all the HTML for one tweeter post
*/
const createRestaurantElement = (data) => {
  const $restaurant = $(`
  <div class="card col-12 col-md-6">
  <img src="${data.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <a href="/menu/${data.id}" class="btn btn-primary">${data.name}</a>
  </div>
</div>
`);
  return $restaurant;
};

/*
  Render all the restaurants
*/
const renderRestaurants = function(restaurants) {
  $('#restaurant-list').empty();
  restaurants.forEach(element => {
    const $restaurant = createRestaurantElement(element);
    $('#restaurant-list').append($restaurant);
  });
};

/*
  Load all the restaurants from the db
*/
const loadRestaurants = () => {
  $.ajax({
    url: "/api/all-restaurants",
    type: "GET",
    success: (result) => {
      renderRestaurants(result);
    },
    error: (error) => {
      console.error("An error occurred, ", error);
    },
  });
};

/*
  Main functionality
*/

$(document).ready(function() {
  loadRestaurants();
});
