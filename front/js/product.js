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
          productName: product.name,
          productPrice: product.price,
          productDescription: product.description,
          productColor: chosenColor,
          productQuantity: Number(chosenQuantity),
          productImage: product.imageUrl,
          productImageAlt: product.altTxt,
        };

        const cartArray = [];

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
      } else if (chosenQuantity <= 0) {
        alert("Veuillez choisir une quantité comprise entre 1 et 100.");
      } else if (chosenColor === "" || chosenColor === null) {
        alert("Veuillez choisir une couleur.");
      }
    });
  })

  .catch((err) => {
    console.log(err);
  });
