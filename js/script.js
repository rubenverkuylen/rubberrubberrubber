"use strict";

const contHeader = document.querySelector("#container-header");
const contCont = document.querySelector("#container-content");
const mainItem = document.querySelectorAll(".main-item");
const contDisc = document.querySelector("#container-disc");
const contTijd = document.querySelector("#container-tijd");
const article = document.querySelectorAll(".article");
const discContent = document.querySelector("#discography-content");
const tijdContent = document.querySelector("#rubbertijd-content");
const section = document.querySelectorAll(".section");
const cover = document.querySelectorAll(".image-cover");
const links = document.getElementsByTagName("a");

const plTijd = document.querySelector("#playlist-tijd");
const plDisc = document.querySelector("#playlist-disc");
const playlistContainer = document.querySelectorAll(".playlist-container");
const mixCon = document.querySelector("#mix-container");
const bcIframe = document.getElementById("bc-player");
const allLinks = document.querySelectorAll(".link-track");
const allSCLinks = document.querySelectorAll(".sc-track");
const rndBtn = document.querySelector("#btn-random");
const widgetIframe = document.getElementById("sc-widget");
const loader = document.querySelectorAll(".loader");

// grow sections
// 1. main container
const growMain = function (e) {
  if (!this.classList.contains("grow") && this === contHeader) {
    contHeader.classList.toggle("grow");
    contCont.classList.toggle("grow");
    section.forEach((elem) => elem.classList.add("hide"));
    article.forEach((elem) => elem.classList.remove("grow"));
  }
  if (!this.classList.contains("grow")) {
    contHeader.classList.toggle("grow");
    contCont.classList.toggle("grow");
  }
};

// 2. article containers
const growArticle = function (e) {
  if (!this.classList.contains("grow") && this === contDisc) {
    this.classList.add("grow");
    this.nextElementSibling.classList.remove("grow");
    setTimeout(function () {
      discContent.classList.remove("hide");
    }, 200);
    tijdContent.classList.add("hide");
  }
  if (!this.classList.contains("grow") && this === contTijd) {
    this.classList.add("grow");
    this.previousElementSibling.classList.remove("grow");
    setTimeout(function () {
      tijdContent.classList.remove("hide");
    }, 200);
    discContent.classList.add("hide");
  }
};

// playlist and player functionalities
// Show player
const showPlayer = function (container) {
  if (container.classList.contains("visible")) return;
  document.getElementById(container.id).classList.add("visible");
};

// Discography/Bandcamp iframe loading
plDisc.addEventListener("click", function (e) {
  e.preventDefault();

  showPlayer(this.nextElementSibling);

  const updatedURL = e.target.getAttribute("trackid");
  bcIframe.src = `https://bandcamp.com/EmbeddedPlayer/album=${updatedURL}/size=small/bgcol=ffffff/linkcol=333333/artwork=none/transparent=true/`;
  widget.pause();
});

// RUBBERTIJD/Soundcloud iframe loading
plTijd.addEventListener("click", function (e) {
  if (e.target == plTijd) return;
  e.preventDefault();

  showLoader();

  showPlayer(this.nextElementSibling);

  const updatedURL = e.target.href;
  widget.load(updatedURL);

  // start player
  startPlayerOnLoad();
});

// random track
const randomTrack = function () {
  showLoader();
  document.getElementById("player-tijd").classList.remove("hide");

  const trackAr = [];
  allSCLinks.forEach((tr) => trackAr.push(tr));
  const randomNum = Math.floor(Math.random() * trackAr.length);
  widget.load(trackAr[randomNum].href);

  allSCLinks.forEach((tr) => tr.classList.remove("active"));
  trackAr[randomNum].classList.add("active");

  // start player
  startPlayerOnLoad();
};

// 1. Soundcloud start stop function
const startPlayerOnLoad = function () {
  const checkPlayerStatus = function () {
    if (SC.Widget.Events.READY) {
      widget.play();
      stopInterval();
      hideLoader();
    }
  };
  const stopInterval = function () {
    clearInterval(intervalPlayer);
  };
  const intervalPlayer = setInterval(checkPlayerStatus, 1000);
};

// 2. loaders
const hideLoader = function () {
  loader.forEach((loader) => loader.classList.add("hide"));
};
const showLoader = function () {
  loader.forEach((loader) => loader.classList.remove("hide"));
};

// make link active
const makeLinksActive = function (e) {
  if (e.target == plTijd) return;
  allLinks.forEach((tr) => tr.classList.remove("active"));
  e.target.classList.add("active");
};

// event listeners
contCont.addEventListener("click", growMain);
contHeader.addEventListener("click", growMain);
contDisc.addEventListener("click", growArticle);
contTijd.addEventListener("click", growArticle);
rndBtn.addEventListener("click", randomTrack);
playlistContainer.forEach((container) =>
  container.addEventListener("click", makeLinksActive)
);

// if reference error > "soundcloud cannot be reached at the moment"
const widget = SC.Widget(widgetIframe);
