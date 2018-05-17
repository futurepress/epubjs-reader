Epub.js Reader
================================

![Demo](http://fchasen.com/futurepress/epubjs-reader_moby-dick.png)

[Try it while reading Moby Dick](http://futurepress.github.com/epubjs-reader/)

About the Reader
-------------------------

[Epub.js](http://futurepress.github.com/epub.js/) library.


Getting Started
-------------------------

Open up [reader/index.html](http://futurepress.github.com/epubjs-reader/index.html) in a browser.

You can change the ePub it opens by passing a link to bookPath in the url:

`?bookPath=https://s3.amazonaws.com/epubjs/books/alice.epub`

Running Locally
-------------------------

Install [node.js](http://nodejs.org/)

Then install the project dependences with npm

```javascript
npm install
```

You can run the reader locally with the command

```javascript
node start
```

Builds are concatenated and minified using [gruntjs](http://gruntjs.com/getting-started)

To generate a new build run

```javascript
grunt
```

Or, to generate builds as you make changes run

```
grunt watch
```

Additional Resources
-------------------------

[Epub.js Developer Mailing List](https://groups.google.com/forum/#!forum/epubjs)

IRC Server: freenode.net Channel: #epub.js

Follow us on twitter: @Epubjs

+ http://twitter.com/#!/Epubjs

Other
-------------------------

EPUB is a registered trademark of the [IDPF](http://idpf.org/).
