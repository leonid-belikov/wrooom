
window.onload = function () {

   var reviews = function () {

      var reviewBox = document.querySelector('.reviews .content .review');
      var reviewTextBox = document.querySelector('.reviews .content .text');
      var reviewAuthorBox = document.querySelector('.reviews .content .author');
      var leftArrowButton = document.querySelector('.left-arrow');
      var rightArrowButton = document.querySelector('.right-arrow');

      var reviewsArr = [
         {
            text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur commodo sapien eget pellentesque blandit. Suspendisse potenti. Cras ultrices metus pharetra ipsum lacinia ullamcorper."',
            author: 'Dmitry Shagaleev'
         },
         {
            text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae culpa eveniet ex omnis tempora, totam!"',
            author: 'Konstantin Zuenko'
         },
         {
            text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab eum facilis ipsum nemo, omnis optio quam quisquam sequi."',
            author: 'Dmitry Kustodiev'
         }
      ];
      var currentReview = 0;

      var reloadReview = function () {
         reviewTextBox.innerText = reviewsArr[currentReview].text;
         reviewAuthorBox.innerText = reviewsArr[currentReview].author;
      };
      var activateArrow = function (elem) {
         elem.innerHTML = '<img src="img/arrow-blue.png">';
      };
      var deactivateArrow = function (elem) {
         elem.innerHTML = '<img src="img/arrow.png">';
      };
      var changeReview = function (side) {
         var style = reviewBox.style;
         var firstMove = side === "toLeft" ? '-30vw' : '30vw';
         var secondMove = side === "toRight" ? '-30vw' : '30vw';
         style.transition = '0.25s';
         style.transform = 'translateX(' + firstMove + ') scale(0.01)';
         style.visibility = 'hidden';
         setTimeout(function () {
            style.transform = 'translateX(' + secondMove + ') scale(0.01)';
            setTimeout(function () {
               switch (side) {
                  case "toLeft":
                     currentReview = currentReview === 0 ? reviewsArr.length - 1 : currentReview - 1;
                     break;
                  case "toRight":
                     currentReview = currentReview === reviewsArr.length - 1 ? 0 : currentReview + 1;
                     break;
               }
               reloadReview();
               style.visibility = 'visible';
               style.transform = 'translateX(0) scale(1)';
            }, 250);
         }, 250);
      };



      reloadReview();

      leftArrowButton.onmouseenter = function () {
         activateArrow(leftArrowButton);
      };

      leftArrowButton.onmouseleave = function () {
         deactivateArrow(leftArrowButton);
      };

      rightArrowButton.onmouseenter = function () {
         activateArrow(rightArrowButton);
      };

      rightArrowButton.onmouseleave = function () {
         deactivateArrow(rightArrowButton);
      };

      leftArrowButton.onclick = function () {
         var side = 'toLeft';
         changeReview(side);
      };

      rightArrowButton.onclick = function () {
         var side = 'toRight';
         changeReview(side);
      };



   };

   reviews();

   window.onscroll = function () {
      var parallaxBox = document.querySelector('.reviews-bg');
      var yPos = window.pageYOffset;
      if (yPos >= 660) {
         parallaxBox.style.transform = 'translateY(' + (yPos-1100)/3 + 'px)';
      }
   };

};