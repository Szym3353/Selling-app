let elementsPerPage = 24;
module.exports = {
  sliceOfferts: function (offerts, page) {
    let value = offerts.slice(
      page * elementsPerPage,
      (page + 1) * elementsPerPage
    );
    return value;
  },
};
