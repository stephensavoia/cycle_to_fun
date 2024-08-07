CREATE TABLE IF NOT EXISTS rides (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    mapUrl VARCHAR(255),
    tags TEXT,
    duration VARCHAR(50),
    distance VARCHAR(50),
    difficulty VARCHAR(50),
    routeType VARCHAR(50),
    imageUrl VARCHAR(255),
    altText VARCHAR(255),
    slug VARCHAR(255)
);

INSERT INTO rides (id, title, description, mapUrl, tags, duration, distance, difficulty, routeType, imageUrl, altText, slug) VALUES
(8, 'St. Lawrence Market to Woodbine Beach Park', 'Ride from St. Lawrence Market, along Commissioner St. and the Lakeshore, to Woodbine Beach Park for a delightful picnic. Make sure to ride on the trail on north side of Lakeshore until Leslie St., rather than next to traffic.', 'https://maps.app.goo.gl/RFjCtKpwVh18tk9V6', 'St Lawrence Market, Woodbine Beach, Lakeshore, Commissioners, food, picnic, Bike Share, Toronto, Beaches, East End', '25min', '7km', 'Easy', 'Cycle Tracks', '/img/st-lawrence-market.jpg', 'St. Lawrence Market', 'st-lawrence-market-to-woodbine-beach'),
(7, 'Casa Loma to Distillery District', 'Enjoy an easy, downhill ride from Casa Loma, through the University of Toronto, along College and Sherbourne Streets, and ending at the Distillery District for a refreshing beer.', 'https://maps.app.goo.gl/Uo9DvztkUBjh7iBG6', 'Casa Loma, Distillery, U of T, Corktown, Bike Share, Toronto', '30min', '7km', 'Easy', 'Bike Lanes', '/img/distillery-district.jpg', 'Distillery District', 'casa-loma-to-distillery-district'),
(6, 'Messini to Woodbine Beach Park', 'Grab a gyro from Messini Authentic Gyros and head down to Woodbine Beach Park. Despite what Google Maps suggests, you can ride directly from Knox Ave to the Lakeshore bike trail via a short connecting path, avoiding any backtracking.', 'https://maps.app.goo.gl/K4kGwUr4arJV5nqV6', 'Mesini Authentic Gyros, Woodbine Beach, Lakeshore, food, picnic, Bike Share, Toronto, Beaches, East End', '25min', '7km', 'Easy', 'Bike Lanes', '/img/woodbine-beach-park.jpg', 'Woodbine Beach', 'messini-to-woodbine-beach'),
(5, 'James Gardens to Tom''s Dairy Freeze', 'Start your bike ride at the beautiful James Gardens, and enjoy the scenic route as you make your way to Tom''s Dairy Freeze for some delicious soft-serve ice cream. This hilly journey will give you a great workout, allowing you to enjoy your treat guilt-free.', 'https://maps.app.goo.gl/M8uL7WSxN9vdxk7GA', 'James Gardens, Tom''s Dairy Freeze, food, ice cream, Toronto, West End, Etobicoke', '30min', '9km', 'Moderate', 'Trails', '/img/toms-dairy-freeze.jpg', 'Tom''s Dairy Freeze ice cream stand', 'james-gardens-to-toms-dairy-freeze'),
(4, 'Lalibela Cuisine to PlanB', 'Ride from Lalibela Cuisine on Danforth to PlanB in Etobicoke. Make sure to stop at some of the shops and attractions on Bloor Street West so tht you can work up an appetite between these two delicious African restauruants.', 'https://maps.app.goo.gl/G9uAVqyJE78fYveVA', 'Lalibela Cuisine, PlanB, Bloor, Danforth, food, Bike Share, Toronto, East End, Etobicoke', '1h', '15km', 'Moderate', 'Cycle Tracks', '/img/planb.jpg', 'PlanB restaurant front entrance', 'lalibela-cuisine-to-planb'),
(3, 'Sorauren Market to Trinity Bellwoods', 'Shop for local food products at the Sorauren Market before heading to another great Toronto park: Trinity Bellwoods. Pick up some craft beer at the Bellwoods Brewery bottle shop and enjoy it in the park as part of the city''s Alcohol in Parks Program. (Market hours: Monday, 3-7pm)', 'https://maps.app.goo.gl/zGhmd1UNbVVVFvTL9', 'Sorauren Market, Trinity Bellwoods, food, picnic, Bike Share, Toronto, West End', '15min', '4km', 'Easy', 'Side Streets', '/img/sorauren-market.jpg', 'Sorauren Market vendors', 'sorauren-market-to-trinity-bellwoods'),
(2, 'Dufferin Mall to Eaton Centre', 'Ride from Dufferin Grove Park, along Harbord, and through the University of Toronto campus to the Eaton Centre. Enter the Eaton Centre from the Trinity Square entrance to avoid the crowds and appreciate the beauty of the square.', 'https://maps.app.goo.gl/xw4YAEXfpBEQPyDM6', 'Dufferin Mall, Eaton Centre, Harbord, U of T, shopping, Bike Share, Toronto', '20 minutes', '6 km', 'Easy', 'Bike Lanes', '/img/eaton-centre.jpg', 'Toronto Eaton Centre Trinity Square entrance', 'dufferin-mall-to-eaton-centre'),
(1, 'High Park to Cheese Boutique', 'Ride through High Park, along the lake, and up to Cheese Boutique for some fresh, gourmet foods. Before heading back to High Park, stop for a picnic by the lake with all of your delicious finds.', 'https://maps.app.goo.gl/evjGPi3CVH9zMWPm8', 'High Park, Cheese Boutique, Lake Ontario, food, picnic, Bike Share, Toronto, West End', '20min', '5km', 'Easy', 'Trails', '/img/cheese-boutique.jpg', 'Cheese Boutique storefront', 'high-park-to-cheese-boutique')
ON CONFLICT (id) DO UPDATE SET
title = EXCLUDED.title,
description = EXCLUDED.description,
mapUrl = EXCLUDED.mapUrl,
tags = EXCLUDED.tags,
duration = EXCLUDED.duration,
distance = EXCLUDED.distance,
difficulty = EXCLUDED.difficulty,
routeType = EXCLUDED.routeType,
imageUrl = EXCLUDED.imageUrl,
altText = EXCLUDED.altText,
slug = EXCLUDED.slug;

CREATE TABLE IF NOT EXISTS users (
    UserID INT PRIMARY KEY AUTOINCREMENT,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Salt CHAR(32) NOT NULL,
    PasswordHash CHAR(64) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (Username, Email, Salt, PasswordHash)
VALUES ('john_doe', 'john@example.com', 'ba5809ff1699587d1732223c20e', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd4d5ed3b6ff6d6e6b5'),
('Stephen', 'ssavoia@gmail.com', 'ba5809ff1699587d1732223c20e', '5d1e5433d2077d07cac594e1c0ae132e91e4429acb8210c5853d0ee23fea6f243d5ba8432a8da54e3148dea06d69e8a8b8980529c7')
ON CONFLICT (Email) DO UPDATE SET
Username = EXCLUDED.Username;


CREATE TABLE IF NOT EXISTS user_likes (
    UserID INT,
    RideID INT,
    PRIMARY KEY (UserID, RideID),
    FOREIGN KEY (UserID) REFERENCES users(UserID),
    FOREIGN KEY (RideID) REFERENCES rides(id)
);

INSERT INTO user_likes (UserID, RideID)
VALUES 
(1, 2),
(1, 3),
(9, 5),
(7,1),
(7,4),
(9,6)
ON CONFLICT (UserID, RideID) DO NOTHING;