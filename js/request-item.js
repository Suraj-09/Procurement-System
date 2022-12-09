window.onload = function toggleSupervisorSelect() {
  const user_type = sessionStorage.getItem("user_type");
  const supervisorDiv = document.getElementById("supervisor_select");

  supervisorDiv.style.display = (user_type === "employee") ? "block" : "none";
  // if (user_type == "employee") {
  //   supervisorDiv.style.display = "block";
  // } else {
  //   supervisorDiv.style.display = "none";
  // }
}

// Populate item dropdown list
let selectItem = document.getElementById("selectItem");
axios
  .get("http://localhost:5000/api/items")
  .then((response) => {
    const items = response.data.map(a => a.item_name).sort();
    const unique_items = [...new Set(items)]

    for (var i = 0; i < unique_items.length; i++) {
      let el = document.createElement("option");
      el.textContent = unique_items[i];
      el.value = unique_items[i];
      selectItem.appendChild(el);
    }
  })
  .catch((error) => {
    console.log(error);
  });

// Populate supervisor dropdown list
let selectSupervisor = document.getElementById("selectSupervisor");
let org_name = sessionStorage.getItem("org_name");
axios
  .get("http://localhost:5000/api/users/supervisor/" + org_name)
  .then((response) => {
    const supervisors = response.data
    for (var i = 0; i < supervisors.length; i++) {
      let supervisor = supervisors[i].name;
      let el = document.createElement("option");
      el.textContent = supervisor;
      el.value = supervisor;
      selectSupervisor.appendChild(el);
    }
  })
  .catch((error) => {
    console.log(error);
  });



let btnSubmitRequest = document.getElementById("submitRequest");

btnSubmitRequest.addEventListener("click", () => {
  const item = document.getElementById("selectItem").value;
  const quantity = document.getElementById("quantity").value;
  const reason = document.getElementById("reason").value;

  const user_type = sessionStorage.getItem("user_type");
  let supervisor_name = document.getElementById("selectSupervisor").value;
  supervisor_name = (user_type === "employee") ? supervisor_name : sessionStorage.getItem("name");

  let request_payload = {
    user_id: sessionStorage.getItem("user_id"),
    name: sessionStorage.getItem("name"),
    organization_name: sessionStorage.getItem("org_name"),
    supervisor_name: supervisor_name,
    item_name: item,
    quantity: quantity,
    reason: reason,
    quotations: null,
    order: null,
    request_status: "Sent",
  };

  console.log(request_payload);

  axios
    .get("http://localhost:5000/api/items/" + item)
    .then((response) => {
      console.log(response.data);
      if (response.data.length === 0) {
        alert("item not found");
      } else {
        axios
          .post("http://localhost:5000/api/requests/add", request_payload)
          .then((response) => {
            console.log(response.data);
            sessionStorage.setItem("new_request_item", item);
            sessionStorage.setItem("new_request_quantity", quantity);
            sessionStorage.setItem("new_request_id", response.data._id);
            window.location = "http://127.0.0.1:5500/request-results.html";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      alert("item not found");
    });

  event.preventDefault();
});




