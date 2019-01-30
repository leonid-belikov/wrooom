var App = (function () {


	return {
		init: function () {
			Header.init();
			Home.init();
			Advantages.init();
			Reviews.init();
			Courses.init();
			Indicators.init();
			Instructors.init();
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
	var leftArrowButton = document.querySelector('.reviews .left-arrow');
	var rightArrowButton = document.querySelector('.reviews .right-arrow');

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
				var reviewsBg = document.querySelector('.reviews-bg');
				var reviewsBox = document.querySelector('.reviews');
				fLib.parallax(reviewsBox, reviewsBg, 150, 3);
			});
		}
	}
})();

var Courses = (function () {

	var bodyElem = document.body;
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

	function renderItems (first, last) {
		for (var i=first; i<last; i++) {
			//todo переписать img на div с background-image
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
	var header = 		document.querySelector('header');
	var popupBox =		document.querySelector('.allCoursesBox');
	var staticBox =	document.querySelector('.static');
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
		var crsPrevId = fLib.getPrev(crsId, crsArr.length);
		var crsPrevItem = crsArr[crsPrevId];
		var crsNextId = fLib.getNext(crsId, crsArr.length);
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
		imgNextNextLabel.style.backgroundImage = 'url(' + crsArr[fLib.getNext(fLib.getNext(Id, crsArr.length), crsArr.length)].labelSrc + ')';
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
		imgPrevPrevLabel.style.backgroundImage = 'url(' + crsArr[fLib.getPrev(fLib.getPrev(Id, crsArr.length), crsArr.length)].labelSrc + ')';
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
						currentCrsId = fLib.getPrev(currentCrsId, crsArr.length);
					} else if (targetClass.indexOf('next') >= 0) {
						changeImgForward(currentCrsId);
						currentCrsId = fLib.getNext(currentCrsId, crsArr.length);
					}
					putPopupTextContent(currentCrsId);
				}
			};

		}
	}
})();

var Indicators = (function () {
	var indcsBox = document.querySelector('.indcBox');
	var indicators = [
		{
			name: 'graduates',
			value: 1350
		},
		{
			name: 'teachers',
			value: 32
		},
		{
			name: 'smthg else',
			value: 74
		},
		{
			name: 'years on market',
			value: 13
		}
	];

	function viewCounter(i) {
		var j=0;
		var step = 2000/indicators[i].value;
		var indcItem = document.getElementById(indicators[i].name);
		var counter = setInterval(function () {
			i === 0 ? j += 3 : ++j;
			indcItem.innerText = j;
			if (j === indicators[i].value) {
				clearInterval(counter);
			}
		}, step);
	}

	function viewCounters() {
		for (var i=0; i<indicators.length; ++i) {
			viewCounter(i);
		}
	}

	function renderIndcs() {
		for (var i=0; i<indicators.length; i++) {
			var h3 = document.createElement('h3');
			var indcNum = document.createElement('div');
			var indcItem = document.createElement('div');

			h3.innerText = indicators[i].name;
			indcNum.className = "indcNum";
			indcNum.id = indicators[i].name;
			indcItem.className = "col indcItem";
			indcItem.appendChild(h3);
			indcItem.appendChild(indcNum);
			indcsBox.appendChild(indcItem);
		}
	}


	return {
		init: function () {

			var indcsHasShown = false;

			renderIndcs();

			window.addEventListener('scroll', function () {
				var indcsBg = document.querySelector('.indicators-bg');
				var indcsBox = document.querySelector('.indicators');
				fLib.parallax(indcsBox, indcsBg, 100, 3);
				if (!indcsHasShown && indcsBox.getBoundingClientRect().bottom - indcsBox.offsetHeight/2 < window.innerHeight) {
					viewCounters();
					indcsHasShown = true;
				}
			});

		}
	}


})();

var Instructors = (function () {
/*
	var instrBlock =			document.querySelector('.instructors-block');
*/
	var instrBox =				document.querySelector('.instructors-block-items');
	var leftArrowButton =	document.querySelector('.instructors .left-arrow');
	var rightArrowButton =	document.querySelector('.instructors .right-arrow');
	var socNets = {
		'fb':
			{'icon': '/img/fb-icon.png'},
		'tw':
			{'icon': '/img/tw-icon.png'},
		'vk':
			{'icon': '/img/vk-icon.png'},
		'ig':
			{'icon': '/img/ig-icon.png'}
	};
	var instrArr = [
		{
			avatar: '/img/avatar_1.png',
			name: 'vasiliy terkin',
			desc: 'Director',
			links: {
				fb: '#',
				tw: '#',
				ig: '#'
			}
		},
		{
			avatar: '/img/avatar_2.png',
			name: 'leonid belikov',
			desc: 'Road king',
			links: {
				fb: '#',
				vk: 'https://vk.com/id130355',
				tw: '#'
			}
		},
		{
			avatar: '/img/avatar_3.png',
			name: 'arnold krasava',
			desc: 'Uborschik',
			links: {
				fb: '#',
				vk: '#',
				tw: '#',
				ig: '#'
			}
		},
		{
			avatar: '/img/avatar_4.png',
			name: 'Daniel',
			desc: 'Race driving',
			links: {
				fb: '#',
				tw: '#',
				ig: '#'
			}
		},
		{
			avatar: '/img/avatar_5.png',
			name: 'Emilian',
			desc: 'Extreme driving',
			links: {
				fb: '#',
				vk: '#',
				tw: '#'
			}
		},
		{
			avatar: '/img/avatar_6.png',
			name: 'Zhaber',
			desc: 'Dumbass',
			links: {
				fb: '#',
				vk: '#',
				tw: '#',
				ig: '#'
			}
		}
	];
	var instrItemsNum = instrArr.length > 3 ? 3 : instrArr.length;


	function renderInstrBox() {
		for (var i=0; i<instrItemsNum; i++) {
			renderInstrItem(i);
		}
	}

	function renderInstrItem(num, toStart = false) {
		var instrItem =	document.createElement('div');
		var avatar =		document.createElement('div');
		var title =			document.createElement('div');
		var name =			document.createElement('div');
		var desc =			document.createElement('div');
		var hasLinks = !!instrArr[num].links;
		var hoverBox;
		var socNetBtns = [];

		name.className = 'name';
		name.innerText = instrArr[num].name;
		desc.className = 'desc';
		desc.innerText = instrArr[num].desc;
		title.className = 'title';

		title.appendChild(name);
		title.appendChild(desc);
		avatar.className = 'avatar';
		avatar.style.background = 'center center url(' + instrArr[num].avatar + ')';
		instrItem.className = 'instructors-block-item';
		instrItem.id = 'id_' + num;

		if (hasLinks) {
			hoverBox = document.createElement('div');
			hoverBox.className = 'hover-box';
			for (var socNet in instrArr[num].links) {
				if (socNet in socNets) {
					var socNetBtn = document.createElement('div');
					socNetBtn.className = 'soc-net';
					socNetBtn.innerHTML = '<a href="' + instrArr[num].links[socNet] + '" target="_blank"><img src="' + socNets[socNet].icon + '"></a>';
					hoverBox.appendChild(socNetBtn);
					socNetBtns.push(socNetBtn);
				}
			}
			avatar.appendChild(hoverBox);
		}

		instrItem.appendChild(avatar);
		instrItem.appendChild(title);

		if (toStart) {
			instrBox.insertBefore(instrItem, instrBox.children[0]);
		} else {
			instrBox.appendChild(instrItem);
		}

		instrItem.onmouseover = function () {
			hoverBox.style.background = 'rgba(0, 0, 0, 0.4)';
			showHideSocBtns(socNetBtns, false);
	};

		instrItem.onmouseout = function () {
			hoverBox.style.background = 'rgba(0, 0, 0, 0)';
			showHideSocBtns(socNetBtns, true);
		}
	}

	function showHideSocBtns(socNetBtns, isShowSocNetBtns) {
		var i=0;
		var viewer = setInterval(function () {
			socNetBtns[i].style.transform = isShowSocNetBtns ? 'scale(0)' : 'scale(1)';
			i++;
			if (i === socNetBtns.length) {
				clearInterval(viewer);
			}
		}, 100);

	}

	function activateArrow (arrowElem) {
		arrowElem.innerHTML = '<img src="img/arrow-blue.png">';
		arrowElem.style.transform = 'translateZ(10px)';
		arrowElem.style.filter = 'drop-shadow(0 10px 3px rgba(0,0,0,0.5))';
	}

	function deactivateArrow (arrowElem) {
		arrowElem.innerHTML = '<img src="img/arrow-dark-blue.png">';
		arrowElem.style.transform = 'translateZ(0)';
		arrowElem.style.filter = 'none';
	}

	function changeInstr (side) {
		var instrItems = document.getElementsByClassName('instructors-block-item');
		var firstInstrItem = instrItems[0];
		var lastInstrItem = instrItems[instrItems.length-1];
		var firstId = parseInt(instrItems[0].id.split('_')[1]);
		var lastId = parseInt(instrItems[instrItems.length-1].id.split('_')[1]);

		switch(side) {
			case 'toLeft':
				firstInstrItem.style.transform = 'translate(-50%, -150%) scale(0) rotateZ(-180deg)';
				firstInstrItem.style.opacity = '0';
				setTimeout(function () {
					instrBox.removeChild(firstInstrItem);
					renderInstrItem(fLib.getNext(lastId, instrArr.length));
				}, 300);
				break;
			case 'toRight':
				lastInstrItem.style.transform = 'translate(50%, -150%) scale(0) rotateZ(180deg)';
				lastInstrItem.style.opacity = '0';
				setTimeout(function () {
					instrBox.removeChild(lastInstrItem);
					renderInstrItem(fLib.getPrev(firstId, instrArr.length), true);
				}, 300);
				break;
		}
	}

	return {
		init: function () {

			renderInstrBox();

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
				changeInstr(side);
			};

			rightArrowButton.onclick = function () {
				var side = 'toRight';
				changeInstr(side);
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

var fLib =  {
	parallax: function (prlxBox, prlxBg, shift, slowdown) {
		var coordTop = prlxBox.getBoundingClientRect().top;
		if (!!coordTop && coordTop < window.innerHeight) {
			prlxBg.style.bottom = shift+(coordTop-window.innerHeight)/slowdown + 'px';
		}
	},
	getNext: function (num, length) {
		return num === length - 1 ? 0 : ++num;
	},
	getPrev: function (num, length) {
		return num === 0? length - 1 : --num;
	}
};


App.init();