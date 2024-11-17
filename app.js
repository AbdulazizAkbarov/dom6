let crudTab = document.querySelector(".crudTable");
let thead = document.querySelector("thead");
let tbody = document.querySelector("tbody");
let form = document.querySelector("form");

function saveToLocalStorage(data) {
  localStorage.setItem("crudData", JSON.stringify(data));
}

function getFromLocalStorage() {
  let data = localStorage.getItem("crudData");
  return data ? JSON.parse(data) : [];
}

let crudDatas = getFromLocalStorage().length
  ? getFromLocalStorage()
  : [
      { id: 1, name: "John Doe", email: "John@example.com" },
      { id: 2, name: "Jane Doe", email: "Jane@example.com" },
      { id: 3, name: "Alice Doe", email: "Alice@example.com" },
      { id: 4, name: "Bob Doe", email: "Bob@example.com" },
      { id: 5, name: "Neo Doe", email: "Neo@example.com" },
      { id: 6, name: "Thomas Doe", email: "Thomas@example.com" },
    ];
saveToLocalStorage(crudDatas);

(function renderTableHead() {
  let tr = document.createElement("tr");
  Object.keys(crudDatas[0]).forEach((key) => {
    let th = document.createElement("th");
    th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    tr.append(th);
  });

  let thAction = document.createElement("th");
  thAction.textContent = "Action";
  tr.append(thAction);

  thead.append(tr);
})();

function renderTableData(datas) {
  tbody.innerHTML = "";
  datas.forEach((val) => {
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdName = document.createElement("td");
    let tdEmail = document.createElement("td");
    let tdAction = document.createElement("td");

    tdId.textContent = val.id;
    tdName.textContent = val.name;
    tdEmail.textContent = val.email;

    tr.append(tdId, tdName, tdEmail, tdAction);

    let delBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    editBtn.innerHTML = `<button><img src='./image.png' alt='' width="16px"></button>`;
    delBtn.innerHTML = `<button><img src='./delet.png' alt='' width="16px" height="16px"></button>`;
    tdAction.append(delBtn, editBtn);

    tbody.append(tr);

    delBtn.addEventListener("click", () => {
      onDelete(val.id);
    });
    editBtn.addEventListener("click", () => {
      onEdit(val);
    });
  });

  if (datas.length === 0) {
    tbody.innerHTML = "<tr><td colspan='4'>No data found</td></tr>";
  }
}

renderTableData(crudDatas);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameText = e.target[0].value;
  let emailText = e.target[1].value;

  if (!nameText || !emailText) {
    alert("Please fill in all fields");
    return;
  }

  let newData = {
    id: crudDatas.length + 1,
    name: nameText,
    email: emailText,
  };

  crudDatas.push(newData);
  saveToLocalStorage(crudDatas);
  renderTableData(crudDatas);

  e.target[0].value = "";
  e.target[1].value = "";
});

function onDelete(id) {
  crudDatas = crudDatas.filter((val) => val.id !== id);
  saveToLocalStorage(crudDatas);
  renderTableData(crudDatas);
}

function onEdit(val) {
  let inputName = prompt("Enter new name:", val.name);
  let inputEmail = prompt("Enter new email:", val.email);

  if (inputName && inputEmail) {
    crudDatas = crudDatas.map((item) =>
      item.id === val.id ? { ...item, name: inputName, email: inputEmail } : item
    );
    saveToLocalStorage(crudDatas);
    renderTableData(crudDatas);
  }
}

  