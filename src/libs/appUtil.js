export const recentExhangeRate = (currencies) => {
  return currencies.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 6);
}
