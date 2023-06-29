"use strict"

document.addEventListener("DOMContentLoaded", function() {
    let prev = document.getElementsByClassName("prev")
    let slide = document.getElementsByClassName("slide")
    let next = document.getElementsByClassName("next")
    
    let images = ["fotos/slider-vw.jpg", "fotos/slider3.jpg"];
    let index = 0
    
    prev[0].addEventListener("click", function() {
        index = (index + images.length -1) % images.length;
        slide[0].src = images[index]
    });
    
    next[0].addEventListener("click", function() {
        index = (index + 1) % images.length;
        slide[0].src = images[index]
    });
});

