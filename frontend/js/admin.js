import { getPotions, createPotion, deletePotion } from "./api.js";

const form = document.querySelector("#potion-form");
const adminStatus = document.querySelector("#admin-status");
const adminPotionsList = document.querySelector("#admin-potions-list");

function setStatus(message, type = "success") {
  adminStatus.innerText = message;
  adminStatus.className = `status-message ${type}`;
}

function formatPrice(price) {
  return `${price} moedas`;
}

function createAdminPotionCard(potion) {
  const article = document.createElement("article");
  article.classList.add("admin-potion-card");

  const image = document.createElement("img");
  image.src = potion.image;
  image.alt = `Imagem de ${potion.name}`;

  const content = document.createElement("div");
  content.classList.add("admin-potion-content");

  const title = document.createElement("h3");
  title.innerText = potion.name;

  const description = document.createElement("p");
  description.innerText = potion.description;

  const price = document.createElement("strong");
  price.innerText = formatPrice(potion.price);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.type = "button";
  deleteButton.innerText = "Remover";

  deleteButton.addEventListener("click", async () => {
    await handleDeletePotion(potion.id);
  });

  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(price);
  content.appendChild(deleteButton);

  article.appendChild(image);
  article.appendChild(content);

  return article;
}

async function loadAdminPotions() {
  try {
    const potions = await getPotions();

    adminPotionsList.innerHTML = "";

    if (potions.length === 0) {
      adminPotionsList.innerHTML =
        '<p class="status-message">Nenhuma poção cadastrada.</p>';
      return;
    }

    for (const potion of potions) {
      const card = createAdminPotionCard(potion);
      adminPotionsList.appendChild(card);
    }
  } catch (error) {
    setStatus("Erro ao carregar poções. Verifique se o servidor está rodando.", "error");
    console.error(error);
  }
}

async function handleCreatePotion(event) {
  event.preventDefault();

  const formData = new FormData(form);

  const potion = {
    name: formData.get("name").trim(),
    description: formData.get("description").trim(),
    image: formData.get("image").trim(),
    price: Number(formData.get("price")),
  };

  if (!potion.name || !potion.description || !potion.image || potion.price < 0) {
    setStatus("Preencha todos os campos corretamente.", "error");
    return;
  }

  try {
    await createPotion(potion);

    form.reset();
    setStatus("Poção cadastrada com sucesso!", "success");

    await loadAdminPotions();
  } catch (error) {
    setStatus("Erro ao cadastrar poção.", "error");
    console.error(error);
  }
}

async function handleDeletePotion(id) {
  const confirmDelete = confirm("Tem certeza que deseja remover esta poção?");

  if (!confirmDelete) {
    return;
  }

  try {
    await deletePotion(id);

    setStatus("Poção removida com sucesso!", "success");

    await loadAdminPotions();
  } catch (error) {
    setStatus("Erro ao remover poção.", "error");
    console.error(error);
  }
}

form.addEventListener("submit", handleCreatePotion);

loadAdminPotions();