CREATE TABLE user (
                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                      name VARCHAR(100) NOT NULL,
                      email VARCHAR(100) NOT NULL UNIQUE,
                      password VARCHAR(255) NOT NULL,
                      street VARCHAR(255), -- Campo do Address
                      city VARCHAR(100),   -- Campo do Address
                      state VARCHAR(100),  -- Campo do Address
                      zip_code VARCHAR(20),-- Campo do Address
                      country VARCHAR(100),-- Campo do Address
                      phone VARCHAR(20),
                      birthday DATE,
                      role VARCHAR(20) NOT NULL,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                      CONSTRAINT chk_user_role CHECK (role IN ('ADMIN', 'CUSTOMER', 'SELLER'))
);

CREATE INDEX idx_user_email ON user(email);