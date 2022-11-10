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

axios
  .get("http://localhost:5000/api/items/" + item)
  .then((response) => {
    const items = response.data;

    console.log(items);
    document.getElementById("item-qty").innerText =
      "item: " + item + " | quantity: " + quantity;

    items.forEach((x, i) => {
      const total_cost = quantity * x.price;
      const quotation = new Quotation(x.supplier_name, total_cost);
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

    createList(quotations_list, list);
  })
  .catch((error) => console.error(error));

let btnConfirm = document.getElementById("confirm");
let btnCancel = document.getElementById("cancel");

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

btnConfirm.addEventListener("click", () => {
  console.log(quotations_list);
  const quotation_chosen = quotations_list[0];
  const url_update = "http://localhost:5000/api/requests/update/" + request_id;

  if (quotation_chosen.total_cost <= 5000) {
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
    alert("Need supervisor's approval for orders over 5000$")
  }
  //   console.log(request_id);

  //   const item = document.getElementById("item").value;
  //   const quantity = document.getElementById("quantity").value;

  //   let payload = {
  //     user_id: sessionStorage.getItem("user_id"),
  //     organization_name: sessionStorage.getItem("org_name"),
  //     item_name: item,
  //     quantity: quantity,
  //     quotations: null,
  //     order: null,
  //     request_status: "Sent",
  //   };

  //   console.log(payload);

  //   axios
  //     .post("http://localhost:5000/api/requests/add", payload)
  //     .then((response) => {
  //       console.log(response.data);
  //       sessionStorage.setItem("new_request_item", item);
  //       sessionStorage.setItem("new_request_quantity", quantity);
  //       window.location = "http://127.0.0.1:5500/request-results.html";
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  event.preventDefault();
});

/*
  
  _id 6366c5e2851d24c200aa6a6a
  user_id "635ecf3624d1376532f9f74d"
  organization_name "test_org"
  item_name "Paper"
  quantity 100000
  
  quotations Array
  
  order Object
  request_status "Ordered"
  createdAt 2022-11-05T20:21:54.138+00:00
  updatedAt 2022-11-05T20:57:09.575+00:00
  __v 0
  */
