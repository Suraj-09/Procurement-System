let email = sessionStorage.getItem("email");
const bell_icon = document.getElementById("icon_notif");
window.onload = function toggleNotification() {


      axios
    .get("http://localhost:5000/api/notifications/" + email)
    .then((response) => {
      let notifications_array = [];

      for (element of response.data) {
        if (element.read_status === false) {
            bell_icon.style.color = "red";
            break;
        }
      }


    })
    .catch((error) => {
      console.log(error);
    });
};
