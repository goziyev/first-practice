const btn = document.querySelector("#btn");
const input = document.getElementById("text");
const table = document.getElementById("table");
const todos = document.getElementById("todos");


function validate() {
  if (!input.value) {
    alert("Siz bo'sh maydon malumotini yubordingiz!!");
    input.focus();
    input.style.outlineColor = "red";
    return false;
  }
  if(!input.value.trim()){
    input.value = ""

    alert("Iltimos matn kiriting...")
    return false
  }
  if(input.value.length <= 4){
    alert("Ishoralar soni 4 tadan kam bo'lishi mumkin emas !!!")
    input.value = ""
    return false
  }
  if (Number(input.value)) {
    alert("Bu joyga raqam kiritish mumkin emas");
    input.focus();
    input.value = ""
    input.style.outlineColor = "red";
    return false;
  } else {
    input.style.outlineColor = "Green";
  }

  return true;
}
function changeStatus(id, status) {
  let data = JSON.parse(localStorage.getItem("users"));
  if (data.length) {
    data = data.map((todo) => {
      if (todo.id == id) {
        todo.status = status;
      }
      return todo;
    });
  }
  localStorage.setItem("users", JSON.stringify(data));
}

function createRow(user) {
  let check = "";
  let styleLine = "";
  if (user.status == "active") {
    check = "";
    styleLine = "text-decoration:none";
  }
  if (user.status == "inactive") {
    check = "checked";
    styleLine = "text-decoration:line-through";
  }

  return `
  
    <tr data-item ="todo_${user.id}">
    <td><input type="checkbox"  ${check} ></td>
     <td style = '${styleLine}'>${user.name}</td>
     <td>
       <span>
       <img class = "update" data-id = ${user.id} src="./img/update.png" width="30" alt="">
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
        status: "active",
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
          let isDelate = true
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
  const updateButtons = document.querySelectorAll("img.update");
  if (updateButtons.length) {
    updateButtons.forEach((btn, index) => {
      btn.addEventListener("click", function () {
        let elId = this.getAttribute("data-id");
        if (elId) {
          let isUpdate = true
          if (isUpdate) {
            let data = JSON.parse(localStorage.getItem("users"));
            if (data[index]["id"] == elId) {
              input.value = data[index].name;
              user.id = elId
            }
          }
        }
      });
    });
  }
  const checkboxes = document.querySelectorAll("input[type='checkbox'");
  if (checkboxes.length) {
    checkboxes.forEach((item) => {
      item.addEventListener("change", function (event) {
        let checkedId = this?.parentNode?.parentNode
          ?.getAttribute("data-item")
          .slice(5);
        if (checkedId) {
          if (event.target.checked) {
            this.parentNode.nextSibling.nextSibling.style.textDecoration = "line-through"  
            changeStatus(checkedId,"inactive")
          }else{
            this.parentNode.nextSibling.nextSibling.style.textDecoration = "none"

            changeStatus(checkedId,"active")      
          }
        }
      });
    });
  }
   
});

input && input.addEventListener('keyup', function (event) {
  if (event.keyCode == 13) {
      if (validate(input)) {
          const user = {
              id: Date.now(),
              name:input.value,
              status: "active"
          };
          let data = [];
          if (localStorage.getItem('users')) {
              data = JSON.parse(localStorage.getItem('users'));
          }
      
          data.push(user);
          localStorage.setItem('users', JSON.stringify(data));
          todos.innerHTML = `Todos (${data.length})`;
          let todoItem = createRow(user);
          table.innerHTML += todoItem;

          input.value = '';

      } else {
          console.log("Validatiyadan o'tmadi");
      }
  }
})