export const verfiFields = (fields, objectsArr) => {
  let newData = objectsArr;
  let error;
  objectsArr.forEach((data) => {
    fields.forEach((field) => {
      if (!data[field]) {
        newData = newData.map((dta) => {
          if (data.c === dta.c) {
            dta[field] = "missing";
            return dta;
          } else {
            return dta;
          }
        });
        error = error
          ? error + ` In Question ${data.c}: ${field} is missing!,`
          : ` In Question ${data.c}: ${field} is missing!,`;
      }
    });
  });

  return { newData, error };
};
