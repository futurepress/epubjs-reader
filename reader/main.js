"use strict";

document.onreadystatechange = function () {

    if (document.readyState !== "complete")
        return;

    var url = "https://s3.amazonaws.com/moby-dick/";
    
    window.reader = ePubReader(url, { restore: true });
};