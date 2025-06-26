INSERT INTO product (id, name, description, image_url, price)
VALUES (1, 'Bolo de Chocolate', 'Delicioso bolo de chocolate', 'https://picsum.photos/seed/1/500/500', 25.00)
    ON DUPLICATE KEY UPDATE name = name;

INSERT INTO product (id, name, description, image_url, price)
VALUES (2, 'Torta de Morango', 'Torta de morango com creme', 'https://picsum.photos/seed/2/500/500', 30.00)
    ON DUPLICATE KEY UPDATE name = name;


INSERT INTO product_variation (id, product_id, color, size, price, stock)
VALUES (1, 1, NULL, 'Pequeno', 25.00, 10)
    ON DUPLICATE KEY UPDATE price = price;

INSERT INTO product_variation (id, product_id, color, size, price, stock)
VALUES (2, 2, NULL, 'Médio', 30.00, 15)
    ON DUPLICATE KEY UPDATE price = price;