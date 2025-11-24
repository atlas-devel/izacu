import prisma from "../utils/prisma.js";

export async function getGenres(req, res) {
  try {
    const genres = await prisma.genres.findMany();
    if (genres.length === 0) {
      return res.status(404).json({ error: "No genres found" });
    }
    return res.status(200).json(genres);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to retrieve genres" });
  }
}

export async function createGenre(req, res) {
  const { name } = req.body;
  try {
    const exstingGenre = await prisma.genres.findUnique({
      where: { name },
    });
    if (exstingGenre) {
      return res.status(400).json({ error: "Genre already exists" });
    }
    const newGenre = await prisma.genres.create({
      data: { name },
    });
    return res.status(201).json({ message: "Genre created", genre: newGenre });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to retrieve genres" });
  }
}

export async function updateGenre(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const genre = await prisma.genres.findUnique({
      where: { id: parseInt(id) },
    });
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    const updatedGenre = await prisma.genres.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    return res
      .status(200)
      .json({ message: "Genre updated", genre: updatedGenre });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to update genre" });
  }
}

export async function deleteGenre(req, res) {
  const { id } = req.params;
  try {
    const genre = await prisma.genres.findUnique({
      where: { id: parseInt(id) },
    });
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    await prisma.genres.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Genre deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to delete genre" });
  }
}
