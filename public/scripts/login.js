const restaurantLogin = () => {
  $.ajax({
    url: "/api/restaurant-login",
    type: "POST",
    data: {email, password},
    success: (result) => {
      window.location.href="/"
    },
    error: (error) => {
      console.error("An error occured, ", error);
    },
  });
};
