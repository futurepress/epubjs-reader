export class MetaController {
	
	constructor(meta) {
		
		this.title = document.getElementById('book-title');
		this.title.textContent = meta.title;
		this.author = document.getElementById('chapter-title');
		this.author.textContent = meta.creator;
		this.dash = document.getElementById('title-separator');
		this.dash.style.display = 'inline-block';

		document.title = meta.title + " – " + meta.creator;
	}
}
