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
      const figure = createFigureModale(project);
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
  closes.forEach((close) => {
    close.addEventListener("click", closeModal);
  });

  // Fermer le modal lorsqu'on clique en dehors de celui-ci (sur le fond semi-transparent)
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
});


  // Coder une fonction que me cree un element figure comme suit
  function createFigureModale(work) {
    // On crée un élément HTML de type figure
    const figure = document.createElement("figure");
    figure.setAttribute("id", "figureModale" + work.id);
    // On crée un élément HTML de type img et on lui attribue sa source et un texte alternatif
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    // On crée un élément HTML de type figcaption pour le titre de l'image et on lui attribue le texte de la légende
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = "éditer";
    figcaption.className = "editer";
    //Ajouter l'icon trash et aussi un action listener dnas lequel tu affiche l'id de l'element
    // Crée un élément HTML de type i pour l'icône de suppression
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt delete-icon";
    // Ajoute un gestionnaire d'événement pour la suppression lorsque l'icône est cliquée
    deleteIcon.addEventListener("click", function () {
      const value = confirm(
        "Etes vous sur de bien vouloir supprimer le projet de numero:" +
          work.id +
          " ?"
      );
      if (value) {
        // Appelle une fonction de suppression en utilisant l'ID de l'élément work
        deleteWork(work.id);
      }
    });
    // On ajoute l'élément img à l'élément figure
    figure.appendChild(img);
    // On ajoute l'élément figcaption à l'élément figure
    figure.appendChild(figcaption);
    // On ajoute l'élément sdeleteIcon à l'élément figure
    figure.appendChild(deleteIcon);

    return figure;
  }
// Afficher la seconde partie de la modale :
// Récupération de l'élément HTML du bouton "Ajouter une photo"
const addPhotoButton = document.querySelector(".add-photo");
// Récupération de l'élément HTML de la fenêtre modale pour ajouter un projet
const modalAddProject = document.querySelector("#js-modal-add-project");
// Ajout d'un gestionnaire d'événement pour empêcher la propagation de l'événement de clic sur la fenêtre modale
modalAddProject.addEventListener("click", function (e) {
  e.stopPropagation();
});
// Récupération de l'élément HTML de la première fenêtre modale
const firstModal = document.querySelector("#js-modal-first");
// Ajout d'un gestionnaire d'événement pour afficher la fenêtre modale pour ajouter un projet lorsqu'on clique sur le bouton "Ajouter une photo"
addPhotoButton.addEventListener("click", function () {
  modalAddProject.style.display = null;
  firstModal.style.display = "none";
});

// Fonction pour fermer la deuxième modal
function closeSecondModal() {
  modalAddProject.style.display = "none";
  firstModal.style.display = "flex"; // Réafficher la première modal
}

// Récupération de l'élément de retour à la première modal
const returnToFirstModalButton =
  modalAddProject.querySelector(".js-modal-return");
// Ajout d'un gestionnaire d'événement pour retourner à la première modal
returnToFirstModalButton.addEventListener("click", closeSecondModal);

// Coder une fonction pour le fetch avec delete et une autre pour fetch en post

function deleteWork(workId) {
  const token = localStorage.getItem("token"); // Récupérer le jeton d'accès
  fetch("http://localhost:5678/api/works/" + workId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Ajouter le jeton d'accès à l'en-tête
    },
  })
    .then(function (response) {
      // element supprimer
      if (response.status == 204) {
        // proceder à :
        //1/ mettre à jour le tableau global
        console.log(works);
        works = works.filter((element) => element.id != workId);
        console.log(works);

        //2/Agir sur les figures de la page index et enlever l'element supprimeé depuis le dom
        document.getElementById("figure" + workId).remove();
        //3/Eliminer aussi l'element supprimer depuis le dom
        document.getElementById("figureModale" + workId).remove();
      }
      if (response.status == 401) {
        alert(
          "Veuillez vous authentifier de nouveau! votre token est expiré !"
        );
      }
    })
    .catch(function (error) {
      console.log("Erreur lors de la suppression : " + error.message);
    });
}

function removeImage() {
  const image = document.getElementById("imgPreview");
  const imageFormDisplay = document.querySelector(".imageFormDisplay");
  const faimage = document.querySelector(".fa-image");
  const fileUpload = document.querySelector(".file-upload");
  const photoInput = document.querySelector("#photo-input");
  const fileFormat = document.querySelector(".fileFormat");

  imageFormDisplay.style.display = "none";
  faimage.style.display = "block";
  fileUpload.style.display = "block";
  photoInput.style.display = "none";
  fileFormat.style.display = "block";
  image.src = "";


}

// Récupérer l'élément d'upload de fichier
const inputFile = document.querySelector("#photo-input");
//-------
inputFile.addEventListener("change", changeImage);

function changeImage(e) {
  const image = document.getElementById("imgPreview");
  const imageFormDisplay = document.querySelector(".imageFormDisplay");
  const faimage = document.querySelector(".fa-image");
  const fileUpload = document.querySelector(".file-upload");
  const photoInput = document.querySelector("#photo-input");
  const fileFormat = document.querySelector(".fileFormat");
  const remove = document.querySelector(".remove");

  remove.addEventListener("click", function (event) {
    removeImage();
  });

  const file = e.target.files[0];

  if (file.type.match("image.*")) {
    if (file.size <= 4194304) {
      let reader = new FileReader();
      reader.onload = function (event) {
        image.src = event.target.result;
        imageFormDisplay.style.display = "flex";
        faimage.style.display = "none";
        fileUpload.style.display = "none";
        photoInput.style.display = "none";
        fileFormat.style.display = "none";
      };
      reader.readAsDataURL(file);
    } else {
      alert("Le fichier est de grande taille (max 4 Mo).");
      removeImage();
    }
  } else {
    alert("Le fichier sélectionné n'est pas une image.");
    removeImage();
  }
}

//==== remplacer selected-image par photo input
const imageInput = document.getElementById("photo-input");
const titleInput = document.getElementById("title-photo");
const categoriesInput = document.getElementById("categories");
const validerButton = document.getElementById("validerButton");
titleInput.addEventListener("input", validateForm);
categoriesInput.addEventListener("change", validateForm);

function validateForm() {
  const titleValid = titleInput.value.trim() !== "";
  const categoriesSelected = categoriesInput.value !== "";
  const image = imageInput.files[0];

  if ( image && titleValid && categoriesSelected) {
    validerButton.classList.add("green-button");
    return true;
  } else {
    validerButton.classList.remove("green-button");
    return false;
  }
}


document.querySelector(".modal-form").addEventListener("submit", function(e) {
  e.preventDefault();

  if (!validateForm()) {
    alert("Veuillez remplir tous les champs !");

  }else{
    const file = imageInput.files[0];
    const formData = new FormData();
    formData.append("title", titleInput.value);
    formData.append("image", file);
    formData.append("category", categoriesInput.value);

      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      }).then((response) =>{
        if (response.status ==201) {
          alert("Projet ajouté avec succès !");
          return response.json();
        }
        else {
          console.error("Erreur lors de l'ajout du projet:", response.status);
        }
      })
      .then((projet) => {
        if(projet){
          //Mettre à jour le tableau globale 
          works.push(projet);
          // AJouter le projet à la gallery sur index 
          const figure = createFigure(projet);
          document.querySelector(".gallery").appendChild(figure);
          // AJouter aussi le projet dnas la modale gallery
          const figureModale = createFigureModale(projet);
          document.querySelector(".projets-modal").appendChild(figureModale);
          // retourner sur modale gallery 
          returnToFirstModalButton.click();
        }
      })
       .catch( (error) =>{
        console.log("Erreur lors de la creation : " + error.message);
        alert("Une erreur est survenue lors de l'ajout!");
      });

      
      } 
    
  });



