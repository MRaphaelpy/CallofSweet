CREATE TABLE product (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         description TEXT,
                         price DECIMAL(10, 2) NOT NULL,
                         category VARCHAR(100),
                         brand VARCHAR(100),
                         image_url VARCHAR(255),
                         rating FLOAT,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_variation (
                                   id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                   product_id BIGINT NOT NULL,
                                   color VARCHAR(50),
                                   size VARCHAR(20),
                                   stock INT NOT NULL DEFAULT 0,

                                   CONSTRAINT fk_variation_product FOREIGN KEY (product_id)
                                       REFERENCES product(id) ON DELETE CASCADE,
                                   CONSTRAINT chk_stock_positive CHECK (stock >= 0)
);

CREATE INDEX idx_product_name ON product(name);
CREATE INDEX idx_product_category ON product(category);
CREATE INDEX idx_variation_product ON product_variation(product_id);