CREATE TABLE cart (
                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                      user_id BIGINT NOT NULL UNIQUE,

                      CONSTRAINT fk_cart_user FOREIGN KEY (user_id)
                          REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE cart_item (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           cart_id BIGINT NOT NULL,
                           variation_id BIGINT NOT NULL,
                           quantity INT NOT NULL,
                           subtotal DECIMAL(10, 2) NOT NULL,

                           CONSTRAINT fk_cart_item_cart FOREIGN KEY (cart_id)
                               REFERENCES cart(id) ON DELETE CASCADE,
                           CONSTRAINT fk_cart_item_variation FOREIGN KEY (variation_id)
                               REFERENCES product_variation(id),
                           CONSTRAINT chk_cart_quantity_positive CHECK (quantity > 0)
);

CREATE INDEX idx_cart_item_cart ON cart_item(cart_id);