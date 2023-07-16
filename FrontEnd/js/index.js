// declaration des variables globaux 
let works =[];
let categoriesWorks =[];

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
       // console.table(data);
        categoriesWorks = data;
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

function createFilters(tableauFilter){
  const filters = document.querySelector(".filters");
  filters.innerHTML="";
  tableauFilter.forEach(element => {
      console.log(element)
      const filter = createFilter(element);
      filters.appendChild(filter);
  });
}

// Coder une fonction que me cree un element figure comme suit 
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
function createFilter(categorie) {

// On crée un bouton pour le filtre et on lui attribue le nom de la catégorie de travaux
  const button = document.createElement("div");
  button.textContent = categorie.name;
  button.id = categorie.id;
  button.className="filter";
// On ajoute un événement de clic sur le bouton pour filtrer les travaux correspondant à la catégorie sélectionnée
  button.addEventListener("click", () => {
// On affiche l'élément HTML filterContainer dans la console pour vérification
    console.log(categorie);

  });

  return button;
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
}
else{
  // cacher le lien logout dans le menu et afficher celui de login
const login = document.getElementById("login");
login.style.display = "block";
const logout = document.getElementById("logout");
logout.style.display = "none";
// afficher les filtres 
const filtres = document.querySelector(".filters");
filtres.style.display = "block";
}
}


 // Ajouter un bouton "Mode édition" avec un icône et un texte à la barre d'édition
 // coder la barre noir dans le html 
 // dans le js : basculer entre display block ou flex et display node pour afficher et cacher les element html 
/* const editorBar = document.createElement('div');
editorBar.className = 'editor-bar';
 editorBar.innerHTML = '<i class = \' fa-regular fa-pen-to-square \'></i> <p>Mode édition <span>publier les changements</span></p>';
 // Ajouter la barre d'édition au début du corps de la page
 document.body.prepend(editorBar);*/
 // Modifier le texte du bouton de connexion pour qu'il dise "Déconnexion"
 
 // Suppression de tous les filtres