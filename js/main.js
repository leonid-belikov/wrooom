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
				CrsPopup.init(event.detail);
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

	var homeBox = document.querySelector('.home .container');

	return {
		init: function () {

			homeBox.onclick = function (event) {
				var target = event.target;
				var targetClass = target.className;
				var onViewAllCourses;
				var crsId = 0;

				if (targetClass.indexOf('read') >= 0) {
					onViewAllCourses = new CustomEvent('onViewAllCourses', { 'detail' : crsId } );
					document.dispatchEvent(onViewAllCourses);
				}
			}

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

	var bodyElem = document.getElementsByTagName('body')[0];
	var crsCont = document.querySelector('#courses .container');
	var crsBox = document.querySelector('.courses-block');
	var crsArr = [
		{
			labelSrc: '/img/course1-label.png',
			header: 'driving course I',
			text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
			fullDesc: 'Red Car Lorem ipsum dolor sit amet, consectetur adipisicing elit consequuntur cumque et facilis repudiandae saepe sed sequi veniam vero atque consequuntur dolores earum id iure laboriosam minus nemo, nisi nostrum odio quidem, quis tempora vel. Aliquid debitis dolore, eaque earum eveniet facere fugiat molestias, neque nisi obcaecati odio sed sequi sit, totam vero. Dolore dolorum ea iure magnam mollitia nulla rem, reprehenderit tempore velit voluptate voluptatem voluptates voluptatibus voluptatum aliquam aperiam aut blanditiis consectetur cupiditate dolor eius exercitationem explicabo facilis fugiat fugit, impedit, ipsam magnam nesciunt non officiis quaerat quidem reprehenderit rerum saepe sint tempora vitae voluptatum',
			cost: 200
		},
		{
			labelSrc: '/img/course2-label.png',
			header: 'driving course II',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cupiditate impedit quae. Ab, aspernatur.',
			fullDesc: 'Truck Lorem ipsum dolor sit amet, consectetur adipisicing elit consequuntur cumque et facilis repudiandae saepe sed sequi veniam vero atque consequuntur dolores earum id iure laboriosam minus nemo, nisi nostrum odio quidem, quis tempora vel aliquid debitis dolore, eaque earum eveniet facere fugiat molestias, neque nisi obcaecati odio sed sequi sit, totam vero. Dolore dolorum ea iure magnam mollitia nulla rem, reprehenderit tempore velit. Voluptate voluptatem voluptates voluptatibus voluptatum aliquam aperiam aut blanditiis consectetur cupiditate dolor eius exercitationem explicabo facilis fugiat fugit, impedit, ipsam magnam nesciunt non officiis quaerat quidem reprehenderit rerum saepe sint tempora vitae voluptatum',
			cost: 300
		},
		{
			labelSrc: '/img/course3-label.png',
			header: 'driving course III',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi error est illo perspiciatis.',
			fullDesc: 'Bike Lorem ipsum dolor sit amet, consectetur adipisicing elit consequuntur cumque. Et facilis repudiandae saepe sed sequi veniam vero atque consequuntur dolores earum id iure laboriosam minus nemo, nisi nostrum odio quidem, quis tempora vel. Aliquid debitis dolore, eaque earum eveniet facere fugiat molestias, neque nisi obcaecati odio sed sequi sit, totam vero. Dolore dolorum ea iure magnam mollitia nulla rem, reprehenderit tempore velit voluptate voluptatem voluptates voluptatibus voluptatum aliquam aperiam aut blanditiis consectetur cupiditate dolor eius exercitationem explicabo facilis fugiat fugit, impedit',
			cost: 400
		},
		{
			labelSrc: '/img/course4-label.png',
			header: 'driving course IV',
			text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
			fullDesc: 'Orange drift Lorem ipsum dolor sit amet, consectetur adipisicing elit consequuntur cumque et facilis repudiandae saepe sed sequi veniam vero atque consequuntur dolores earum id iure laboriosam minus nemo, nisi nostrum odio quidem, quis tempora vel aliquid debitis dolore, eaque earum eveniet facere fugiat molestias, neque nisi obcaecati odio sed sequi sit, totam vero. Dolore dolorum ea iure magnam mollitia nulla rem, reprehenderit tempore velit voluptate voluptatem voluptates voluptatibus voluptatum aliquam aperiam aut blanditiis consectetur cupiditate dolor eius exercitationem explicabo facilis fugiat fugit, impedit, ipsam magnam nesciunt non officiis quaerat quidem reprehenderit rerum saepe sint tempora vitae voluptatum',
			cost: 1200
		},
		{
			labelSrc: '/img/course5-label.png',
			header: 'driving course V',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cupiditate impedit quae. Ab, aspernatur.',
			fullDesc: 'Black drift Lorem ipsum dolor sit amet, consectetur adipisicing elit consequuntur cumque et facilis repudiandae saepe sed sequi veniam vero atque consequuntur dolores earum id iure laboriosam minus nemo, nisi nostrum odio quidem. Quis tempora vel aliquid debitis dolore, eaque earum eveniet facere fugiat molestias, neque nisi obcaecati odio sed sequi sit, totam vero dolore dolorum ea iure magnam mollitia nulla rem. Reprehenderit tempore velit voluptate voluptatem voluptates voluptatibus voluptatum aliquam aperiam aut blanditiis consectetur cupiditate dolor eius exercitationem explicabo facilis fugiat fugit, impedit, ipsam magnam nesciunt non officiis quaerat quidem reprehenderit rerum saepe sint tempora vitae voluptatum',
			cost: 1300
		},
		{
			labelSrc: '/img/course6-label.png',
			header: 'driving course VI',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi error est illo perspiciatis.',
			fullDesc: 'Snow car Lorem ipsum dolor sit amet, consectetur adipisicing elit consequuntur cumque et facilis repudiandae saepe sed sequi veniam vero atque consequuntur dolores earum id iure laboriosam minus nemo. Nisi nostrum odio quidem, quis tempora vel aliquid debitis dolore, eaque earum eveniet facere fugiat molestias, neque nisi obcaecati odio sed sequi sit, totam vero dolore dolorum ea iure magnam mollitia nulla rem, reprehenderit tempore velit voluptate voluptatem. Voluptates voluptatibus voluptatum aliquam aperiam aut blanditiis consectetur cupiditate dolor eius exercitationem explicabo facilis fugiat fugit, impedit, ipsam magnam nesciunt non officiis quaerat quidem reprehenderit rerum saepe sint tempora vitae voluptatum',
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

	function showOrHideCourses() {
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
	}

	function dispatchOpenCrsPopup(target) {
		var parentElem = target.parentNode;
		var onViewAllCourses;
		var crsId;

		while (parentElem !== bodyElem && parentElem.className.indexOf('courses-block-item') < 0) {
			parentElem = parentElem.parentNode;
		}

		crsId = parentElem === bodyElem ? null : parseInt(parentElem.id.split('_')[1]);

		onViewAllCourses = new CustomEvent('onViewAllCourses', { 'detail' : crsId } );
		document.dispatchEvent(onViewAllCourses);
	}

	return {
		init: function () {
			renderItems(0, crsItemsNum);

			if (!viewAll) {
				showViewButton()
			}

			crsCont.onclick = function (event) {
				var target = event.target;
				var targetClass = target.className;
				if (targetClass.indexOf('button-show') >= 0) {
					showOrHideCourses();
				} else if (targetClass.indexOf('read') >= 0) {
					dispatchOpenCrsPopup(target);
				}
			};
		},
		getCrsArr: function () {
			return crsArr;
		}
	}
})();

var CrsPopup = (function () {
	var header = 	document.querySelector('header');
	var popupBox =	document.querySelector('.allCoursesBox');
	var staticBox = document.querySelector('.static');
	var crsArr = Courses.getCrsArr();
	var currentCrsId;

	function addPopupContent(crsId) {
		putPopupImages(crsId);
		putPopupTextContent(crsId);
	}

	function putPopupTextContent(crsId) {
		var crsItem = crsArr[crsId];
		var h2 =				document.querySelector('.allCoursesBox h2');
		var amountBox =	document.querySelector('.amount');
		var fullDescBox =	document.querySelector('.fullDesc');
		var fullDescParts = crsItem.fullDesc.split('. ');
		var innerFullDesc = '';

		h2.innerText = crsItem.header;
		amountBox.innerText = '$ ' + crsItem.cost;
		for (var i = 0; i < fullDescParts.length; i++) {
			innerFullDesc += '<p>' + fullDescParts[i] + '.</p>';
		}
		fullDescBox.innerHTML = innerFullDesc;
	}

	function putPopupImages(crsId) {
		var crsItem = crsArr[crsId];
		var crsPrevId = getPrevId(crsId);
		var crsPrevItem = crsArr[crsPrevId];
		var crsNextId = getNextId(crsId);
		var crsNextItem = crsArr[crsNextId];
		var imgLabel = document.querySelector('.crsImg.current');
		var imgPrevLabel = document.querySelector('.crsImg.prev');
		var imgNextLabel = document.querySelector('.crsImg.next');

		imgLabel.style.backgroundImage = 'url(' + crsItem.labelSrc + ')';
		imgPrevLabel.style.backgroundImage = 'url(' + crsPrevItem.labelSrc + ')';
		imgNextLabel.style.backgroundImage = 'url(' + crsNextItem.labelSrc + ')';
	}

	function renderPopup() {
		var popupCntr = document.querySelector('.allCoursesBox .container');
		popupBox.style.display = 'block';
		staticBox.style.filter = 'blur(5px)';
		header.style.opacity = '0';
		popupCntr.style.top = '-900px';

		setTimeout(function () {
			popupBox.style.opacity = '1';
			popupCntr.style.opacity = '1';
			popupCntr.style.top = '0';
		},50);

		popupBox.onwheel = function (event) {
			event.preventDefault();
		}
	}

	function hidePopup() {
		popupBox.style.opacity = '0';
		popupBox.style.display = 'none';
		header.style.opacity = '1';
		staticBox.style.filter = 'none';
	}

	function getPrevId(Id) {
		return Id === 0 ? crsArr.length - 1 : --Id;
	}

	function getNextId(Id) {
		return Id === crsArr.length - 1 ? 0 : ++Id;
	}

	function changeImgForward(Id) {
		var imgLabelRow =			document.querySelector('.crsLabel');
		var imgLabel =				document.querySelector('.crsImg.current');
		var imgPrevLabel =		document.querySelector('.crsImg.prev');
		var imgNextLabel =		document.querySelector('.crsImg.next');
		var imgNextNextLabel =	document.createElement('div');

		imgLabel.className = 'crsImg prev';
		imgPrevLabel.style.opacity = '0';
		setTimeout(function () {
			imgLabelRow.removeChild(imgPrevLabel);
		}, 300);
		imgNextLabel.className = 'crsImg current';
		imgNextNextLabel.style.opacity = '0';
		imgNextNextLabel.style.backgroundImage = 'url(' + crsArr[getNextId(getNextId(Id))].labelSrc + ')';
		imgNextNextLabel.className = 'crsImg next';
		imgLabelRow.appendChild(imgNextNextLabel);
		setTimeout(function () {
			imgNextNextLabel.style.opacity = '1';
		}, 50);

	}

	function changeImgBackward(Id) {
		var imgLabelRow =			document.querySelector('.crsLabel');
		var imgLabel =				document.querySelector('.crsImg.current');
		var imgPrevLabel =		document.querySelector('.crsImg.prev');
		var imgNextLabel =		document.querySelector('.crsImg.next');
		var imgPrevPrevLabel =	document.createElement('div');

		imgLabel.className = 'crsImg next';
		imgNextLabel.style.opacity = '0';
		setTimeout(function () {
			imgLabelRow.removeChild(imgNextLabel);
		}, 300);
		imgPrevLabel.className = 'crsImg current';
		imgPrevPrevLabel.style.backgroundImage = 'url(' + crsArr[getPrevId(getPrevId(Id))].labelSrc + ')';
		imgPrevPrevLabel.className = 'crsImg prev';
		imgPrevPrevLabel.style.opacity = '0';
		imgLabelRow.appendChild(imgPrevPrevLabel);
		setTimeout(function () {
			imgPrevPrevLabel.style.opacity = '1';
		}, 50);

	}

	return {
		init: function (crsId) {
			currentCrsId = crsId;
			addPopupContent(currentCrsId);
			renderPopup(currentCrsId);

			popupBox.onclick = function (event) {
				var target = event.target;
				var targetClass = target.className;

				if (targetClass.indexOf('popup-closeButton') >= 0) {
					hidePopup();
				} else if (targetClass.indexOf('crsImg') >= 0) {
					if (targetClass.indexOf('prev') >= 0) {
						changeImgBackward(currentCrsId);
						currentCrsId = getPrevId(currentCrsId);
					} else if (targetClass.indexOf('next') >= 0) {
						changeImgForward(currentCrsId);
						currentCrsId = getNextId(currentCrsId);
					}
					putPopupTextContent(currentCrsId);
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