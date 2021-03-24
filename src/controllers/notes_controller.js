export class NotesController {
	
	constructor(reader) {

		const scope = this;

		this.reader = reader;
		this.popups = [];
		this.epubcfi = new ePub.CFI();
		this.renderer = reader.book.renderer;
		this.annotations = reader.settings.annotations;
		this.annotations.forEach(function(note) {
			scope.addAnnotation(note);
		});

		this.text = $('#note-text');		
		this.anchor = $('#note-anchor');
		this.anchor.on('click', function(e){
			scope.anchor.text('Cancel');
			scope.text.prop('disabled', true);
			// listen for selection
			reader.rendition.on('click', scope.insertAtPoint);
		});

		this.notes = $('#notes');
		this.notesView = $('#notesView');
	}

	show() { this.notesView.show(); }

	hide() { this.notesView.hide(); }

	insertAtPoint(e) {

		let range;
		let textNode;
		let offset;

		const doc = book.renderer.doc;
		// standard
		if (doc.caretPositionFromPoint) {
			range = doc.caretPositionFromPoint(e.clientX, e.clientY);
			textNode = range.offsetNode;
			offset = range.offset;
		// WebKit
		} else if (doc.caretRangeFromPoint) {
			range = doc.caretRangeFromPoint(e.clientX, e.clientY);
			textNode = range.startContainer;
			offset = range.startOffset;
		}

		if (textNode.nodeType !== 3) {
			for (var i=0; i < textNode.childNodes.length; i++) {
				if (textNode.childNodes[i].nodeType == 3) {
					textNode = textNode.childNodes[i];
					break;
				}
			}
		}

		// Find the end of the sentance
		offset = textNode.textContent.indexOf(".", offset);
		if(offset === -1){
			offset = textNode.length; // Last item
		} else {
			offset += 1; // After the period
		}

		const cfi = epubcfi.generateCfiFromTextNode(textNode, offset, 
			book.renderer.currentChapter.cfiBase);

		const annotation = {
			annotatedAt: new Date(),
			anchor: cfi,
			body: this.text.val()
		}

		// add to list
		this.reader.addNote(annotation);

		// attach
		this.addAnnotation(annotation);
		this.placeMarker(annotation);

		// clear
		this.text.val('');
		this.anchor.text('Attach');
		this.text.prop('disabled', false);

		rendition.off("click", insertAtPoint);
	}

	addAnnotation(annotation) {

		const note = document.createElement('li');
		const link = document.createElement('a');

		note.innerHTML = annotation.body;
		// note.setAttribute("ref", annotation.anchor);
		link.innerHTML = " context &#187;";
		link.href = "#" + annotation.anchor;
		link.onclick = function () {
			rendition.display(annotation.anchor);
			return false;
		};

		note.appendChild(link);
		this.notes.append(note);
	}

	placeMarker(annotation) {

		const doc = book.renderer.doc;
		const marker = document.createElement("span");
		const mark = document.createElement("a");
		marker.classList.add("footnotesuperscript", "reader_generated");

		marker.style.verticalAlign = "super";
		marker.style.fontSize = ".75em";
		// marker.style.position = "relative";
		marker.style.lineHeight = "1em";

		// mark.style.display = "inline-block";
		mark.style.padding = "2px";
		mark.style.backgroundColor = "#fffa96";
		mark.style.borderRadius = "5px";
		mark.style.cursor = "pointer";

		marker.id = "note-" + EPUBJS.core.uuid();
		mark.innerHTML = annotations.indexOf(annotation) + 1 + "[Reader]";

		marker.appendChild(mark);
		epubcfi.addMarker(annotation.anchor, doc, marker);

		markerEvents(marker, annotation.body);
	}

	markerEvents(item, txt) {

		const id = item.id;
		const scope = this;

		const showPop = function () {

			let poppos, tip, pop, itemRect, left, top, pos;
			let maxHeight = 225;			
			const iheight = renderer.height;
			const iwidth = renderer.width;

			//-- create a popup with endnote inside of it
			if (!scope.popups[id]) {
				scope.popups[id] = document.createElement('div');
				scope.popups[id].setAttribute('class', 'popup');

				const pop_content = document.createElement('div');

				scope.popups[id].appendChild(pop_content);

				pop_content.innerHTML = txt;
				pop_content.setAttribute('class', 'pop_content');

				scope.renderer.render.document.body.appendChild(scope.popups[id]);

				//-- TODO: will these leak memory? - Fred
				scope.popups[id].addEventListener('mouseover', onPop, false);
				scope.popups[id].addEventListener('mouseout', offPop, false);

				//-- Add hide on page change
				scope.reader.rendition.on('locationChanged', hidePop, this);
				scope.reader.rendition.on('locationChanged', offPop, this);
				// chapter.book.on("renderer:chapterDestroy", hidePop, this);
			}

			pop = this.popups[id];

			//-- get location of item
			itemRect = item.getBoundingClientRect();
			left = itemRect.left;
			top = itemRect.top;

			//-- show the popup
			pop.classList.add('show');

			//-- locations of popup
			popRect = pop.getBoundingClientRect();

			//-- position the popup
			pop.style.left = left - popRect.width / 2 + "px";
			pop.style.top = top + "px";


			//-- Adjust max height
			if (maxHeight > iheight / 2.5) {
				maxHeight = iheight / 2.5;
				pop_content.style.maxHeight = maxHeight + "px";
			}

			//-- switch above / below
			if (popRect.height + top >= iheight - 25) {
				pop.style.top = top - popRect.height + "px";
				pop.classList.add('above');
			} else {
				pop.classList.remove('above');
			}

			//-- switch left
			if (left - popRect.width <= 0) {
				pop.style.left = left + "px";
				pop.classList.add('left');
			} else {
				pop.classList.remove('left');
			}

			//-- switch right
			if (left + popRect.width / 2 >= iwidth) {
				//-- TEMP MOVE: 300
				pop.style.left = left - 300 + "px";

				popRect = pop.getBoundingClientRect();
				pop.style.left = left - popRect.width + "px";
				//-- switch above / below again
				if (popRect.height + top >= iheight - 25) {
					pop.style.top = top - popRect.height + "px";
					pop.classList.add('above');
				} else {
					pop.classList.remove('above');
				}

				pop.classList.add('right');
			} else {
				pop.classList.remove('right');
			}

		}

		const onPop = function () {
			scope.popups[id].classList.add('on');
		}

		const offPop = function () {
			scope.popups[id].classList.remove('on');
		}

		const hidePop = function () {
			setTimeout(function () {
				scope.popups[id].classList.remove('show');
			}, 100);
		}

		const openSidebar = function () {
			scope.reader.ReaderController.slideOut();
			show();
		}

		item.addEventListener('mouseover', showPop, false);
		item.addEventListener('mouseout', hidePop, false);
		item.addEventListener('click', openSidebar, false);
	}
}
