module.exports = (worksheet, searchText, newText) => {
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
      if (
        typeof cell.value === "object" &&
        cell.value !== null &&
        cell.value.richText.some((item) => item.text.includes(searchText))
      ) {
        const index = cell.value.richText.findIndex((item) =>
          item.text.includes(searchText)
        );
        cell.value.richText[index].text = cell.value.richText[
          index
        ].text.replace(searchText, newText);
      } else {
        if (cell.value === searchText) {
          cell.value = newText;
        }
      }
    });
  });
};
