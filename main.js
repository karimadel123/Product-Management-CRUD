let model = document.getElementById("model");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let sumbit = document.getElementById("sumbit");
let mood = "create";
let x;
//get total
function gettotal() {
  if (price.value != "") {
    let reslut = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = reslut;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

//creat product

let data_product;
if (localStorage.product != null) {
  data_product = JSON.parse(localStorage.product);
} else {
  data_product = [];
}
sumbit.onclick = function () {
  const product = {
    model: model.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    model.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value < 100
  ) {
    if (mood === "create") {
      if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
          data_product.push(product);
        }
      } else {
        data_product.push(product);
      }
    } else {
      data_product[x] = product;
      mood = "create";
      count.style.display = "block";
      sumbit.innerHTML = "create";
    }
    clear();
  }
  localStorage.setItem("product", JSON.stringify(data_product));
  showData();
};

//clear product
function clear() {
  model.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//show Data
function showData() {
  gettotal();
  let table = "";
  for (let i = 0; i < data_product.length; i++) {
    table += `
<tr>
                    <td>${i + 1}</td>
                    <td>${data_product[i].model}</td>
                    <td>${data_product[i].price}</td>
                    <td>${data_product[i].taxes}</td>
                    <td>${data_product[i].ads}</td>
                    <td>${data_product[i].discount}</td>
                    <td>${data_product[i].total}</td>
                    <td>${data_product[i].category}</td>
                    <td><button onclick="update(${i})" id ="update">Update</button></td>
                    <td><button onclick=" Delete(${i}) " id ="delete">Delete </button></td>
                </tr>
  `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btndelete = document.getElementById("deleteall");
  if (data_product.length > 0) {
    btndelete.innerHTML = `
     <button onclick="deleteall()">DeleteAll(${data_product.length}) </button>
    
    `;
  } else {
    btndelete.innerHTML = "";
  }
}
showData();

//Delete data

function Delete(i) {
  data_product.splice(i, 1);
  localStorage.product = JSON.stringify(data_product);
  showData();
}

//Delete All
function deleteall() {
  localStorage.clear();
  data_product.splice(0);
  showData();
}

//updata data
function update(i) {
  model.value = data_product[i].model;
  price.value = data_product[i].price;
  taxes.value = data_product[i].taxes;
  ads.value = data_product[i].ads;
  discount.value = data_product[i].discount;
  gettotal();
  count.style.display = "none";
  category.value = data_product[i].category;
  sumbit.innerHTML = "Update";
  mood = "Update";
  x = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search
let searchmode = "model";
let search = document.getElementById("search");
function getsearchmode(id) {
  if (id == "SearchModel") {
    searchmode = "model";
    search.placeholder = "Search By Model";
  } else {
    searchmode = "Category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function SearchDate(value) {
  let table = "";
  if (searchmode === "model") {
    for (let i = 0; i < data_product.length; i++) {
      if (data_product[i].model.includes(value.toLowerCase())) {
        table += `
<tr>
                    <td>${i}</td>
                    <td>${data_product[i].model}</td>
                    <td>${data_product[i].price}</td>
                    <td>${data_product[i].taxes}</td>
                    <td>${data_product[i].ads}</td>
                    <td>${data_product[i].discount}</td>
                    <td>${data_product[i].total}</td>
                    <td>${data_product[i].category}</td>
                    <td><button onclick="update(${i})" id ="update">Update</button></td>
                    <td><button onclick=" Delete(${i}) " id ="delete">Delete </button></td>
                </tr>
  `;
      }
    }
  } else {
    for (let i = 0; i < data_product.length; i++) {
      if (data_product[i].category.includes(value.toLowerCase())) {
        table += `
<tr>
                    <td>${i}</td>
                    <td>${data_product[i].model}</td>
                    <td>${data_product[i].price}</td>
                    <td>${data_product[i].taxes}</td>
                    <td>${data_product[i].ads}</td>
                    <td>${data_product[i].discount}</td>
                    <td>${data_product[i].total}</td>
                    <td>${data_product[i].category}</td>
                    <td><button onclick="update(${i})" id ="update">Update</button></td>
                    <td><button onclick=" Delete(${i}) " id ="delete">Delete </button></td>
                </tr>
  `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
