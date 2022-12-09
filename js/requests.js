let table = document.querySelector("table");
let user_type = sessionStorage.getItem("user_type");
let org_name = sessionStorage.getItem("org_name");
let user_id = sessionStorage.getItem("user_id");

// if user is a supervisor, they can see entire org's history
// if user is an employee, they can see their requests
let url_ext =
  user_type === "supervisor" ? "org_name/" + org_name : "user/" + user_id;

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

    if (user_type === "supervisor" && element["status"] === "Pending") {
      let rejectBtnCell = row.insertCell();
      var btnReject = document.createElement("input");
      btnReject.type = "button";
      btnReject.id = "btnReject";
      btnReject.className = "btn";
      btnReject.value = "Reject";
      btnReject.addEventListener("click", (event) => {
        let cur_row = event.target.closest("tr");
        let request_id = cur_row.cells[1].textContent;
        const url_update =
          "http://localhost:5000/api/requests/update/" + request_id;

        axios
          .patch(url_update, { request_status: "Rejected" })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        location.reload();
      });
      rejectBtnCell.appendChild(btnReject);

      let ApproveBtnCell = row.insertCell();
      var btnApprove = document.createElement("input");
      btnApprove.type = "button";
      btnApprove.id = "btnApprove";
      btnApprove.className = "btn";
      btnApprove.value = "Approve";
      btnApprove.addEventListener("click", (event) => {
        let cur_row = event.target.closest("tr");
        let request_id = cur_row.cells[1].textContent;
        const url_update =
          "http://localhost:5000/api/requests/update/" + request_id;

        axios
          .patch(url_update, { request_status: "Ordered" })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        location.reload();
      });
      ApproveBtnCell.appendChild(btnApprove);
    }
  }
}

axios
  .get("http://localhost:5000/api/requests/" + url_ext)
  .then((response) => {
    let requests_array = [];

    for (element of response.data) {
      console.log(element.hasOwnProperty("name"));
      let name = element.hasOwnProperty("name") ? element.name : "-";
      let date = new Date(element.createdAt);
      let request = {
        datetime: date.toLocaleString(),
        request_id: element._id,
        requester: name,
        item_name: element.item_name,
        quantity: element.quantity,
        total_cost: element.order ? element.order.total_cost : "-",
        status: element.request_status,
      };

      requests_array.push(request);
    }

    generateTableHead(table, Object.keys(requests_array[0]));
    generateTable(table, requests_array.sort().reverse());
  })
  .catch((error) => {
    console.log(error);
  });
