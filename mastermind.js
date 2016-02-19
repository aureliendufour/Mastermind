var newPlateau = new Array(12,10);
var premiereCaseReponse = 6;
var caseDisable = [];
var premiereLigneVisible = true;

var couleurDispo = ["red","yellow","green","blue","orange","white","purple","fuchsia"];

var emplacementCouleurAdeviner = [];
var couleurAdeviner = [];
var couleurBouton;


var nbEssai = 0;
var triche = false;

init();

function init(){
  premiereCaseDeChaqueLigne = 0;

  /* Génération du plateau de jeu */
  for (var i = 1; i < newPlateau[0]; i++) {
    $(".plateau").append("<tr>");
    $("tr").css("height", "5px");

    for (var j = 0; j < newPlateau[1]; j++) {
      $(".plateau").append("<td></td>");
      $("td").css({borderColor: "black", borderStyle: "solid" , boderWidth :"1px", width :"10px", height:'10px'});
      $("td").eq(j+premiereCaseDeChaqueLigne).css("background-color", "rgb(188,148,46)");
      $("td").eq(j+premiereCaseDeChaqueLigne).hide();

      if (premiereLigneVisible == true) {
        $("td").eq(j+premiereCaseDeChaqueLigne).show();
      }

      if (j>3) {
        $("td").eq(j+premiereCaseDeChaqueLigne).css("background-color","rgb(188,124,46)");
        caseDisable.push(j+premiereCaseDeChaqueLigne);
      }

      if (j==4) {
        $("td").eq(j+premiereCaseDeChaqueLigne).css("background-color","rgb(102,51,00)");
        $("td").eq(j+premiereCaseDeChaqueLigne).css("visibility","hidden");
      }

      if (j==5) {
        $("td").eq(j+premiereCaseDeChaqueLigne).css("background-color","rgb(102,51,00)");
        $("td").eq(j+premiereCaseDeChaqueLigne).css("visibility","hidden");
      }
    }
    premiereLigneVisible = false;
    premiereCaseDeChaqueLigne +=newPlateau[1];
  }

  /* Sauvegarde de la couleur de jeu */
  saveCouleurCaseReponse = $("td").eq(6).css("backgroundColor");
  saveCouleurCaseJoueur = $("td").eq(1).css("backgroundColor");

  /* Calcule de la position des couleurs à deviner */
  emplacementCouleurAdeviner.push($("td").length-4);
  emplacementCouleurAdeviner.push($("td").length-3);
  emplacementCouleurAdeviner.push($("td").length-2);
  emplacementCouleurAdeviner.push($("td").length-1);

  /* Lancement du jeu avec des couleurs aléatoires */
  for (var i = 0; i < couleurDispo.length; i++) {
      random = Math.floor(Math.random() * (7 - 0 +1));
      $("td").eq(emplacementCouleurAdeviner[0]+i).css("background-color",""+couleurDispo[random]+"");
  }

  start();
}

function start(){
  premiereCaseDeChaqueLigne = 0;
  premiereCaseDeChaqueLigneBis = 0;
  $(".choix").hide();

  /* Permet l'affichage de la couleur choisie sur la case voulu */
  $("td").on('click',function(){
    $(this).css("background-color",""+couleurBouton+"");
  });

  $(":button").on('click',function(){
      disable();//Désactive la partie du plateau réponse

      /* Permet la correction d'un bug de couleur permettant d'obtenir la couleur "grise" */
      if ($(this).val() != "valider" && $(this).val() != "triche"
          && $(this).val() != "show" && $(this).val() != "hide"){
        couleurBouton = $(this).css("backgroundColor");//Récupère la couleur du bouton selectionné
      }


      if ($(this).val() == "restart"){
        location.reload();
      }

      if ($(this).val() == "triche"){
        triche = !triche;
        if (triche) {
          $("input[value='show']").show();
        }

        else {
          $("input[value='show']").hide();
          $("input[value='hide']").hide();
        }
        $(".resultat").text("Tricheur !");
      }

      if ($(this).val() == "show"){
        $(".choix").show();
        $("input[value='hide']").show();
        $(this).hide();
      }

      if ($(this).val() == "hide"){
        $(".choix").hide();
        $("input[value='show']").show();
        $(this).hide();
      }

      if ($(this).val() == "valider"){
        validation = 0;
        for (var i = 0; i < 4 ; i++) {
          if ($("td").eq(i+premiereCaseDeChaqueLigneBis).css("backgroundColor") === saveCouleurCaseJoueur ){
          }

          else {
            validation +=1;
          }
        }

        if (validation == 4) {
          for (var j = 0; j < 4 ; j++) {
            $("td").eq(j+premiereCaseDeChaqueLigneBis+newPlateau[1]).show();
            $("td").eq(j+premiereCaseDeChaqueLigneBis+newPlateau[1]+4).show();//Obligé sinon bug !
            $("td").eq(j+premiereCaseDeChaqueLigneBis+newPlateau[1]+6).show();
          }
          premiereCaseDeChaqueLigneBis+=newPlateau[1];
          verification();
        }
      }

  });
}

function verification(){
  var reponseRouge = [];//Tableau des réponses justes
  var reponseBlanc = [];//Tableau des réponses approximatives

  /* Couleur à deviner */
  aDeviner();

  /* Calcule des bonnes réponses pour chaque couleurs posées */
  if ($("td").eq(0+premiereCaseDeChaqueLigne).css("backgroundColor") === $("td").eq(emplacementCouleurAdeviner[0]).css("backgroundColor")){
      reponseRouge.push(0+premiereCaseDeChaqueLigne);
      couleurAdeviner.splice($.inArray($("td").eq(0+premiereCaseDeChaqueLigne).css("backgroundColor"),couleurAdeviner),1);
  }

  if ($("td").eq(1+premiereCaseDeChaqueLigne).css("backgroundColor") === $("td").eq(emplacementCouleurAdeviner[1]).css("backgroundColor")){
      reponseRouge.push(1+premiereCaseDeChaqueLigne);
      couleurAdeviner.splice($.inArray($("td").eq(1+premiereCaseDeChaqueLigne).css("backgroundColor"),couleurAdeviner),1);

  }

  if ($("td").eq(2+premiereCaseDeChaqueLigne).css("backgroundColor") === $("td").eq(emplacementCouleurAdeviner[2]).css("backgroundColor")){
      reponseRouge.push(2+premiereCaseDeChaqueLigne);
      couleurAdeviner.splice($.inArray($("td").eq(2+premiereCaseDeChaqueLigne).css("backgroundColor"),couleurAdeviner),1);
  }

  if ($("td").eq(3+premiereCaseDeChaqueLigne).css("backgroundColor") === $("td").eq(emplacementCouleurAdeviner[3]).css("backgroundColor")){
      reponseRouge.push(3+premiereCaseDeChaqueLigne);
      couleurAdeviner.splice($.inArray($("td").eq(3+premiereCaseDeChaqueLigne).css("backgroundColor"),couleurAdeviner),1);
  }

  /* Calcule des bonnes réponses approximatives (Si le joueur a posé une couleur mais à la mauvaise place */
  if ($.inArray($("td").eq(0+premiereCaseDeChaqueLigne).css("backgroundColor"),couleurAdeviner) != -1){
    reponseBlanc.push(0+premiereCaseDeChaqueLigne);
    couleurAdeviner.splice($.inArray($("td").eq(0+premiereCaseDeChaqueLigne).css("backgroundColor"),couleurAdeviner),1);
  }

  if ($.inArray($("td").eq(1+premiereCaseDeChaqueLigne).css("backgroundColor"),couleurAdeviner) != -1 ){
    reponseBlanc.push(1+premiereCaseDeChaqueLigne);
    couleurAdeviner.splice($.inArray($("td").eq(1+premiereCaseDeChaqueLigne).css("backgroundColor"),couleurAdeviner),1);
  }

  if ($.inArray($("td").eq(2+premiereCaseDeChaqueLigne).css("backgroundColor"),couleurAdeviner) != -1){
    reponseBlanc.push(2+premiereCaseDeChaqueLigne);
    couleurAdeviner.splice($.inArray($("td").eq(2+premiereCaseDeChaqueLigne).css("backgroundColor"),couleurAdeviner),1);
  }

  if ($.inArray($("td").eq(3+premiereCaseDeChaqueLigne).css("backgroundColor"),couleurAdeviner) != -1){
    reponseBlanc.push(3+premiereCaseDeChaqueLigne);
    couleurAdeviner.splice($.inArray($("td").eq(3+premiereCaseDeChaqueLigne).css("backgroundColor"),couleurAdeviner),1);
  }

  //Ajout des couleurs des réponses fausses
  for (var l = 0; l < 4 ; l++) {
    if ($("td").eq(l+premiereCaseDeChaqueLigne+ premiereCaseReponse).css("backgroundColor") === saveCouleurCaseReponse ){
        $("td").eq(l+premiereCaseDeChaqueLigne+ premiereCaseReponse).css("background-color", "rgb(51,0,0)");
      }
    $("td").eq(l+premiereCaseDeChaqueLigne).off();
  }

  //Ajout des couleurs des réponses approximatives
  for (var k = 0; k < reponseBlanc.length ; k++) {
    $("td").eq(reponseBlanc[k]+ premiereCaseReponse).css("background-color", "rgb(254,255,255)");
  }

  //Ajout des couleurs des bonnes réponses
  for (var j = 0; j < reponseRouge.length ; j++) {
    $("td").eq(reponseRouge[j]+premiereCaseReponse).css("background-color", "rgb(202,15,18)");
  }

  premiereCaseDeChaqueLigne +=newPlateau[1];//On passe à la ligne suivante
  couleurAdeviner = [] ;//Réinitialisation du tableau
  nbEssai++;

  if (reponseRouge.length == 4) {
    if (nbEssai != newPlateau[0]-1 ) {
      $(".choix").show();
      $(".resultat").text("Bravo !Vous avez trouvé en "+nbEssai+" essai(s)");
      $(".text").hide();
      $("td").off();
      $(".bouton").hide();
      $("input[value='valider']").hide();
      $("input[value='triche']").hide();
      $("input[value='show']").hide();
      $("input[value='hide']").hide();

    }
  }

  if (reponseRouge.length != 4) {
    if (nbEssai == newPlateau[0]-1 ) {
      $(".choix").show();
      $(".resultat").text("Vous avez perdu :'(");
      $(".text").hide();
      $("td").off();
      $(".bouton").hide();
      $("input[value='valider']").hide();
      $("input[value='triche']").hide();
      $("input[value='show']").hide();
      $("input[value='hide']").hide();

    }
  }
}

function aDeviner(){
  /* Variable permettant la vérification des couleurs à deviner */
  couleurAdeviner.push($("td").eq(emplacementCouleurAdeviner[0]).css("backgroundColor")); //Premier couleur à deviner
  couleurAdeviner.push($("td").eq(emplacementCouleurAdeviner[1]).css("backgroundColor")); //Deuxieme couleur à deviner
  couleurAdeviner.push($("td").eq(emplacementCouleurAdeviner[2]).css("backgroundColor")); //Troisieme couleur à deviner
  couleurAdeviner.push($("td").eq(emplacementCouleurAdeviner[3]).css("backgroundColor")); //Quatrième couleur à deviner
}

function disable(){
  for (var i = 0; i < caseDisable.length; i++) {
    $("td").eq(caseDisable[i]).off();
  }
}
