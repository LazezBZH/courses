const category = document.getElementById("category");
const categoryForAdd = document.getElementById("categoryForAdd");

const products = document.getElementById("products");
const productsLabel = document.getElementById("productsLabel");
const details = document.getElementById("details");
const detailsLabel = document.getElementById("detailsLabel");

const add = document.getElementById("add");
const resultUl = document.getElementById("result");

const ulElements = document.querySelectorAll(".toSort");

const getCat = document.getElementById("getCat");
const catToAdd = document.getElementById("catToAdd");
const prodToAdd = document.getElementById("prodToAdd");
const getProd = document.getElementById("getProd");

let categoryName = "";
let productName = "";
let detailsTxt = "";

let monId = "";
let addIn = "";

let dataCat;
let dataProd;
let allSavedList;

let list = JSON.parse(localStorage.getItem("last list")) || [];
let listSet = [];

const clear = document.getElementById("clear");
const clearAll = document.getElementById("clear-all");
const savedList = document.getElementById("saved-list");
const useLast = document.getElementById("use-last");
const createNew = document.getElementById("create-new");

clear.addEventListener("click", clearList);
clearAll.addEventListener("click", clearAllList);
savedList.addEventListener("change", getList);
useLast.addEventListener("click", useLastList);
createNew.addEventListener("click", createNewList);

function clearList() {
  localStorage.removeItem("last list");
  window.location.reload();
}
function clearAllList() {
  localStorage.removeItem("last list");
  localStorage.removeItem("categories");
  localStorage.removeItem("products");
  window.location.reload();
}

category.addEventListener("click", getCategory);
products.addEventListener("click", getProduct);
products.addEventListener("click", getDetailsProd);

details.addEventListener("keyup", getDetails);
categoryForAdd.addEventListener("click", getTheCatForAdd);

add.addEventListener("click", addProduct);
getCat.addEventListener("click", getTheCat);
getProd.addEventListener("click", getTheProd);

window.addEventListener("load", setTheList);

// CATEGORIES
if (!localStorage.getItem("categories")) {
  dataCat = [];
  localStorage.setItem("categories", dataCat);
}
if (!localStorage.getItem("products")) {
  dataProd = [];
  localStorage.setItem("products", dataProd);
}
if (!localStorage.getItem("saved")) {
  allSavedList = [];
  localStorage.setItem("saved", allSavedList);
}
// dataCat = JSON.parse(localStorage.getItem("categories")) ;
// dataProd = JSON.parse(localStorage.getItem("products")) ;
function setCategories() {
  dataCat = JSON.parse(localStorage.getItem("categories"));
  console.log();
  dataCat = dataCat.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  console.log(dataCat);
  dataCat.forEach(function (element) {
    (category.innerHTML += `<option value=${element.value.replace(
      /[^a-zA-Z0-9éèêêàïôù]/g,
      "*"
    )} >${element.name}</option>`),
      (categoryForAdd.innerHTML += `<option value=${element.value.replace(
        /[^a-zA-Z0-9éèêêàïôù]/g,
        "*"
      )} >${element.name}</option>`),
      (resultUl.innerHTML += `<li>${element.name} 
      
      <ul class="toSort" id= ${element.value.replace(
        /[^a-zA-Z0-9éèêêàïôù]/g,
        "*"
      )}>
      </ul></li>`);
  });
}
setCategories();

// afficher catégories dans select et liste
function getCategory(e) {
  categoryName = e.target.value;
  console.log(categoryName);

  if (categoryName && categoryName != "category") {
    products.disabled = false;
    details.disabled = false;
    productsLabel.style.opacity = "1";
    detailsLabel.style.opacity = "1";
    setProducts(categoryName);
  } else {
    products.disabled = true;
    productsLabel.style.opacity = ".5";
    detailsLabel.style.opacity = ".5";
  }

  // return categoryName;
}

// afficher produits dans select

function setProducts() {
  // if (localStorage.getItem("products")) {
  products.innerHTML = `<option value="0" >Choisissez</option>`;

  dataProd = JSON.parse(localStorage.getItem("products"));

  let prod = dataProd.filter(
    (dat) =>
      dat.id.replace(/[^a-zA-Z0-9éèêêàïôù]/g, "*") ==
      categoryName.replace(/[^a-zA-Z0-9éèêêàïôù]/g, "*")
  );
  prod = prod.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  prod.forEach(
    (element) =>
      (products.innerHTML += `<option class=${element.id.replace(
        /[^a-zA-Z0-9éèêêàïôù]/g,
        "*"
      )} value=${element.value.replace(/[^a-zA-Z0-9éèêêàïôù]/g, "*")} >${
        element.name
      }</option>`)
  );
}
setProducts();

// ajout d'une cat au select

function getTheCat() {
  let val = catToAdd.value;
  val = val.charAt(0).toUpperCase() + val.slice(1);
  let toAdd = {
    name: val,
    value: val,
  };
  console.log(toAdd);
  if (val.length >= 1) {
    dataCat.push(toAdd);

    dataCat = JSON.stringify(dataCat);
    localStorage.setItem("categories", dataCat);
    setCategories();
    window.location.reload();
  }
}
// ajout d'un produit au select
function getTheCatForAdd() {
  addIn = categoryForAdd.value;
  console.log("addin", addIn);
}
function getTheProd() {
  let val = prodToAdd.value;
  val = val.charAt(0).toUpperCase() + val.slice(1);
  let toAdd = {
    name: val,
    value: val,
    id: addIn,
  };
  if (val.length >= 1) {
    dataProd.push(toAdd);
    dataProd = dataProd.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    dataProd = JSON.stringify(dataProd);
    localStorage.setItem("products", dataProd);
    window.location.reload();
  }
}

// obtenir le produit
function getProduct(e) {
  add.disabled = false;
  productName = e.target.options[e.target.selectedIndex].text;
  let selectElement = e.target;
  let optionSelectionnee = selectElement.selectedOptions[0];
  let monId = optionSelectionnee.className;
  console.log("prodname", productName, "monID", monId);
  return (thisid = monId);
}

// Ajout produit aux listes
function addProduct() {
  add.disabled = true;
  // list = JSON.parse(localStorage.getItem("last list")) || [];

  console.log(list);
  if (productName) {
    productName = productName.charAt(0).toUpperCase() + productName.slice(1);
    let resultProd = "";
    list.unshift({ productName, thisid, detailsTxt });
    list = list.sort(function (a, b) {
      return a.productName.localeCompare(b.productName);
    });
    console.log(list);
    listSet = list.filter((item, index, self) => {
      return (
        index ===
        self.findIndex((el) => {
          return (
            el.productName === item.productName && el.thisid === item.thisid
            // &&
            // el.detailsTxt === item.detailsTxt
          );
        })
      );
    });

    console.log("arrayunique", listSet);

    console.log("thisid", thisid, "monid", thisid);

    listSetFilter = listSet.filter((listItem) => listItem.thisid === thisid);

    resultProd = document.getElementById(
      thisid.replace(/[^a-zA-Z0-9éèêêàïôù]/g, "*")
    );
    resultProd.innerHTML = "";
    listSetFilter.forEach(
      (product) => (
        console.log(thisid, resultProd, product),
        product.detailsTxt
          ? (resultProd.innerHTML += `<li> ${product.productName.replaceAll(
              "*",
              " "
            )} : ${product.detailsTxt} </li>`)
          : (resultProd.innerHTML += `<li> ${product.productName.replaceAll(
              "*",
              " "
            )} `)
      )
    );
  }
  productsLabel.style.opacity = ".5";
  products.disabled = true;
  detailsLabel.style.opacity = ".5";
  details.disabled = true;
  details.value = details.defaultValue;
  products.value = "0";
  category.value = "category";
  sortUl();

  dataList = JSON.stringify(list);
  localStorage.setItem("last list", dataList);
}
function setTheList() {
  list = JSON.parse(localStorage.getItem("last list")) || [];

  console.log(list);

  let resultProd = "";

  list.sort();
  listSet = list.filter((item, index, self) => {
    return (
      index ===
      self.findIndex((el) => {
        return (
          el.productName === item.productName && el.thisid === item.thisid
          // &&
          // el.detailsTxt === item.detailsTxt
        );
      })
    );
  });
  listSet = listSet.sort();
  console.log("arrayunique", listSet);

  let resultProds = resultUl.querySelectorAll("li");
  let resultProdUl;
  resultProds.forEach(
    (resultP) => (
      (resultProdUl = resultP.querySelector("ul")),
      // console.log(resultProdUl),

      (thisid = resultProdUl.getAttribute("id")),
      (listSetFilter = listSet.filter(
        (listItem) => listItem.thisid === thisid
      )),
      (resultProd = document.getElementById(thisid)),
      (resultProd.innerHTML = ""),
      listSetFilter.forEach((product) =>
        product.detailsTxt
          ? (resultProd.innerHTML += `<li> ${product.productName} : ${product.detailsTxt} </li>`)
          : (resultProd.innerHTML += `<li> ${product.productName} `)
      )
    )
  );
  console.log(resultProds);

  sortUl();
}

// obtenir les détails
function getDetails(e) {
  detailsTxt = e.target.value;
  console.log(detailsTxt);
  return detailsTxt;
}
function getDetailsProd(e) {
  detailsTxt = details.value;

  return detailsTxt;
}
// ordre alpha

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

// Enregistrer liste dans localStorage
let storeButton = document.getElementById("store");
let favDialog = document.getElementById("favDialog");
let input = document.querySelector("#inputStore");
let confirmBtn = document.getElementById("confirmBtn");
let form = document.querySelector("#form-dialog");

// Le bouton "Mettre à jour les détails" ouvre le <dialogue> ; modulaire
storeButton.addEventListener("click", function onOpen() {
  if (typeof favDialog.showModal === "function") {
    form.reset();
    favDialog.showModal();
  } else {
    console.error(
      "L'API <dialog> n'est pas prise en charge par ce navigateur."
    );
  }
});
// L'entrée définit la valeur du bouton d'envoi.
input.addEventListener("keyup", function onSelect(e) {
  confirmBtn.value = input.value;
});
// Le bouton "Confirmer" du formulaire déclenche la fermeture
// de la boîte de dialogue en raison de [method="dialog"]
confirmBtn.addEventListener("click", function onClose() {
  listName = input.value;
  console.log(listName);
  dataList = localStorage.getItem("last list");
  dataCat = localStorage.getItem("categories");
  dataProd = localStorage.getItem("products");
  localStorage.setItem(listName, dataList);
  localStorage.setItem(listName + "cat", dataCat);
  localStorage.setItem(listName + "prod", dataProd);

  getTheListName();
  saveLists();

  alert(listName + " enregistrée dans le localstorage");
});

// Listes sauvegardées

saveLists();
function getTheListName() {
  // allSavedList = JSON.parse(localStorage.getItem("saved"));
  console.log("399", allSavedList);
  let val = input.value;
  let toAdd = {
    name: val,
  };
  console.log(toAdd);
  if (val.length >= 1) {
    allSavedList.push(toAdd);

    allSavedList = JSON.stringify(allSavedList);
    localStorage.setItem("saved", allSavedList);
  }
}
function saveLists() {
  allSavedList = JSON.parse(localStorage.getItem("saved"));
  console.log("403", allSavedList);
  // allSavedList = [...allSavedList];
  savedList.innerHTML = `<option value="">Listes sauvegardées</option>`;
  allSavedList.forEach(
    (el) =>
      (savedList.innerHTML += `<option value=${el.name}>${el.name} </option> `)
  );
}
function getList(e) {
  console.log("choix", e.target.value);
  let listToGet = e.target.value;
  dataList = localStorage.getItem(listToGet);
  dataCat = localStorage.getItem(listToGet + "cat");
  dataProd = localStorage.getItem(listToGet + "prod");
  localStorage.setItem("last list", dataList);
  localStorage.setItem("categories", dataCat);
  localStorage.setItem("products", dataProd);
  window.location.reload();
}

function useLastList() {
  console.log("coucu");
}
function createNewList() {
  // dataCat = [];
  // dataProd = [];
  // dataList = [];
  // localStorage.setItem("last list", dataList);
  // localStorage.setItem("categories", dataCat);
  // localStorage.setItem("products", dataProd);
  // localStorage.removeItem("last list");
  // localStorage.removeItem("categories");
  // localStorage.removeItem("products");

  window.location.reload();
}
