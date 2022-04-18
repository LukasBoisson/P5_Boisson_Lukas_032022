// récupération de l'id et de l'URL
let urlId = window.location.search;
let urlSearchParams = new URLSearchParams(urlId);
let id = urlSearchParams.get("id");

//bouton ajouter au panier
let addToCartButton = document.querySelector("#addToCart");

//selecteurs pour les infos à ajouter
let productImg = document.querySelector(".item__img");
let img = document.createElement("img");
productImg.appendChild(img);
let productName = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let color = document.getElementById("colors");

//masque la valeur de la couleur par défaut
color[0].setAttribute("disabled", "");

//récupération et affichage des infos du produit sur la page produit en fonction de son id
fetch("http://localhost:3000/api/products/" + id)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then((product) => {
    document.title = product.name;
    productName.innerHTML = product.name;
    productPrice.innerHTML = product.price;
    productDescription.innerHTML = product.description;
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);

    //boucle pour les couleurs du produit
    for (let i = 0; i < product.colors.length; i++) {
      color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }
    // écoute du bouton pour stocker un produit
    addToCartButton.addEventListener("click", (e) => {
      const chosenColor = document.getElementById("colors").value;
      const chosenQuantity = document.getElementById("quantity").value;
      // le produit peut etre ajouté si il rempli les conditions de couleur et de quantité
      if (chosenQuantity > 0 && chosenQuantity <= 100) {
        const chosenProduct = {
          id: id,
          productColor: chosenColor,
          productQuantity: Number(chosenQuantity),
        };

        let cartArray = [];

        // vérifier si le localstorage contient des produits
        if (localStorage.getItem("cart")) {
          // si le localstorage contient des produits, mettre les produits dans le tableau
          cartArray = JSON.parse(localStorage.getItem("cart"));
          // et vérifier si un produit a le même id et la même couleur

          const idAndColorIndex = cartArray.findIndex(
            (i) =>
              chosenProduct.productColor === i.productColor &&
              chosenProduct.id === i.id
          );

          //si un produit a le même id et la même couleur, on modifie la quantité
          if (idAndColorIndex !== -1)
            cartArray[idAndColorIndex].productQuantity +=
              chosenProduct.productQuantity;
          //si un produit n'a pas le même id et la même couleur, on ajoute le produit
          else cartArray.push(chosenProduct);
        } else {
          cartArray.push(chosenProduct);
        }

        localStorage.setItem("cart", JSON.stringify(cartArray));
      } else {
        //si un produit n'a pas de quantité selectionnée on désactive le bouton addToCart
        addToCartButton.disabled = false;
      }
    });
  })

  .catch((err) => {
    console.log(err);
  });
