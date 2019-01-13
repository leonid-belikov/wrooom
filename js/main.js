var App = (function () {


	return {
		init: function () {
			Header.init();
			Home.init();
			Advantages.init();
			Reviews.init();
			Courses.init();
			Footer.init();

			document.addEventListener('onViewAllCourses', function (event) {
				console.log('event onViewAllCourses happened with detail: ' + event.detail);
			})
		}
	}
})();

var Header = (function () {
	return {
		init: function () {
			console.log('header initialized');
		}
	}
})();

var Home = (function () {
	return {
		init: function () {
			console.log('home initialized');
		}
	}
})();

var Advantages = (function () {
	var advBox = document.querySelector('.advantages-block');
	var advArr = [
		{
			labelSrc: '/img/manager-icon.png',
			header: 'best instructors',
			text: 'Cras suscipit tristique lectus quis consequat. Praesent convallis non risus dignissim.'
		},
		{
			labelSrc: '/img/dashboard-icon.png',
			header: 'safety driving',
			text: 'Suspendisse ut blandit orci, eget suscipit felis vel augue. Praesent ut arcu urna.'
		},
		{
			labelSrc: '/img/timetable-icon.png',
			header: 'flexible schedule',
			text: 'Quisque rutrum. Aene imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies.'
		},
		{
			labelSrc: '/img/like-icon.png',
			header: 'affordable fee',
			text: 'Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus uneque viverra justo.'
		}
	];
	function advRender() {
		for (var i=0; i<advArr.length; i++) {
			var img = '<img src="' + advArr[i].labelSrc + '" alt="">';
			var h = '<h3>' + advArr[i].header + '</h3>';
			var p = '<p>' + advArr[i].text + '</p>';
			var html = img + h + p;
			var advItem = document.createElement('div');

			advItem.className = 'advantages-block-item';
			advItem.innerHTML = html;
			advBox.appendChild(advItem);
		}
	}
	return {
		init: function () {
			advRender();
		}
	}
})();

var Reviews = (function () {

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

	function activateArrow (arrowElem) {
		arrowElem.innerHTML = '<img src="img/arrow-blue.png">';
	}

	function deactivateArrow (arrowElem) {
		arrowElem.innerHTML = '<img src="img/arrow.png">';
	}

	function changeReview (side) {
		var style = reviewBox.style;
		var firstMove = side === "toLeft" ? '-30vw' : '30vw';
		var secondMove = side === "toRight" ? '-30vw' : '30vw';
		var delay = 250;
		style.transition = '0.25s';
		style.transform = 'translateX(' + firstMove + ') scale(0.01)';
		style.opacity = '0';
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
				style.opacity = '1';
				style.transform = 'translateX(0) scale(1)';
			}, delay);
		}, delay);
	}

	return {
		init: function () {

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

			window.addEventListener('scroll', function () {
				var parallaxBox = document.querySelector('.reviews-bg');
				var yPos = window.pageYOffset;
				if (yPos >= 660) {
					parallaxBox.style.transform = 'translateY(' + (yPos-1100)/3 + 'px)';
				}
			});
		}
	}
})();


var Courses = (function () {

	var crsCont = document.querySelector('#courses .container');
	var crsBox = document.querySelector('.courses-block');
	var crsArr = [
		{
			labelSrc: '/img/course1-label.png',
			header: 'driving course I',
			text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
			cost: 200
		},
		{
			labelSrc: '/img/course2-label.png',
			header: 'driving course II',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cupiditate impedit quae. Ab, aspernatur.',
			cost: 300
		},
		{
			labelSrc: '/img/course3-label.png',
			header: 'driving course III',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi error est illo perspiciatis.',
			cost: 400
		},
		{
			labelSrc: '/img/course4-label.png',
			header: 'driving course IV',
			text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
			cost: 1200
		},
		{
			labelSrc: '/img/course5-label.png',
			header: 'driving course V',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cupiditate impedit quae. Ab, aspernatur.',
			cost: 1300
		},
		{
			labelSrc: '/img/course6-label.png',
			header: 'driving course VI',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi error est illo perspiciatis.',
			cost: 1400
		}
	];
	var crsItem;
	var crsItemsNum = crsArr.length > 3 ? 3 : crsArr.length;
	var viewAll = crsItemsNum === crsArr.length;
	var hoverText = 'read more';
	var viewButton = document.querySelector('.button-show');

	function renderItems (first, count) {
		for (var i=first; i<count; i++) {
			var img = '<img src="' + crsArr[i].labelSrc + '" alt="">';
			var hoverBox = '<div class="hover-box read">' + hoverText + '</div>';
			var h = '<h3>' + crsArr[i].header + '</h3>';
			var p = '<p>' + crsArr[i].text + '</p>';
			var cost = '<div class="cost">$ ' + crsArr[i].cost + '</div>';
			var btns = '<div class="buttons"><div class="button send">send request</div><div class="button read">read more</div></div>';
			var contentBox = '<div class="content">' + h + p + cost + btns + '</div>';

			crsItem = document.createElement('div');
			crsItem.className = 'courses-block-item';
			crsItem.id = 'crsId_' + i;
			crsItem.innerHTML = img + hoverBox + contentBox;
			crsBox.appendChild(crsItem);
		}
	}

	function showViewButton () {
		viewButton.style.display = 'block';
		viewButton.innerText = 'view all courses';
	}

	return {
		init: function () {
			renderItems(0, crsItemsNum);

			if (!viewAll) {
				showViewButton()
			}

			crsCont.onclick = function (event) {
				var target = event.target;
				var targetClass = event.target.className;
				if (targetClass.indexOf('button-show') >= 0) {
					if (!viewAll) {
						renderItems(crsItemsNum, crsArr.length);
						viewAll = true;
						viewButton.innerText = 'only top courses';
					} else {
						while (crsBox.childElementCount > crsItemsNum) {
							crsBox.removeChild(crsBox.children[crsBox.childElementCount - 1]);
						}
						viewAll = false;
						viewButton.innerText = 'view all courses';
					}
				} else if (targetClass.indexOf('read') >= 0) {
					var viewAllCourses = new CustomEvent('onViewAllCourses', { 'detail' : '!!!' } );
					document.dispatchEvent(viewAllCourses);
				}
			};
		}
	}
})();

var Footer = (function () {
	return {
		init: function () {
			console.log('footer initialized');
		}
	}
})();


App.init();