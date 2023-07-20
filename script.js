const category = document.getElementById("category");
const categoryForAdd = document.getElementById("categoryForAdd");

const products = document.getElementById("products");
const productsLabel = document.getElementById("productsLabel");
const quantity = document.getElementById("quantity");
const unity = document.getElementById("unity");
const add = document.getElementById("add");
const resultUl = document.getElementById("result");
const resultList = document.getElementById("list");

const getCat = document.getElementById("getCat");
const catToAdd = document.getElementById("catToAdd");

let categoryName = "";
let productName = "";
let monId = "";
let quantityName = "";
let unityName = "";

let list = [];
let listSet = [];

category.addEventListener("click", getCategory);
products.addEventListener("click", getProduct);
quantity.addEventListener("change", getQuantity);
unity.addEventListener("click", getUnity);
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
      dataCat = JSON.stringify(data);

      localStorage.setItem("categories", dataCat);

      data.forEach(function (element) {
        (category.innerHTML += `<option value=${element.value} >${element.name}</option>`),
          (categoryForAdd.innerHTML += `<option value=${element.value} >${element.name}</option>`),
          (resultUl.innerHTML += `<li  >${element.name}<ul  class="toSort" id= ${element.value}></ul></li>`);
      });
    });
} else {
  dataCat = JSON.parse(localStorage.getItem("categories"));
  dataCat.forEach(function (element) {
    (category.innerHTML += `<option value=${element.value} >${element.name}</option>`),
      (categoryForAdd.innerHTML += `<option value=${element.value} >${element.name}</option>`),
      (resultUl.innerHTML += `<li  >${element.name}<ul class="toSort" id= ${element.value}></ul></li>`);
  });
}

// catégories
function getCategory(e) {
  categoryName = e.target.value;

  if (!categoryName) {
    products.style.opacity = "0";
    productsLabel.style.opacity = "0";
  } else {
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
    list.push({ productName, thisid });
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
        (resultProd.innerHTML += `<li> ${product.productName} </li>`)
      )
    );
  }
  sortUl();
}

// obtenir la quantité
function getQuantity(e) {
  quantityName = e.target.value;
  console.log(quantityName);
}
// obtenir l'unité'
function getUnity(e) {
  unityName = e.target.value;
  console.log(unityName);
  //   return productName;
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
