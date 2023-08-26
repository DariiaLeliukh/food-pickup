INSERT INTO clients (name, email, phone_number)
VALUES
  ('Marina Ivanova', 'marina.ivanova.ca@gmail.com', '+12045838224');

INSERT INTO clients (name, email, phone_number)
VALUES
  ('Dariia L', 'dariial@gmail.com', '+12045838224');

INSERT INTO restaurants (name, phone_number, email, address, image, operating_hours_start, operating_hours_end, password, rating)
VALUES
  ('Pizza Paradise', '+12045838224', 'info@pizzaparadise.com', '123 Main St, Vancouver', 'https://www.hotelmousai.com/blog/wp-content/uploads/2021/12/Top-10-Traditional-Foods-in-Italy.jpg', '0900', '2200', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', 4.9),
  ('Pasta Palace', '+12045838224', 'info@pastapalace.com', '1 St, Victoria', 'https://haidasandwich.ca/wp-content/uploads/2019/12/Italian-Food.jpg', '1000', '2100', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', 4);

INSERT INTO menu_items (restaurant_id, name, price, description, image)
VALUES
(1, 'Pasta', 1500, 'Spaghetti bolognese - traditional italian pasta', 'https://www.foodrepublic.com/img/gallery/100-italian-fooddrink-words-and-phrases/intro-1684783348.jpg');

INSERT INTO menu_items (restaurant_id, name, price, description, image)
VALUES
(1, 'Pizza', 2000, 'Hawaiian Chicken PizzaSmoked', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1981&q=80');

INSERT INTO menu_items (restaurant_id, name, price, description, image)
VALUES
(2, 'Lasagna', 1800, 'Protein rich Lasagna Vegan Italian food plant-based recipe Mediterranean diet with ingredients such as Lasagna pasta, onion, mushrooms, zucchini, bell pepper, spinach, vegan marinara sauce, tomatoes, firm tofu, chickpeas, vegan cheese', 'https://insanelygoodrecipes.com/wp-content/uploads/2020/03/Lasagna-1024x536.png');

INSERT INTO statuses (status)
VALUES
  ('Pending'),
  ('In Progress'),
  ('Completed');

INSERT INTO orders (restaurant_id, client_id, status_id, total)
VALUES
  (1, 1, 1, 35.55),
  (1, 1, 2, 25.55),
  (2, 2, 2, 54.99),
  (2, 2, 1, 14.99),
  (1, 2, 3, 14.99),
  (1, 1, 3, 24.99),
  (2, 2, 3, 34.99),
  (2, 1, 3, 36.99);

INSERT INTO order_items (order_id, menu_items_id, quantity)
VALUES
  (1, 1, 3),
  (1, 2, 2),
  (2, 3, 4),
  (3, 2, 1),
  (3, 2, 2),
  (4, 1, 2),
  (4, 1, 3),
  (5, 3, 3),
  (6, 2, 2),
  (7, 2, 2),
  (8, 2, 2);
