export const groupArrayWithFields = (data, filterField) => {
  const filterGroup = {};

  data.forEach((itm) => {
    const field = itm[filterField];
    if (field.toLowerCase() === "none" || !field) return;
    if (!filterGroup[field]) {
      filterGroup[field] = [];
    }
    filterGroup[field].push(itm);
  });

  return filterGroup;
};
