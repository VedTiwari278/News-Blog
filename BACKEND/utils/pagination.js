export const getPaginatedValue = (page, limit) => {
  const currentPage = Math.max(parseInt(page || "1", 10), 1);
  const pageLimit = Math.max(parseInt(limit || "10", 10), 1);

  const skip = (currentPage - 1) * pageLimit;

  return { currentPage, pageLimit, skip };
};
