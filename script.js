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

const plTijd = document.querySelector("#playlist-tijd");
const plDisc = document.querySelector("#playlist-disc");
const mixCon = document.querySelector("#mix-container");
const bcIframe = document.getElementById("bc-player");
const allLinks = document.querySelectorAll(".sc-track");
const rndBtn = document.querySelector("#btn-random");
const widgetIframe = document.getElementById("sc-widget");
const widget = SC.Widget(widgetIframe);

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

// playlist
// BC reload iframe

plDisc.addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("player-disc").classList.remove("hide");
  const updatedURL = e.target.getAttribute("trackid");
  bcIframe.src = `https://bandcamp.com/EmbeddedPlayer/album=${updatedURL}/size=small/bgcol=ffffff/linkcol=333333/artwork=none/transparent=true/`;
  widget.pause();
});

// RUBBERTIJD reload iframe
plTijd.addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("player-tijd").classList.remove("hide");
  const updatedURL = e.target.href;
  widget.load(updatedURL);
  setTimeout(function () {
    widget.play();
  }, 500);
});

// random track
const randomTrack = function () {
  document.getElementById("player-tijd").classList.remove("hide");
  const trackAr = [];
  allLinks.forEach((tr) => trackAr.push(tr));
  const randomNum = Math.floor(Math.random() * trackAr.length);
  widget.load(trackAr[randomNum].href);
  setTimeout(function () {
    widget.play();
  }, 500);
};

// event listeners
contCont.addEventListener("click", growMain);
contHeader.addEventListener("click", growMain);
contDisc.addEventListener("click", growArticle);
contTijd.addEventListener("click", growArticle);
rndBtn.addEventListener("click", randomTrack);
