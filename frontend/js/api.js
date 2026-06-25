const API_URL = "/api/potions";

export async function getPotions() {
  const response = await fetch(API_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar poções.");
  }

  return response.json();
}

export async function createPotion(potion) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(potion),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar poção.");
  }

  return response.json();
}

export async function deletePotion(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao remover poção.");
  }
}

