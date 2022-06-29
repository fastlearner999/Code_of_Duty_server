INSERT INTO users (email, password, first_name, last_name, gender) 
VALUES
('wing@gmail.com', '99d8c939300ceb17112aad875914c40f', 'Wing', 'Yuen', 'M'),
('aaron@gmail.com', '88e6b40bbb49de64dffa614724996c34', 'Aaron', 'Smith', 'M'),
('nathan@gmail.com', 'b4ddd22be1f232eabf85bebb84b07837', 'Nathan', 'Olds', 'M'),
('abigail@gmail.com', '86b531df70c2e6aa69c655b1bda6c9f9', 'Abigail', 'Shadare', 'F');

INSERT INTO contents(title, html_content)
VALUES
('Terms & Conditions', 'Terms and Conditions</h1><br><br>Terms....'),
('Help', '<h1>Help</h1><br><br>How to use this app....');


INSERT INTO goals (user_id, goal_name, sport_type, period, period_type, start_date, end_date, target_distance, target_distance_unit)
VALUES
(1, 'Running goal', 'running', 1, 'month', now(), now() + interval '1 month', 50, 'km'),
(2, 'Swimming goal', 'swimming', 1, 'month', now(), now() + interval '1 month', 20, 'km'),
(3, 'Cycling goal', 'cycling', 1, 'month', now(), now() + interval '1 month', 400, 'km'),
(4, 'Walking goal', 'walking', 1, 'month', now(), now() + interval '1 month', 50, 'km');