let btnSignIn = document.getElementById("submitRequest");

btnSignIn.addEventListener("click", () => {
  const item = document.getElementById("item").value;
  const quantity = document.getElementById("quantity").value;

  let payload = {
    user_id: sessionStorage.getItem("user_id"),
    organization_name: sessionStorage.getItem("org_name"),
    item_name: item,
    quantity: quantity,
    quotations: null,
    order: null,
    request_status: "Sent",
  };

  console.log(payload);

  axios
    .get("http://localhost:5000/api/items/" + item)
    .then((response) => {
      console.log(response.data);
      if (response.data.length === 0) {
        alert("item not found");
      } else {
        axios
          .post("http://localhost:5000/api/requests/add", payload)
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
