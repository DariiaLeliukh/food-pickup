INSERT INTO clients (name, email, phone_number)
VALUES
  ('Marina Ivanova', 'marina.ivanova.ca@gmail.com', '587-586-3337');

INSERT INTO clients (name, email, phone_number)
VALUES
  ('Dariia L', 'dariial@gmail.com', '123-456-4545');

INSERT INTO restaurants (name, phone_number, email, address, image, operating_hours_start, operating_hours_end, password, rating)
VALUES
  ('Pizza Paradise', '123-456-789', 'info@pizzaparadise.com', '123 Main St, Vancouver', 'restaurant_image_url', '0900', '2200', 'restaurant_password', 5),
  ('Pasta Palace', '123-456-798', 'info@pastapalace.com', '1 St, Victoria', 'restaurant_image_url', '1000', '2100', 'restaurant_password', 4);

INSERT INTO menu_items (name, price, description, image)
VALUES
('PASTA', 15, 'Spaghetti bolognese - traditional italian pasta', 'https://media.istockphoto.com/id/544990588/photo/spaghetti-bolognese-on-dark-background.jpg?s=2048x2048&w=is&k=20&c=SBXtgdzzfO9uSuFoYskHG6fvNxBkwKDXw-XxU0g7Np0=');

INSERT INTO menu_items (name, price, description, image)
VALUES
('PIZZA', 20, 'Hawaiian Chicken PizzaSmoked', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1981&q=80');

INSERT INTO menu_items (name, price, description, image)
VALUES
('LASAGNA', 18, 'Protein rich Lasagna Vegan Italian food plant-based recipe Mediterranean diet with ingredients such as Lasagna pasta, onion, mushrooms, zucchini, bell pepper, spinach, vegan marinara sauce, tomatoes, firm tofu, chickpeas, vegan cheese', 'https://media.istockphoto.com/id/1365127906/photo/protein-rich-lasagna-vegan-italian-food-plant-based-recipe-medit.jpg?s=2048x2048&w=is&k=20&c=RaSMjPx9vS_6i0_mpOC0CdD9LMmkW_NlCWOeqFWYSvg=');

INSERT INTO statuses (status)
VALUES
  ('Pending'),
  ('In Progress'),
  ('Completed');

INSERT INTO orders (restaurant_id, client_id, status_id, total)
VALUES
  (1, 1, 1, 35.55),
  (2, 2, 2, 54.99);

INSERT INTO order_items (order_id, menu_items_id, quantity)
VALUES
  (1, 1, 3),
  (1, 2, 2),
  (2, 3, 4);