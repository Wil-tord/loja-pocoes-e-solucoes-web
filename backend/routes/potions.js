import express from "express";
import Potion from "../models/Potion.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const potions = await Potion.findAll({
      order: [["id", "ASC"]],
    });

    res.status(200).json(potions);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao listar poções.",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, image, price } = req.body;

    if (!name || !description || !image || price === undefined) {
      return res.status(400).json({
        message: "Campos obrigatórios: name, description, image e price.",
      });
    }

    const potion = await Potion.create({
      name,
      description,
      image,
      price,
    });

    res.status(201).json(potion);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao cadastrar poção.",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const potion = await Potion.findByPk(id);

    if (!potion) {
      return res.status(404).json({
        message: "Poção não encontrada.",
      });
    }

    await potion.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Erro ao remover poção.",
      error: error.message,
    });
  }
});

export default router;