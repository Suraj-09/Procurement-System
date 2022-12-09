let table = document.querySelector("table");
let user_type = sessionStorage.getItem("user_type");
let org_name = sessionStorage.getItem("org_name");
let user_id = sessionStorage.getItem("user_id");
let email = sessionStorage.getItem("email");

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

axios
  .get("http://localhost:5000/api/notifications/" + email)
  .then((response) => {
    let notifications_array = [];

    for (element of response.data) {
      let date = new Date(element.createdAt);
      let request = {
        datetime: date.toLocaleString(),
        sender_email: element.sender_email,
        request_id: element.request_id,
        message: element.message,
      };

      notifications_array.push(request);
    }

    generateTableHead(table, Object.keys(notifications_array[0]));
    generateTable(table, notifications_array.sort().reverse());
  })
  .catch((error) => {
    console.log(error);
  });

axios
  .patch("http://localhost:5000/api/notifications/update/read/" + email)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
