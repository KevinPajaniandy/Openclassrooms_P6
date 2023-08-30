// declaration des variables globaux 
let works =[];
let categoriesWorks =[ {
  "id": 0,
  "name": "Tous"
}];


checkIfConnected();
loadFilters();
loadProjects();

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
        data.forEach(element => {
          categoriesWorks.push(element);
        });
        createFilters(categoriesWorks);
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

  // Cette fonction prend un paramètre tableau d'éléments.
function createFilters(tableauFilter){
  // On sélectionne un élément du document ayant la classe CSS "filters" et on le stocke dans la variable "filters".
  const filters = document.querySelector(".filters");
  // on selectionne le composant select
  const select = document.getElementById("categories");
  // On vide le contenu de l'élément "filters". Cela effacera tous les éléments enfants qu'il contient.
  filters.innerHTML="";
  select.innerHTML="";
  // On utilise une boucle forEach pour parcourir chaque élément du tableau "tableauFilter".
  tableauFilter.forEach(element => {
  // On affiche chaque élément du tableau dans la console.
  console.log(element)
  // On appelle une fonction appelée "createFilter" avec l'élément actuel en tant qu'argument. Le résultat de cette fonction est stocké dans une variable appelée "filter".
  const filter = createFilter(element);
  // On ajoute l'élément "filter" en tant qu'enfant de l'élément "filters". Cela placera l'élément "filter" à l'intérieur de l'élément "filters".
  filters.appendChild(filter);

  if(element.id!=0){
  // On appelle une fonction appelée "createslectCategorie" avec l'élément actuel en tant qu'argument. Le résultat de cette fonction est stocké dans une variable appelée "option".
  const option = createOption(element);
  // On ajoute l'élément "option" en tant qu'enfant de l'élément "select".
  select.appendChild(option);
}
  });
}

// Coder une fonction que me cree un element figure comme suit 
function createFigure(work){
  // On crée un élément HTML de type figure
    const figure = document.createElement('figure');
    figure.setAttribute("id", "figure"+work.id);
  // On crée un élément HTML de type img et on lui attribue sa source et un texte alternatif
    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt=work.title;
      // On crée un élément HTML de type figcaption pour le titre de l'image et on lui attribue le texte de la légende
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = work.title;
    figcaption.className ="figcaptionIndex"
  // On ajoute l'élément img à l'élément figure
    figure.appendChild(img);
  // On ajoute l'élément figcaption à l'élément figure
    figure.appendChild(figcaption);

    return figure;
}

function createOption(categorie){
  const option = document.createElement("option");
  option.value = categorie.id;
  option.text = categorie.name;
  return option;
}
function createFilter(categorie) {
// On crée un bouton pour le filtre et on lui attribue le nom de la catégorie de travaux

// Crée un nouvel élément HTML de type "div" et l'assigne à la variable "button".
  const button = document.createElement("div");
  // Attribue le texte contenu dans la propriété "name" de l'objet "categorie" à la propriété "textContent" de l'élément "button".
  button.textContent = categorie.name;
  // Attribue la valeur de la propriété "id" de l'objet "categorie" à la propriété "id" de l'élément "button".
  button.id = categorie.id;
  // Ajoute la classe CSS "filter" à l'élément "button".
  button.className="filter";
// On ajoute un événement de clic sur le bouton pour filtrer les travaux correspondant à la catégorie sélectionnée
  button.addEventListener("click", () => {
 // On ajoute la classe 'button-selected' au bouton sélectionné
  resetFilters(categorie.id);
  if(categorie.id == 0){
    createProjects(works);
  }
  else{

    // trouver la nouvelle liste filtré depuis la liste des projets globale
 const listFilter= works.filter((work)=>(work.categoryId == categorie.id)); 
 // resultat : actualiser l'affichage par la nouvelle liste filtré
 createProjects(listFilter);

  }
 
  });

  return button;
}

function resetFilters(categorieId){
  const listFilters = document.querySelectorAll('.filter');
  listFilters.forEach(element => {
    if(element.id == categorieId)
    {
      element.classList.add('button-selected');
    }
    else{
    element.classList.remove('button-selected');
  }
  });
}
function checkIfConnected(){
// Si l'utilisateur est connecté
if (localStorage.getItem('token')) {
// afficher la barre noir
// afficher les bouton modifier 
// afficher le lien logout dans le menu et cacher celui de login
const login = document.getElementById("login");
login.style.display = "none";
const logout = document.getElementById("logout");
logout.style.display = "block";
// cacher les filtres 
const filtres = document.querySelector(".filters");
filtres.style.display = "none";
// cacher la barre noir 
const barreNoir = document.querySelector(".barreNoir")
barreNoir.style.display = "flex";
// cacher les boutons modifier
const btnsModifier = document.querySelectorAll(".btnModifier")
btnsModifier.forEach(element => {
  element.style.display = "Block";
});
}
else {
  // cacher le lien logout dans le menu et afficher celui de login
const login = document.getElementById("login");
login.style.display = "block";
const logout = document.getElementById("logout");
logout.style.display = "none";
// afficher les filtres 
const filtres = document.querySelector(".filters");
filtres.style.display = "flex";
// afficher la barre noire 
const barreNoir = document.querySelector(".barreNoir")
barreNoir.style.display ="none";
// cacher les boutons modifier
const btnsModifier = document.querySelectorAll(".btnModifier")
btnsModifier.forEach(element => {
  element.style.display = "none";
});
}
}
// Lorsque l'utilisateur clique sur "logout", il se déconnecte.
const displayLogout = document.getElementById("logout");
// Ajoute un écouteur d'événement "click" à l'élément "displayLogout".
displayLogout.addEventListener("click",() =>{
  // Supprime l'élément "token" stocké dans le localStorage du navigateur.
  window.localStorage.removeItem("token");
  // redirect to offline homepage
  window.location.href = "/FrontEnd/index.html";
});
 
