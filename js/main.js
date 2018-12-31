
var parallaxBox = document.querySelector('.reviews-bg');

window.onscroll = function () {
    var yPos = window.pageYOffset;
    if (yPos >= 660) {
        parallaxBox.style.transform = 'translateY(' + (yPos-1100)/3 + 'px)';
    }
};