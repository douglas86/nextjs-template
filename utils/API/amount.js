export const amount = (searchParams) =>
  parseInt(searchParams.get("amount"), 10)
    ? parseInt(searchParams.get("amount"), 10)
    : 10;
