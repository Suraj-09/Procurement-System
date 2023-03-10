let btnSignIn = document.getElementById("SignIn");

btnSignIn.addEventListener("click", () => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const url = "http://localhost:5000/api/users/email/" + email;

  axios
    .get(url)
    .then((response) => {
      const user = response.data[0];
      const query_pass = user.password;
      if (password === query_pass) {
        console.log("successful");
        sessionStorage.setItem("user_id", user._id);
        sessionStorage.setItem("name", user.name);
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("user_type", user.user_type);
        sessionStorage.setItem("org_name", user.organization_name);
        window.location = "http://127.0.0.1:5500/index.html";
      } else {
        alert("Wrong email or password");
      }
    })
    .catch((error) => {
      alert("Wrong email or password");
      console.error(error);
    });
});
