-- Corresponds to getRidesCount()
SELECT COUNT(*) FROM rides;

-- Corresponds to getRidesByLatest(page, pageSize)
-- Replace :page and :pageSize with your actual values
SELECT * FROM rides ORDER BY id DESC LIMIT :pageSize OFFSET (:page - 1) * :pageSize;

-- Corresponds to getRandomRideSlug()
-- This is a bit tricky in SQL, as SQL is not designed to fetch random records in a performant way
SELECT slug FROM rides ORDER BY RAND() LIMIT 1;

-- Corresponds to getRideBySlug(slug)
-- Replace :slug with your actual value
SELECT * FROM rides WHERE slug = :slug;

-- Corresponds to getRidesBySearch(search, page, pageSize)
-- Replace :search, :page, and :pageSize with your actual values
-- This assumes that 'tags' is a text field and uses a simple LIKE clause for searching. This might not work well if 'tags' is an array or a set.
SELECT * FROM rides WHERE LOWER(tags) LIKE '%' || :search || '%' ORDER BY id DESC LIMIT :pageSize OFFSET (:page - 1) * :pageSize;

-- Corresponds to getRidesCountBySearch(search)
-- Replace :search with your actual value
SELECT COUNT(*) FROM rides WHERE LOWER(tags) LIKE '%' || :search || '%';


-- Add new user
INSERT INTO users (Username, Email, PasswordHash)
VALUES ('john_doe', 'john@example.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd4d5ed3b6ff6d6e6b5');

