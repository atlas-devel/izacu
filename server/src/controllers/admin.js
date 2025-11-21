import prisma from "../utils/prisma.js";

export const createMovie = async (req, res) => {
  const {
    title,
    description,
    releaseYear,
    country,
    resolution,
    movieUrl,
    posterUrl,
    landscapeUrl,
  } = req.body;
  const { adminId } = req.params;

  if (
    !title ||
    !description ||
    !releaseYear ||
    !resolution ||
    !country ||
    !movieUrl ||
    !posterUrl ||
    !landscapeUrl
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!adminId) {
    return res
      .status(400)
      .json({ success: false, message: "Admin ID is required." });
  }

  const postFiles = req.files;

  // ------testing post files output format------
  console.log(postFiles);

  try {
    const movieData = {
      title: title,
      description: description,
      releaseYear: parseInt(releaseYear),
      country: country,
      resolution: resolution,
      movieUrl: movieUrl,
      posterPotrait: postFiles.posterPotrait[0].path || "test",
      posterLandscape: postFiles.posterLandscape[0].path || "test",
      admin_id: parseInt(adminId),
    };
    const newMovie = await prisma.movie.create({
      success: true,
      data: movieData,
    });
  } catch (error) {
    console.error("Error creating movie:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the movie.",
      error: error.message,
    });
  }
};
