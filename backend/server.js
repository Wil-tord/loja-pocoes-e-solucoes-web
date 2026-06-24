import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import sequelize from "./database.js";
import Potion from "./models/Potion.js";
import potionsRouter from "./routes/potions.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, "..");
const frontendPath = path.join(projectRoot, "frontend");

app.use(cors());
app.use(express.json());
app.use(express.static(frontendPath));

app.use("/api/potions", potionsRouter);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Servidor funcionando.",
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

async function seedPotions() {
  await Potion.bulkCreate([
    {
      name: "Poção Blue Sky",
      description:
        "Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds.",
      image: "https://i.ibb.co/ZzS7xb2/rsz-sky.png",
      price: 300,
    },
    {
      name: "Poção do Perfume Misterioso",
      description:
        "Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.",
      image: "https://i.ibb.co/pyhZJXf/rsz-lilas.png",
      price: 200,
    },
    {
      name: "Poção de Pinus",
      description:
        "Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos.",
      image: "https://i.ibb.co/DkzdL1q/rsz-pinus.png",
      price: 3000,
    },
    {
      name: "Poção da Beleza Eterna",
      description: "Veneno que mata rápido.",
      image: "https://i.ibb.co/9p872NK/rsz-1beleza.png",
      price: 100,
    },
    {
      name: "Poção do Arco Íro",
      description: "Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias.",
      image: "https://i.ibb.co/PrC09MP/rsz-2unicornio.png",
      price: 120,
    },
    {
      name: "Caldeirão das Verdades Secretas",
      description:
        "As pessoas lhe dirão apenas verdades por 1 hora. É necessário beber os 5L.",
      image: "https://i.ibb.co/s9Lyvj8/rsz-verdades.png",
      price: 150,
    },
  ]);
}

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Banco SQLite em memória conectado.");

    await sequelize.sync({ force: true });
    await seedPotions();
    console.log("Poções iniciais cadastradas.");

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`API de poções: http://localhost:${PORT}/api/potions`);
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
  }
}

startServer();