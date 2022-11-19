let btnSignUp = document.getElementById("SignUp");

btnSignUp.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  if (password2 != password) {
    alert("Password do not match");
    return;
    
  } else {

    const url = "http://localhost:5000/api/users/email/" + email;

  axios
    .get(url)
    .then((response) => {
      const user = response.data[0];
    if (user) {
       console.log("Fail");
    } else {
        axios.post
        ("http://localhost:5000/api/users/add", {
            name: 'name',
            email: email,
            password: password,
            user_type: 'employee',
            organization_name: 'organization'
          })
          .then((response)=>{
            window.location = "/"
            console.log("Signed up Successfully")
          })
    }
    })
    .catch((error) => {
      alert("Wrong email or password");
      console.error(error);
    });
  }

  event.preventDefault();
});
