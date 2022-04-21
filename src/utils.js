import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items) //this converts the items array into a lodash wrapper
    .slice(startIndex) //we now determine the slice point for the items that we want to display from the array, given as an arrray output
    .take(pageSize) //we now go to that array and slice this number of items
    .value(); //we now convert this lodash wrapper into a regular array
}
