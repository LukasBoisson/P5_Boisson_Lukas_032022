// récupération de l'id et de l'URL
const urlId = window.location.search;
const urlSearchParams = new URLSearchParams(urlId);
const id = urlSearchParams.get("id");

//selecteurs pour les infos à ajouter
let productImg = document.querySelector(".item__img");
let img = document.createElement("img");
productImg.appendChild(img);
let productName = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");

let color = document.getElementById("colors");

//affichage des infos du produit sur la page produit en fonction de son id
fetch("http://localhost:3000/api/products/" + id)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then((product) => {
    productName.innerHTML = product.name;
    productPrice.innerHTML = product.price;
    productDescription.innerHTML = product.description;
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);

    //boucle pour les couleurs du produit
    for (let i = 0; i < product.colors.length; i++) {
      color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }
  })

  .catch((err) => {
    console.log(err);
  });
