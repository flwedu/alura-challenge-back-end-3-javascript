const table__div = document.getElementById("table__div");
const table = document.getElementById("table");

fetch("/transactions").then(appendToTable);

/**
 * This functions receives a list and append each element to the table element
 * @param {Response} response
 */
function appendToTable(response) {
  response.json().then((responseList) => {
    const tbody = table.querySelector("tbody");

    //Showing the table if only has data to show
    if (responseList.length) table__div.hidden = false;

    responseList.forEach((el) => {
      const tr = convertToTrElement(el);
      tbody.appendChild(tr);
    });
  });
}

/**
 * This function receives and element and convert to a <tr> element
 * @param {string} el
 * @returns {HTMLTableRowElement} tr
 */
function convertToTrElement(el) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
        <td>${el.props.originBankName}</td>
        <td>${el.props.originBankAgency}</td>
        <td>${el.props.originBankNumber}</td>
        <td>${el.props.destinyBankName}</td>
        <td>${el.props.destinyBankAgency}</td>
        <td>${el.props.destinyBankNumber}</td>
        <td>${el.props.value}</td>
        <td>${el.props.date}</td>
    `;
  return tr;
}
