CREATE TABLE Category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    category_description TEXT
);

CREATE TABLE Item (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    item_name VARCHAR(100) NOT NULL,
    item_description TEXT,
    item_price DECIMAL(10, 2),
    item_stock_quantity INT DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

CREATE TABLE Drink (
    drink_id INT PRIMARY KEY AUTO_INCREMENT,
    drink_name VARCHAR(100) NOT NULL,
    drink_description TEXT,
    drink_price DECIMAL(10, 2)
);

CREATE TABLE ItemDrink (
    item_id INT,
    drink_id INT,
    PRIMARY KEY (item_id, drink_id),
    FOREIGN KEY (item_id) REFERENCES Item(item_id),
    FOREIGN KEY (drink_id) REFERENCES Drink(drink_id)
);
