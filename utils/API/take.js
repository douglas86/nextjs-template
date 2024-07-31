export const take = (searchParams) =>
  parseInt(searchParams.get("take"), 10)
    ? parseInt(searchParams.get("take"), 10)
    : 10;
