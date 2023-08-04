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
    }
  
    // Fonction pour fermer le modal
    function closeModal() {
      modal.style.display = "none";
    }
  
    // poru chaque bouton de la list btns pn va ajouter un listener pour ouvrir la modale 
    btns.forEach(element => {
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
  