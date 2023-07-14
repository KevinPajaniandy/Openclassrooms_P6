// declaration des variables globaux 
let works =[];
let cats =[];

// Charger les projet depuis l'API
function loadProjects(){
fetch('http://localhost:5678/api/works')
.then(function(response) {
        console.log(response);
        if(response.ok) {
            return response.json();
        }
  })
  .then(function (data) {
   // console.table(data);
    works = data;
    createProjects(works);
  })
  .catch(function(error) {
    console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
    alert("Une erreur est survenue ! Veuillez contacter l'administrateur! ");
  });
}

//Charger les filtres depuis l'API
function loadFilters(){
    fetch('http://localhost:5678/api/categories')
    .then(function(response) {
            console.log(response);
            if(response.ok) {
                return response.json();
            }
      })
      .then(function (data) {
       // console.table(data);
        cats = data;
        createFilters(cats);
      })
      .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
        alert("Une erreur est survenue ! Veuillez contacter l'administrateur! ");
      });
    }

// LA fonction qui boucle sur le tableau pour creer un element figure pour chaque element du tableau 
function createProjects(tableauProjet){
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML="";
    tableauProjet.forEach(element => {
        console.log(element)
        const figure = createFigure(element);
        gallery.appendChild(figure);
        
    });
}
// // LA fonction qui boucle sur le tableau pour creer un element div pour chaque element du tableau 
function createFilters(tableauFilter){
  const categories = document.querySelector(".categories");
  categories.innerHTML="";
  tableauFilter.forEach(element => {
      console.log(element)
      const div = creatediv(element);
      categories.appendChild(div);
  });
}

// Coder une fonction que me cree un element figure comme suit 
/* 
<figure>
    <img src="assets/images/hotel-first-arte-new-delhi.png" alt="Hotel First Arte - New Delhi">
    <figcaption>Hotel First Arte - New Delhi</figcaption>
</figure>
*/
function createFigure(work){
  // On crée un élément HTML de type figure
    const figure = document.createElement('figure');
    figure.setAttribute("id", work.id);
  // On crée un élément HTML de type img et on lui attribue sa source et un texte alternatif
    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt=work.title;
      // On crée un élément HTML de type figcaption pour le titre de l'image et on lui attribue le texte de la légende
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = work.title;
  // On ajoute l'élément img à l'élément figure
    figure.appendChild(img);
  // On ajoute l'élément figcaption à l'élément figure
    figure.appendChild(figcaption);

    return figure;
}
/*
function createFilter(cats){
    const div = document.createElement('div');
    figure.setAttribute("id", cats.id);
    
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);

    return figure;
}
*/

loadProjects();

