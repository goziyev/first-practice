const btn = document.querySelector("#btn");
const input = document.getElementById("text");
const table = document.getElementById("table");
const todos = document.getElementById("todos");
const cards = document.querySelector(".cards");
const btn_start=  document.querySelector("#btn_start")

btn_start && btn_start.addEventListener("click", function(){
    if (userId.value == "login" && password.value == "12345") {
      cards.style.display = "block";
      form.style.display = "none";
    }
})

function validate() {
  if (!input.value) {
    alert("Siz bo'sh maydon malumotini yubordingiz!!");
    input.focus();
    input.style.outlineColor = "red";
    return false;
  }
  if (Number(input.value)) {
    alert("Bu joyga raqam kiritish mumkin emas");
    input.focus();
    input.style.outlineColor = "red";
    return false;
  } else {
    input.style.outlineColor = "Green";
  }
  return true;
}

function createRow(user) {
  return `
    <tr>
    <td><input type="checkbox" name="" id="checkbox"></td>
     <td>${user.name}</td>
     <td>
       <span>
       <img src="./img/update.png" width="30" alt="">
       <img class="delate"  data-id = "${user.id}" src="./img/delate.png" width="30" alt="">
     </span>
     </td>
 </tr>
    `;
}

function clear(text) {
  return (text.value = "");
}
let dataLocalStorage = [];

btn &&
  btn.addEventListener("click", function () {
    if (validate()) {
      console.log(input.value);
      const user = {
        name: input.value,
        id: Date.now(),
      };
      if (localStorage.getItem("users")) {
        dataLocalStorage = JSON.parse(localStorage.getItem("users"));
      }
      dataLocalStorage.push(user);
      localStorage.setItem("users", JSON.stringify(dataLocalStorage));
      todos.innerHTML = `Todos (${dataLocalStorage.length})`;
      const tr = createRow(user);
      table.innerHTML += tr;
    }
    clear(input);
  });

document.addEventListener("DOMContentLoaded", function () {
  let data = [];
  if (localStorage.getItem("users")) {
    dataLocalStorage = JSON.parse(localStorage.getItem("users"));
    data = JSON.parse(localStorage.getItem("users"));
    todos.innerHTML = `Todos (${dataLocalStorage.length})`;
  }

  if (data.length && table) {
    data.forEach((element) => {
      const tr = createRow(element);
      table.innerHTML += tr;
    });
  }
  const delateButtons = document.querySelectorAll("img.delate");
  if (delateButtons.length) {
    delateButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        let elId = this.getAttribute("data-id");
        if (elId) {
          let isDelate = confirm("Rostdan ham o'chirmoqchimisiz !!!");
          if (isDelate) {
            data = data.filter((el) => {
              return el.id != elId;
            });
            localStorage.setItem("users", JSON.stringify(data));
            window.location.reload();
          }
        }
      });
    });
  }
});
