
var parallaxBox = document.querySelector('.reviews-bg');
var yPos = window.pageYOffset;

window.onscroll = function () {
    var yPos = window.pageYOffset;
    console.log(yPos);
    if (yPos >= 660) {
        parallaxBox.style.transform = 'translateY(' + (yPos-1100)/3 + 'px)';
        console.log(parallaxBox.style.transform);
    }
};