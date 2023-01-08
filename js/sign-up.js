let btnBack = document.getElementById("back");
let btnSignUp = document.getElementById("SignUp");

btnBack.addEventListener("click", () => {
  window.location = "/sign-in.html";
});

btnSignUp.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  const organization = document.getElementById("organization_name").value;
  const user_type = document.getElementById("user_type");

  // check if passwords match
  if (password2 != password) {
    alert("Passwords do not match");
    return;
  } else {
    const url = "http://localhost:5000/api/users/email/" + email;

    // check if user email is already in the database
    axios
      .get(url)
      .then((response) => {
        const user = response.data[0];

        if (user) {
          alert("An account with this email already exists");
          console.log("Fail");
        } else {
          // add new user to database
          axios
            .post("http://localhost:5000/api/users/add", {
              name: name,
              email: email,
              password: password,
              user_type: user_type.checked === true ? "supervisor" : "employee",
              organization_name: organization,
            })
            .then((response) => {
              console.log(response.data);
              sessionStorage.setItem("user_id", response.data._id);
              sessionStorage.setItem("name", response.data.name);
              sessionStorage.setItem("email", response.data.email);
              sessionStorage.setItem("user_type", response.data.user_type);
              sessionStorage.setItem(
                "org_name",
                response.data.organization_name
              );
              window.location = "/";
              console.log("Signed up Successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log("error");
        alert("Error");
        console.error(error);
      });
  }

  event.preventDefault();
});
