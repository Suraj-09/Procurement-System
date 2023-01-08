const item = sessionStorage.getItem("new_request_item");
const quantity = sessionStorage.getItem("new_request_quantity");
const request_id = sessionStorage.getItem("new_request_id");
const url_update = "http://localhost:5000/api/requests/update/" + request_id;

let quotations_list = [];

class Quotation {
  constructor(supplier_name, total_cost) {
    this.supplier_name = supplier_name;
    this.total_cost = total_cost;
  }

  toString() {
    return (
      "Supplier: " + this.supplier_name + ", Total cost: " + this.total_cost
    );
  }
}

function compareQuotations(a, b) {
  const cost1 = a.total_cost;
  const cost2 = b.total_cost;

  let comparison = 0;
  if (cost1 >= cost2) {
    comparison = 1;
  } else if (cost1 < cost2) {
    comparison = -1;
  }
  return comparison;
}

function createList(items, parent) {
  var ul = document.createElement("ul");
  parent.appendChild(ul);
  items.forEach(function generateList(item) {
    var li = document.createElement("li");
    ul.appendChild(li);
    if (Array.isArray(item)) {
      createList(item, li);
    } else {
      li.innerHTML = item;
    }
  });
}

let table = document.querySelector("table");
function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      cell.style.border = "1px solid";
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}
// get quotations
axios
  .get("http://localhost:5000/api/items/" + item)
  .then((response) => {
    const items = response.data;

    console.log(items);

    // 
    document.getElementById("item-qty").innerText =
      "item: " + item + " | quantity: " + quantity;

    // creating a list of the quoations
    items.forEach((x, i) => {
      const total_cost = quantity * x.price;
      const quotation = new Quotation(x.supplier_name, total_cost.toFixed(2));
      console.log(quotation.toString());
      quotations_list.push(quotation);
    });

    quotations_list.sort(compareQuotations);

    axios
      .patch(url_update, { quotations: quotations_list })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    let list = document.getElementById("quotations_list");

    generateTable(table, quotations_list);
  })
  .catch((error) => console.error(error));



let btnConfirm = document.getElementById("confirm");
let btnCancel = document.getElementById("cancel");
const user_type = sessionStorage.getItem("user_type");

// cancel button
btnCancel.addEventListener("click", () => {
  axios
    .patch(url_update, { request_status: "Cancelled" })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  window.location = "http://127.0.0.1:5500/index.html";
});

// confirm button
btnConfirm.addEventListener("click", () => {
  const quotation_chosen = quotations_list[0];
  const url_update = "http://localhost:5000/api/requests/update/" + request_id;

  if (quotation_chosen.total_cost <= 5000 || user_type === "supervisor") {
    axios
      .patch(url_update, { order: quotation_chosen })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .patch(url_update, { request_status: "Ordered" })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    window.location = "http://127.0.0.1:5500/index.html";
  } else {
    if (quotations_list.length >= 2) {
      console.log(quotations_list.length);
      alert("Request will be sent to supervisor");
      axios
        .patch(url_update, { order: quotation_chosen })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .patch(url_update, { request_status: "Pending" })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      let notification_payload = {
        sender_email: sessionStorage.getItem("email"),
        receiver_email: sessionStorage.getItem("supervisor_email"),
        organization_name: sessionStorage.getItem("org_name"),
        request_id: request_id,
        message: "New request was made. Reason: " + sessionStorage.getItem("reason"),
        read_status: false,
      };

      axios
        .post("http://localhost:5000/api/notifications/add", notification_payload)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      window.location = "http://127.0.0.1:5500/index.html";
    } else {
      alert(
        "Multiple quotations are necessary for orders over 5000$. The request will be cancelled!"
      );
      axios
        .patch(url_update, { request_status: "Cancelled" })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      window.location = "http://127.0.0.1:5500/index.html";
    }
  }
  event.preventDefault();
});
