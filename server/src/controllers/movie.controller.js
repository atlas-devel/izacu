import prisma from "../utils/prisma.js";

export async function getMovies(req, res) {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        translator: true,
        movieGenres: {
          include: { genre: true },
        },
      },
      where: { publish_status: "published" },
    });

    if (!movies.length) {
      return res.status(404).json({ message: "No movies found" });
    }

    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching movies", error });
  }
}

export async function getMovieBySlug(req, res) {
  const { slug } = req.params;

  try {
    const movie = await prisma.movie.findUnique({
      where: { slug, publish_status: "published" },
      include: {
        translator: true,
        movieGenres: { include: { genre: true } },
      },
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching movie", error });
  }
}

export async function getMoviesByTranslator(req, res) {
  const { translatorId } = req.params;

  try {
    const movies = await prisma.movie.findMany({
      where: {
        translatorId: Number(translatorId),
        publish_status: "published",
      },
      include: {
        translator: true,
        movieGenres: { include: { genre: true } },
      },
    });

    if (!movies.length) {
      return res
        .status(404)
        .json({ message: "No movies found for this translator" });
    }

    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching movies", error });
  }
}

export async function getMoviesByGenre(req, res) {
  const { genreId } = req.params;

  try {
    const movies = await prisma.movie.findMany({
      where: {
        movieGenres: {
          some: { genre_id: Number(genreId) },
          publish_status: "published",
        },
      },
      include: {
        translator: true,
        movieGenres: { include: { genre: true } },
      },
    });

    if (!movies.length) {
      return res
        .status(404)
        .json({ message: "No movies found for this genre" });
    }

    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching movies", error });
  }
}

export async function createMovie(req, res) {
  const userId = 3;

  const {
    title,
    description,
    releaseYear,
    country,
    resolution,
    movieUrl,
    publish_status,
    translatorId,
    type,
  } = req.body;
  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
  try {
    const existingMovie = await prisma.movie.findUnique({
      where: { slug },
    });
    if (existingMovie) {
      return res
        .status(400)
        .json({ message: "Movie with this title already exists" });
    }

    const posterPotrait = req.files?.posterPotrait?.[0]?.path || null;
    const posterLandscape = req.files?.posterLandscape?.[0]?.path || null;

    const newMovie = await prisma.movie.create({
      data: {
        title,
        description,
        releaseYear: parseInt(releaseYear),
        country,
        resolution,
        movieUrl,
        publish_status,
        type,
        slug,
        admin: { connect: { id: userId } },
        posterPotrait,
        posterLandscape,
        translator: { connect: { id: parseInt(translatorId) } },
      },
      include: { movieGenres: { include: { genre: true } }, translator: true },
    });
    return res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating movie", error });
  }
}

export async function updateMovie(req, res) {
  const { id } = req.params;
  const {
    title,
    description,
    releaseYear,
    country,
    resolution,
    movieUrl,
    publish_status,
    translatorId,
    type,
  } = req.body;
  try {
    const existingMovie = await prisma.movie.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const posterPotrait =
      req.files?.posterPotrait?.[0]?.path || existingMovie.posterPotrait;
    const posterLandscape =
      req.files?.posterLandscape?.[0]?.path || existingMovie.posterLandscape;

    const existingSlug = await prisma.movie.findUnique({
      where: { slug },
    });
    if (existingSlug) {
      return res
        .status(400)
        .json({ message: "Movie with this title already exists" });
    }
    const updatedMovie = await prisma.movie.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        releaseYear: parseInt(releaseYear),
        country,
        resolution,
        movieUrl,
        publish_status,
        type,
        slug,
        posterPotrait,
        posterLandscape,
        translator: { connect: { id: parseInt(translatorId) } },
      },
      include: { movieGenres: { include: { genre: true } }, translator: true },
    });
    return res.status(200).json({ message: "Movie updated", updatedMovie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating movie", error });
  }
}

export async function deleteMovie(req, res) {
  const { id } = req.params;
  try {
    const existingMovie = await prisma.movie.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await prisma.movie.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting movie", error });
  }
}

export async function changeMoviePublishStatus(req, res) {
  const { id } = req.params;
  const { publish_status } = req.body;
  try {
    const existingMovie = await prisma.movie.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const updatedMovie = await prisma.movie.update({
      where: { id: parseInt(id) },
      data: { publish_status },
      include: { movieGenres: { include: { genre: true } }, translator: true },
    });
    return res
      .status(200)
      .json({ message: "Publish status updated", updatedMovie });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating publish status", error });
  }
}

// added get movie by id controller by Leon

// export const getMovieById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const movie = await prisma.movie.findUnique({
//       where: { id: Number(id) },
//     });
//     if (!movie) {
//       return res.status(404).json({ message: "Movie not found" });
//     }
//     return res.status(200).json(movie);
//   } catch (error) {
//     console.error("Error: " + error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Error fetching movie", error });
//   }
// };
