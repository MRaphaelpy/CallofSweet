CREATE TABLE promotion (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           discount_percentage DECIMAL(5, 2) NOT NULL,
                           start_date TIMESTAMP,
                           end_date TIMESTAMP,
                           is_active BOOLEAN DEFAULT FALSE,

                           CONSTRAINT chk_discount_range CHECK (discount_percentage BETWEEN 0 AND 100),
                           CONSTRAINT chk_date_range CHECK (end_date IS NULL OR start_date <= end_date)
);

CREATE TABLE promotion_product (
                                   promotion_id BIGINT NOT NULL,
                                   product_id BIGINT NOT NULL,

                                   PRIMARY KEY (promotion_id, product_id),
                                   CONSTRAINT fk_promo_product_promotion FOREIGN KEY (promotion_id)
                                       REFERENCES promotion(id) ON DELETE CASCADE,
                                   CONSTRAINT fk_promo_product_product FOREIGN KEY (product_id)
                                       REFERENCES product(id) ON DELETE CASCADE
);

CREATE INDEX idx_promotion_active ON promotion(is_active);
CREATE INDEX idx_promotion_dates ON promotion(start_date, end_date);