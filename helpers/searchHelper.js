const searchHelper = (query) => {
  const objectSearch = {
    keyword: "",
    regex: "",
  };
  if (query.keyword) {
    objectSearch.keyword = query.keyword;
    const regex = new ReExp(objectSearch.keyword, "i");
    objectSearch.regex = regex;
  }

  return objectSearch;
};

module.exports = searchHelper;
