// pseudo code :
// un jeu de dé avec 2 joueurs. Joueur 1 lance le dé. Si dé différent de 1 le score s'accumule
// pour lui jusqu'a ce qu ils sauvent son score.
// dans l autre cas, c est à l'adversaire (joueur2) de jouer. Je dois faire un booléen quand les joueurs jouent
// quand joueur 1 joue, joueur 2 est false, quand joueur 2 joue il est true.
// je dois déterminer le comportement de l'autre joueur
// quand le score final est egal a sup a 100 pour l un des 2 le jeu est gagné.
// il faut déterminer la variable donnant un nombre aleatoire entre 1 et 6
// il faut lier cette variable aux images du dé pour qu'elle s'affiche
// 1 addEventListener pour chaque bouton btn play btn hold et btn new game
// quand je fais newgame tout doit etre mis à Zéro (score temporaire, score sauvé)

let roundScore;
let score;
let adversaire;
let debutJeu;
let sound = new Audio("success.mp3");
let images = [
  "dice-1.png",
  "dice-2.png",
  "dice-3.png",
  "dice-4.png",
  "dice-5.png",
  "dice-6.png",
];

// création d'une action quand je clique sur nouveau jeu
document.querySelector(".btn-new").addEventListener("click", nouveauJeu);

function nouveauJeu() {
  score = [0, 0];
  adversaire = 0;
  roundScore = 0;
  debutJeu = true;

  document.querySelector(".imageD").style.display = "none";
  document.querySelector("#score-0").textContent = "-";
  document.querySelector("#score-1").textContent = "-";
  document.querySelector("#temporaire-0").textContent = "-";
  document.querySelector("#temporaire-1").textContent = "-";
  document.querySelector("#nomJ-0").textContent = "Joueur 1";
  document.querySelector("#nomJ-1").textContent = "Joueur 2";
}

nouveauJeu();

document.querySelector(".btn-play").addEventListener("click", function () {
  if (debutJeu) {
    // variable donnant un nombre aleatoire
    let nombreAleatoire = Math.floor(Math.random() * 6);
    console.log(nombreAleatoire);

    //afficher le dé en relation avec nombreAleatoire
    let afficheDe = document.querySelector(".imageD");
    afficheDe.style.display = "block";
    document
      .querySelector(".imageD")
      .setAttribute("src", images[nombreAleatoire]);

    //si dé différent de 1 je joue sinon c'est à l'autre joueur
    if (nombreAleatoire !== 0) {
      roundScore += nombreAleatoire + 1;
      document.querySelector("#temporaire-" + adversaire).textContent =
        roundScore;
    } else {
      autreJoueur();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (debutJeu) {
    // mon score temporaire devient définitif
    score[adversaire] += roundScore;
    document.querySelector("#score-" + adversaire).textContent =
      score[adversaire];

    // si le joueur fait 100 ou plus gagne le jeu
    if (score[adversaire] >= 100) {
      sound.play();
      document.querySelector("#nomJ-" + adversaire).textContent = "Gagné!";
      gamePlaying = false;
    } else {
      autreJoueur();
    }
  }
});

function autreJoueur() {
  // j'utilise une condition ternaire pour remplacer un if else
  adversaire === 0 ? (adversaire = 1) : (adversaire = 0);
  roundScore = 0;
  document.querySelector("#temporaire-0").textContent = "-";
  document.querySelector("#temporaire-1").textContent = "-";
  document.querySelector(".imageD").style.display = "none";
}
