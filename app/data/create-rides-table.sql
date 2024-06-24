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