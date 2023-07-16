const category = document.getElementById("category");
const category0 = document.getElementById("category0");
const products = document.getElementById("products");
const add = document.getElementById("add");

let categoryName = "";
let productName = "";

let fruits = [];
let vegetable = [];
let salt = [];
let sugar = [];
let milk = [];

category.addEventListener("change", getCategory);
products.addEventListener("click", getProduct);
add.addEventListener("click", addProduct);

function addProduct() {}

function erase(e) {
  e.preventdefault();
  products.style.opacity = "0";
}

function getCategory(e) {
  categoryName = e.target.value;
  console.log(categoryName);
  if (categoryName == "0") {
    products.style.opacity = "0";
  } else {
    createProductsList();
    products.style.opacity = "1";
  }
}

function createProductsList() {
  let productsList = [];
  products.innerHTML = "";

  switch (categoryName) {
    case "fruits":
      productsList = ["Pommes", "Poires", "Bananes"];
      break;
    case "vegetable":
      productsList = ["Poireaux", "Carottes", "Choux"];
      break;
    case "salt":
      productsList = ["Sel", "Poivre", "Chips"];
      break;
    case "sugar":
      productsList = ["Coockies", "Confiture", "Sucre"];
      break;
    case "milk":
      productsList = ["Beurre", "Oeufs", "Crème"];
      break;
    default:
      console.log(`oups.`);
  }

  productsList.forEach(
    (product) =>
      (products.innerHTML += `<option value=${product} >${product}</option>`)
  );
  console.log(productsList);
  return productsList;
}

function getProduct(e) {
  productName = e.target.value;
  console.log(productName);
  return productName;
}
