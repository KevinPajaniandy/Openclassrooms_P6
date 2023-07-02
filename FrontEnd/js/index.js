// declaration des variables globaux 
let works =[];

// Charger les projet depuis l'api 
function loadProjects(){
fetch('http://localhost:5678/api/works')
.then(
    function(response) {
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
// Coder une fonction que me cree un element figure comme suit 
/* 
<figure>
    <img src="assets/images/hotel-first-arte-new-delhi.png" alt="Hotel First Arte - New Delhi">
    <figcaption>Hotel First Arte - New Delhi</figcaption>
</figure>
*/
function createFigure(work){
    const figure = document.createElement('figure');
    figure.setAttribute("id", work.id);
    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt=work.title;
    
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    return figure;
}
loadProjects();