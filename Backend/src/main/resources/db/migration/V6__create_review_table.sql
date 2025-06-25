CREATE TABLE review (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        user_id BIGINT NOT NULL,
                        product_id BIGINT NOT NULL,
                        rating INT NOT NULL,
                        comment TEXT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                        CONSTRAINT fk_review_user FOREIGN KEY (user_id)
                            REFERENCES user(id),
                        CONSTRAINT fk_review_product FOREIGN KEY (product_id)
                            REFERENCES product(id) ON DELETE CASCADE,
                        CONSTRAINT chk_rating_range CHECK (rating BETWEEN 1 AND 5)
);

CREATE INDEX idx_review_product ON review(product_id);
CREATE INDEX idx_review_user ON review(user_id);