CREATE TABLE payment (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         order_id BIGINT NOT NULL UNIQUE,
                         payment_method VARCHAR(50) NOT NULL,
                         transaction_id VARCHAR(100) UNIQUE,
                         amount DECIMAL(10, 2) NOT NULL,
                         status VARCHAR(20) NOT NULL,

                         CONSTRAINT fk_payment_order FOREIGN KEY (order_id)
                             REFERENCES orders(id) ON DELETE CASCADE,
                         CONSTRAINT chk_payment_status CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'CANCELED')),
                         CONSTRAINT chk_amount_positive CHECK (amount >= 0)
);

CREATE INDEX idx_payment_status ON payment(status);
CREATE INDEX idx_payment_transaction ON payment(transaction_id);