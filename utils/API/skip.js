export const skip = (searchParams) =>
  parseInt(searchParams.get("skip"), 10)
    ? parseInt(searchParams.get("skip"), 10)
    : 0;
