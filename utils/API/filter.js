export const filter = (searchParams, defaulted = null) =>
  searchParams.get("filter")
    ? searchParams.get("filter").toLowerCase()
    : defaulted;
