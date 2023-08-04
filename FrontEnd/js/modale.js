// Attend que le document soit prêt
document.addEventListener("DOMContentLoaded", function () {
// Cibler l'élément bouton pour ouvrir le modal
let btns = document.querySelectorAll(".btnModifier");

// Cibler l'élément modal
let modal = document.querySelector("#modal1");

// Cibler l'élément de fermeture (la croix)
let close = document.querySelector(".js-modal-close");

// Fonction pour ouvrir le modal
function openModal() {
  modal.style.display = "block";
  console.log(works);

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
  close.addEventListener("click", closeModal);
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

  