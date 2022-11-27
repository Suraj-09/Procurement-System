let btnSubmitRequest = document.getElementById("submitRequest");

btnSubmitRequest.addEventListener("click", () => {
  const item = document.getElementById("item").value;
  const quantity = document.getElementById("quantity").value;

  let request_payload = {
    user_id: sessionStorage.getItem("user_id"),
    organization_name: sessionStorage.getItem("org_name"),
    item_name: item,
    quantity: quantity,
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



