function getPagination(query) {
  const page = Math.abs(query.page) || process.env.DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || process.env.DEFAULT_LIMIT_NUMBER;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
