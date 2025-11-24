import prisma from "../utils/prisma.js";

export async function getTranslators(req, res) {
  try {
    const translators = await prisma.translators.findMany();
    if (translators.length === 0) {
      return res.status(404).json({ error: "No translators found" });
    }
    return res.status(200).json(translators);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to retrieve translators" });
  }
}

export async function createTranslator(req, res) {
  const { name } = req.body;
  try {
    const existingTranslator = await prisma.translators.findUnique({
      where: { name },
    });
    if (existingTranslator) {
      return res.status(400).json({ error: "Translator already exists" });
    }
    const newTranslator = await prisma.translators.create({
      data: { name },
    });
    return res
      .status(201)
      .json({ message: "Translator created", translator: newTranslator });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to retrieve translators" });
  }
}

export async function updateTranslator(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const translator = await prisma.translators.findUnique({
      where: { id: parseInt(id) },
    });
    if (!translator) {
      return res.status(404).json({ error: "Translator not found" });
    }
    const updatedTranslator = await prisma.translators.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    return res
      .status(200)
      .json({ message: "Translator updated", translator: updatedTranslator });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to update translator" });
  }
}

export async function deleteTranslator(req, res) {
  const { id } = req.params;
  try {
    const translator = await prisma.translators.findUnique({
      where: { id: parseInt(id) },
    });
    if (!translator) {
      return res.status(404).json({ error: "Translator not found" });
    }
    await prisma.translators.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Translator deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to delete translator" });
  }
}
