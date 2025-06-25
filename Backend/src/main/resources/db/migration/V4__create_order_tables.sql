CREATE TABLE orders (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        user_id BIGINT NOT NULL,
                        total_price DECIMAL(10, 2) NOT NULL,
                        status VARCHAR(20) NOT NULL,
                        payment_method VARCHAR(20) NOT NULL,
                        tracking_code VARCHAR(50) UNIQUE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                        CONSTRAINT fk_order_user FOREIGN KEY (user_id)
                            REFERENCES user(id),
                        CONSTRAINT chk_order_status CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELED')),
                        CONSTRAINT chk_total_price_positive CHECK (total_price >= 0)
);

CREATE TABLE order_item (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            order_id BIGINT NOT NULL,
                            variation_id BIGINT NOT NULL,
                            quantity INT NOT NULL,
                            subtotal DECIMAL(10, 2) NOT NULL,

                            CONSTRAINT fk_order_item_order FOREIGN KEY (order_id)
                                REFERENCES orders(id) ON DELETE CASCADE,
                            CONSTRAINT fk_order_item_variation FOREIGN KEY (variation_id)
                                REFERENCES product_variation(id),
                            CONSTRAINT chk_order_item_quantity CHECK (quantity > 0)
);

CREATE INDEX idx_order_user ON orders(user_id);
CREATE INDEX idx_order_status ON orders(status);
CREATE INDEX idx_order_created ON orders(created_at);
CREATE INDEX idx_order_item_order ON order_item(order_id);