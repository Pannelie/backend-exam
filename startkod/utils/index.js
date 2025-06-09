export function generateProdId() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomPart = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomPart += chars[randomIndex];
  }

  return `prod-${randomPart}`;
}
