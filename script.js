const category = document.getElementById("category");
const categoryForAdd = document.getElementById("categoryForAdd");

const products = document.getElementById("products");
const productsLabel = document.getElementById("productsLabel");
const details = document.getElementById("details");

const add = document.getElementById("add");
const resultUl = document.getElementById("result");
const resultList = document.getElementById("list");

const getCat = document.getElementById("getCat");
const catToAdd = document.getElementById("catToAdd");

let categoryName = "";
let productName = "";
let detailsTxt = "";
let monId = "";

let list = [];
let listSet = [];

category.addEventListener("click", getCategory);
products.addEventListener("click", getProduct);
details.addEventListener("change", getDetails);

add.addEventListener("click", addProduct);
getCat.addEventListener("click", getTheCat);

// CATEGORIES

let dataCat = JSON.parse(localStorage.getItem("categories")) || [];
let dataProd = JSON.parse(localStorage.getItem("products")) || [];
// category.innerHTML = `<option value="0 >choisissez</option>`;
if (!localStorage.getItem("categories")) {
  fetch("/data/categories.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data = data.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      dataCat = JSON.stringify(data);

      console.log(dataCat);
      localStorage.setItem("categories", dataCat);

      data.forEach(function (element) {
        (category.innerHTML += `<option value=${element.value} >${element.name}</option>`),
          (categoryForAdd.innerHTML += `<option value=${element.value} >${element.name}</option>`),
          (resultUl.innerHTML += `<li  >${element.name}<ul  class="toSort" id= ${element.value}></ul></li>`);
      });
    });
} else {
  dataCat = JSON.parse(localStorage.getItem("categories"));
  dataCat = dataCat.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  console.log(dataCat);
  dataCat.forEach(function (element) {
    (category.innerHTML += `<option value=${element.value} >${element.name}</option>`),
      (categoryForAdd.innerHTML += `<option value=${element.value} >${element.name}</option>`),
      (resultUl.innerHTML += `<li  >${element.name}<ul class="toSort" id= ${element.value}></ul></li>`);
  });
}

// catégories
function getCategory(e) {
  categoryName = e.target.value;

  if (categoryName) {
    products.disabled = false;
    products.style.opacity = "1";
    productsLabel.style.opacity = "1";
    setProducts(categoryName);
  }

  return categoryName;
}

// produits

function setProducts() {
  products.innerHTML = `<option value="0" >Choisissez</option>`;
  if (!localStorage.getItem("products")) {
    fetch("/data/products.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        dataProd = JSON.stringify(data);

        localStorage.setItem("products", dataProd);

        let prod = data.filter((dat) => dat.product == categoryName)[0];

        prod.items.forEach(
          (element) =>
            (products.innerHTML += `<option class=${element.id} value=${element.value} >${element.name}</option>`)
        );
      });
  }
  dataProd = JSON.parse(localStorage.getItem("products"));

  let prod = dataProd.filter((dat) => dat.product == categoryName)[0];

  prod.items.forEach(
    (element) =>
      (products.innerHTML += `<option class=${element.id} value=${element.value} >${element.name}</option>`)
  );
}

// ajout cat

function getTheCat() {
  let val = catToAdd.value;
  let toAdd = {
    name: val,
    value: val,
  };
  if (val.length >= 1) {
    dataCat.push(toAdd);

    dataCat = JSON.stringify(dataCat);
    localStorage.setItem("categories", dataCat);
    window.location.reload();
  }
}

// obtenir le produit
function getProduct(e) {
  add.disabled = false;
  productName = e.target.value;
  let selectElement = e.target;
  let optionSelectionnee = selectElement.selectedOptions[0];
  let monId = optionSelectionnee.className;
  console.log("prodname", productName, "monID", monId);
  return (thisid = monId);
}

// Ajout produit aux listes
function addProduct() {
  add.disabled = true;
  if (productName) {
    let resultProd = "";
    list.push({ productName, thisid, detailsTxt });
    list.sort();
    let listSet = list.filter((item, index, self) => {
      return (
        index ===
        self.findIndex((el) => {
          return (
            el.productName === item.productName && el.thisid === item.thisid
          );
        })
      );
    });

    console.log("arrayunique", listSet);

    console.log("thisid", thisid, "monid", thisid);

    listSet = listSet.filter((listItem) => listItem.thisid === thisid);

    resultProd = document.getElementById(thisid);
    resultProd.innerHTML = "";
    listSet.forEach(
      (product) => (
        console.log(thisid, resultProd, product),
        (resultProd.innerHTML += `<li> ${product.productName} : ${product.detailsTxt} </li>`)
      )
    );
  }
  sortUl();
}

// obtenir les détails
function getDetails(e) {
  detailsTxt = e.target.value;
  console.log(detailsTxt);
}

// ordre alpha
const ulElements = document.querySelectorAll(".toSort");
function sortUl() {
  ulElements.forEach(function (ul) {
    const liElements = ul.getElementsByTagName("li");
    let liArray = Array.from(liElements);
    liArray.sort(function (a, b) {
      return a.textContent.localeCompare(b.textContent);
    });

    for (let i = 0; i < liArray.length; i++) {
      ul.appendChild(liArray[i]);
    }
  });
}
