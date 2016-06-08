;(function(){
	window.app = function () {
		var test = function() {
			console.log('ready for the good time!');
		};
		var selectingMenu = function() {
			var menuItems = document.getElementsByClassName('js__menu-item');
			for (var i = 0; i < menuItems.length; i++) {
				menuItems[i].addEventListener('click', (function(index) {
					return function() {
						var tabItems = document.getElementsByClassName('js__tab-item');
						for (var j = 0; j < tabItems.length; j++) {
							tabItems[j].classList.add('block--none');
						}
						var tabItem = document.getElementsByClassName('js__tab-item')[index];
						if (tabItem.classList.contains('block--none')) {
							tabItem.classList.add('block--block');
							tabItem.classList.remove('block--none');
						}
					}
				})(i));
			}
		}

		var blocksContainer;
		var imagesCollection = [];
		var counter = 0;

		var createdBlocks = function() {
			var stringOfLinks = document.getElementsByClassName('js__tab--text')[0].value;
			blocksContainer = document.getElementsByClassName('js__tab-item')[1];
			var links = stringOfLinks.split(',');
			for (var i = 0; i < links.length; i++) {
				var block = document.createElement('p');
				block.classList.add('js__block');
				var preview = document.createElement('img');
				preview.width = 200;
				preview.classList.add('block--element', 'js__block-img');
				preview.src = links[i].replace(/'+/g, '').trim();
				block.appendChild(preview);
				var commentContainer = document.createElement('p');
				commentContainer.classList.add('block--element');
				var commentLabel = document.createElement('label');
				commentLabel.innerHTML = 'Комментарий';
				commentContainer.appendChild(commentLabel);
				var commentInput = document.createElement('input');
				commentInput.type = 'text';
				commentInput.classList.add('js__block-comment');
				commentContainer.appendChild(commentInput);
				block.appendChild(commentContainer);
				var deleteCommentButton = document.createElement('span');
				deleteCommentButton.innerHTML = 'Удалить';
				deleteCommentButton.classList.add('js__block-delete', 'block--delete', 'block--element');
				block.appendChild(deleteCommentButton);
				blocksContainer.appendChild(block);
				app.deleteCommentButtonAction(block);
			}
			if (!document.getElementsByClassName('js__save-blocks')[0]) {
				app.createButtonToSaveChanges();
			}
		}

		var createButtonToSaveChanges = function() {
			var saveButton = document.createElement('button');
			saveButton.innerHTML = 'Сохранить';
			saveButton.classList.add('js__save-blocks');
			blocksContainer.appendChild(saveButton);
			saveButton.addEventListener('click', function(event) {
				var blocks = document.getElementsByClassName('js__block');
				for (var i = 0; i < blocks.length; i++) {
					imagesCollection.push({
						'comment': blocks[i].getElementsByClassName('js__block-comment')[0].value,
						'link': blocks[i].getElementsByClassName('js__block-img')[0].src
					});
				}
				app.controlSlider();
			});
		}

		var deleteCommentButtonAction = function(block) {
			var deleteButton = block.getElementsByClassName('js__block-delete')[0];
			deleteButton.addEventListener('click', function(event) {
				block.remove();
			});
		}

		var createImageContainer = function(i) {
			var imageContainer = document.getElementsByClassName('js__images-container')[0];
			imageContainer.innerHTML = '';
			var image = document.createElement('img');
			image.src = imagesCollection[i].link;
			imageContainer.appendChild(image);
			if (imagesCollection[i].comment.length > 0) {
				var comment = document.createElement('p');
				comment.innerHTML = imagesCollection[i].comment;
				imageContainer.appendChild(comment);
			}
		}

		var controlSlider = function() {
			var arrowLeft = document.getElementsByClassName('js__arrow-left')[0];
			var arrowRight = document.getElementsByClassName('js__arrow-right')[0];
			arrowLeft.addEventListener('click', function() {
				counter--;
				if (counter < 0) {
					counter = imagesCollection.length-1;
				}
				createImageContainer(counter);
			});
			arrowRight.addEventListener('click', function() {
				counter++;
				if (counter > imagesCollection.length-1) {
					counter = 0;
				}
				createImageContainer(counter);
			});
			createImageContainer(counter);
		}

		return {
			test: test,
			selectingMenu: selectingMenu,
			createdBlocks: createdBlocks,
			createButtonToSaveChanges: createButtonToSaveChanges,
			deleteCommentButtonAction: deleteCommentButtonAction,
			controlSlider: controlSlider,
		}
	}();
	
	function ready() {
		app.selectingMenu();
		app.test();
		var addLinks = document.getElementsByClassName('js__tab--add')[0];
		addLinks.addEventListener('click', function() {
			app.createdBlocks();
		});

	}

	document.addEventListener("DOMContentLoaded", ready);
}());