// Client facing scripts here

/*
  Creates an article element with the tweeter data provided
  Returns string with all the HTML for one tweeter post
*/
const createRestaurantElement = (data) => {
  const $restaurant = $(`
    <article class="restaurant">
      <header>
      </header>
      <div class="body">
        <a href="/${data.id}/menu">${data.name}</a>
      </div>
      <footer>
      </footer>
    </article>
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
