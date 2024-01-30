CREATE DATABASE needleNotes

CREATE TABLE ClothTypeMeasurements (
    cloth_type VARCHAR(255) PRIMARY KEY,
    body_measurement VARCHAR(255)
);


-- Creating the Reminder Table
CREATE TABLE Reminder (
    reminder_id SERIAL PRIMARY KEY,
    reminder_frequency VARCHAR(50),
    next_reminder_date DATE
    Record_id INT,
    FOREIGN KEY ( Record_id) REFERENCES MeasurementBook(Record_id) 
);


-- Creating the MeasurementBook Table
CREATE TABLE MeasurementBook (
    Record_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255),
    gender VARCHAR(10),
    phonenumber VARCHAR(15),
    cloth_type VARCHAR(255),
    body_measurement VARCHAR(255),
    notes TEXT,
    date_placed DATE,
    pickup_date DATE,
    rid INT,
    FOREIGN KEY (rid) REFERENCES Reminder( reminder_id ),
    FOREIGN KEY (cloth_type) REFERENCES ClothTypeMeasurements(cloth_type)
);


--to populate the first table
INSERT INTO ClothTypeMeasurements (cloth_type, body_measurement)
VALUES
  ('shirt', 'Chest circumference, Waist circumference, Hip circumference, Sleeve length, Shirt length, Collar size, Shoulder width'),
  ('trousers', 'Waist circumference, Hip circumference, Inseam length, Outseam length, Thigh circumference, Leg opening'),
  ('gown', 'Bust circumference, Waist circumference, Hip circumference, Dress length, Sleeve length, Shoulder width'),
  ('skirt', 'Waist circumference, Hip circumference, Skirt length, Hem circumference'),
  ('blouse', 'Bust circumference, Waist circumference, Hip circumference, Sleeve length, Blouse length, Shoulder width'),
  ('jacket', 'Chest circumference, Waist circumference, Hip circumference, Sleeve length, Jacket length, Shoulder width'),
  ('shorts', 'Waist circumference, Hip circumference, Inseam length, Outseam length, Leg opening');
