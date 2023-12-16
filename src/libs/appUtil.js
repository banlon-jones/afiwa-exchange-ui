export const recentEntities = (entities) => {
  return entities.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 6);
}

export const convertCurrency = (toRate, fromRate, amount) => (fromRate / toRate) * amount;

