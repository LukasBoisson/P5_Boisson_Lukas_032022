// Récupérer les données de l'api au format JSON et les afficher sur la page d'accueil

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then((products) => {
    for (data of products) {
      document.getElementById(
        "items"
      ).innerHTML += `<a href="./product.html?id=${data._id}">
              <article>
               <img src="${data.imageUrl}" alt="${data.altTxt}"/>
                 <h3 class="productName"> ${data.name}</h3>
                 <p class="productDescription"> ${data.description}</p>
             </article>
         </a>`;
    }
  })
  .catch((err) => {
    console.log(err);
  });
