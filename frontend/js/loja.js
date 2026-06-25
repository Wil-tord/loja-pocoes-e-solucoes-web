import { getPotions } from "./api.js";

const productsList = document.querySelector("#products-list");
const productsStatus = document.querySelector("#products-status");

function formatPrice(price) {
  return `${price} moedas`;
}

function createPotionCard(potion) {
  const article = document.createElement("article");
  article.classList.add("product-card");

  const image = document.createElement("img");
  image.src = potion.image;
  image.alt = `Imagem de ${potion.name}`;
  image.classList.add("product-image");

  const content = document.createElement("div");
  content.classList.add("product-content");

  const title = document.createElement("h3");
  title.innerText = potion.name;

  const description = document.createElement("p");
  description.innerText = potion.description;

  const price = document.createElement("p");
  price.classList.add("product-price");
  price.innerText = formatPrice(potion.price);

  const button = document.createElement("button");
  button.classList.add("buy-button");
  button.type = "button";
  button.innerText = "Comprar";

  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(price);
  content.appendChild(button);

  article.appendChild(image);
  article.appendChild(content);

  return article;
}

function renderPotions(potions) {
  productsList.innerHTML = "";

  if (potions.length === 0) {
    productsStatus.innerText = "Nenhuma poção disponível no momento.";
    return;
  }

  productsStatus.innerText = "";

  for (const potion of potions) {
    const card = createPotionCard(potion);
    productsList.appendChild(card);
  }
}

async function loadPotions() {
  try {
    const potions = await getPotions();
    renderPotions(potions);
  } catch (error) {
    productsStatus.innerText =
      "Não foi possível carregar as poções. Verifique se o servidor está rodando.";
    console.error(error);
  }
}

loadPotions();