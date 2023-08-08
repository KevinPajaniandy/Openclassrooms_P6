// Attend que le document soit prêt
document.addEventListener("DOMContentLoaded", function () {
// Cibler l'élément bouton pour ouvrir le modal
let btns = document.querySelectorAll(".btnModifier");

// Cibler l'élément modal
let modal = document.querySelector("#modal1");

// Cibler l'élément de fermeture (la croix)
let closes = document.querySelectorAll(".js-modal-close");

// Fonction pour ouvrir le modal
function openModal() {
  modal.style.display = "block";

// Sélectionne l'élément où les projets seront affichés.
const projetsModal = modal.querySelector(".projets-modal"); 

// Vide le contenu actuel de la zone où les projets seront affichés.
projetsModal.innerHTML = ""; 

// Boucle à travers chaque projet et crée un élément "figure" pour l'affichage.
works.forEach((project) => {
// Appelle la fonction "createFigure" pour chaque projet.
const figure = createFigure(project);
// Afficher le projet
projetsModal.appendChild(figure); 
    });
  }

  // Coder une fonction que me cree un element figure comme suit 
function createFigureModale(work){
  // On crée un élément HTML de type figure
    const figure = document.createElement('figure');
    figure.setAttribute("id", "figureModale"+work.id);
  // On crée un élément HTML de type img et on lui attribue sa source et un texte alternatif
    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt=work.title;
      // On crée un élément HTML de type figcaption pour le titre de l'image et on lui attribue le texte de la légende
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = "editer";
  // On ajoute l'élément img à l'élément figure
    figure.appendChild(img);
  // On ajoute l'élément figcaption à l'élément figure
    figure.appendChild(figcaption);

    //Ajouter l'icon trash et aussi un action listener dnas lequel tu affiche l'id de l'element

    return figure;
}

// Fonction pour fermer le modal
function closeModal() {
    modal.style.display = "none";
  }
// Pour chaque bouton de la liste btns on va ajouter un listener pour ouvrir la modale
btns.forEach((element) => {
// Ouvrir le modal lorsqu'on clique sur le bouton
  element.addEventListener("click", openModal);
  });
// Fermer le modal lorsqu'on clique sur la croix
closes.forEach(close => {
  close.addEventListener("click", closeModal);
});
 
// Fermer le modal lorsqu'on clique en dehors de celui-ci (sur le fond semi-transparent)
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
});

// Afficher la seconde partie de la modale :
  // Récupération de l'élément HTML du bouton "Ajouter une photo"
  const addPhotoButton = document.querySelector('.add-photo');
  // Récupération de l'élément HTML de la fenêtre modale pour ajouter un projet
  const modalAddProject = document.querySelector('#js-modal-add-project');
  // Ajout d'un gestionnaire d'événement pour empêcher la propagation de l'événement de clic sur la fenêtre modale
  modalAddProject.addEventListener('click', function (e) {
    e.stopPropagation();
  });
  // Récupération de l'élément HTML de la première fenêtre modale
  const firstModal = document.querySelector('#js-modal-first');
  // Ajout d'un gestionnaire d'événement pour afficher la fenêtre modale pour ajouter un projet lorsqu'on clique sur le bouton "Ajouter une photo"
  addPhotoButton.addEventListener('click', function () {
    modalAddProject.style.display = null;
    firstModal.style.display = 'none';
  });


// Fonction pour fermer la deuxième modal
function closeSecondModal() {
  modalAddProject.style.display = "none";
  firstModal.style.display = "flex"; // Réafficher la première modal
}

// Récupération de l'élément de retour à la première modal
const returnToFirstModalButton = modalAddProject.querySelector(".js-modal-return");
// Ajout d'un gestionnaire d'événement pour retourner à la première modal
returnToFirstModalButton.addEventListener("click", closeSecondModal);

// Coder une fonction pour le fetch avec delete et une autre pour fetch en post 