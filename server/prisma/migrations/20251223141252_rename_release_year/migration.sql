-- Rename the column
ALTER TABLE "Movie"
RENAME COLUMN "releaseYear" TO "releaseDate";

-- Convert INT year → TIMESTAMP (YYYY-01-01)
ALTER TABLE "Movie"
ALTER COLUMN "releaseDate"
TYPE TIMESTAMP(3)
USING make_date("releaseDate", 1, 1);
