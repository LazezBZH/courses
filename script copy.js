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

let list;
let listSet = [];

const clear = document.getElementById("clear");

clear.addEventListener("click", clearList);

function clearList() {
  localStorage.removeItem("last list");
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
let dataCat = JSON.parse(localStorage.getItem("categories")) || [];
let dataProd = JSON.parse(localStorage.getItem("products")) || [];
function setCategories() {
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

        // data.forEach(function (element) {
        //   (category.innerHTML += `<option value=${element.value} >${element.name}</option>`),
        //     (categoryForAdd.innerHTML += `<option value=${element.value} >${element.name}</option>`),
        //     (resultUl.innerHTML += `<li >${element.name}<ul  class="toSort" id= ${element.value}></ul></li>`);
        // });
        // window.location.reload();
        setCategories();
      });
  } else {
    dataCat = JSON.parse(localStorage.getItem("categories"));
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
        (resultUl.innerHTML += `<li>${
          element.name
        } <button class="sup-cat" data-id=${element.value.replace(
          /[^a-zA-Z0-9éèêêàïôù]/g,
          "*"
        )}>Sup catég</button><ul class="toSort" id= ${element.value.replace(
          /[^a-zA-Z0-9éèêêàïôù]/g,
          "*"
        )}></ul></li>`);
    });
  }
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
  products.innerHTML = `<option value="0" >Choisissez</option>`;
  if (!localStorage.getItem("products")) {
    fetch("/data/products.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data = data.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
        dataProd = JSON.stringify(data);

        localStorage.setItem("products", dataProd);

        let prod = data.filter((dat) => dat.id == categoryName);
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
      });
  }
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
  if (val.length >= 1) {
    dataCat.push(toAdd);

    dataCat = JSON.stringify(dataCat);
    localStorage.setItem("categories", dataCat);
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
  list = JSON.parse(localStorage.getItem("last list")) || [];

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
  list = JSON.parse(localStorage.getItem("last list"));

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

  resultProds = resultUl.querySelectorAll("li");
  resultProds.forEach(
    (resultP) => (
      (resultProdUl = resultP.querySelector("ul")),
      console.log(resultProdUl),
      (thisid = resultProdUl.getAttribute("id")),
      (listSetFilter = listSet.filter(
        (listItem) => listItem.thisid === thisid
      )),
      (resultProd = document.getElementById(thisid)),
      (resultProd.innerHTML = ""),
      listSetFilter.forEach((product) =>
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
  localStorage.setItem(listName, dataList);
  alert(listName + " enregistrée dans le localstorage");
});
