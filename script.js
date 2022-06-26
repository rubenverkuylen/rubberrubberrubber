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

const plCon = document.querySelector("#playlist-container");
const mixCon = document.querySelector("#mix-container");
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
// reload iframe
plCon.addEventListener("click", function (e) {
  e.preventDefault();
  const updatedURL = e.target.href;
  widget.load(updatedURL);
});

// random track
const trackAr = [];
allLinks.forEach((tr) => trackAr.push(tr));

rndBtn.addEventListener("click", function () {
  const randomNum = Math.floor(Math.random() * trackAr.length);
  widget.load(trackAr[randomNum].href);
});

// event listeners
contCont.addEventListener("click", growMain);
contHeader.addEventListener("click", growMain);
contDisc.addEventListener("click", growArticle);
contTijd.addEventListener("click", growArticle);
