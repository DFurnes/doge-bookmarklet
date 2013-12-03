(function() {
  "use strict";


  // get body text
  function getBodyText(win) {
    var doc = win.document, body = doc.body, selection, range, bodyText;
    if (body.createTextRange) {
      return body.createTextRange().text;
    } else if (win.getSelection) {
      selection = win.getSelection();
      range = doc.createRange();
      range.selectNodeContents(body);
      selection.addRange(range);
      bodyText = selection.toString();
      selection.removeAllRanges();
      return bodyText;
    }
  }

  // get heading text, weighted appropriately
  function getHeadingText() {
    var h1s = document.getElementsByTagName("h1");
    var h2s = document.getElementsByTagName("h2");

    var weightedHeadingWords = "";

    for(var i = 0; i < h1s.length; i++) {
      if(h1s[i] && h1s[i].textContent) {
        weightedHeadingWords = weightedHeadingWords + h1s[i].textContent + h1s[i].textContent;
      }
    }

    for(var j = 0; j < h2s.length; j++) {
      if(h2s[i] && h2s[i].textContent) {
        weightedHeadingWords = weightedHeadingWords + h2s[i].textContent;
      }
    }

    return weightedHeadingWords;
  }

  function isntCommonWord(element) {
    var testWord = element.toLowerCase();
    
    var bannedWords = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it",
                       "for", "not", "on", "with", "he", "as", "at", "this", "we", "is", "an",
                       "you", "her", "she", "or", "an", "my", "their", "so", "if", "there", "its",
                       "our", "your", "are", "will", "such", "so", "much", "plz", "nice", "wow", "ago"];

    // kill empty string
    if(testWord === "") {
      return false;
    }

    // kill it if it has anything but letters
    if ( testWord.match(/[^a-zA-Z]/) ) {
      return false;
    }

    // kill any banned words
    for(var i = 0; i < bannedWords.length; i++) {
      if (testWord === bannedWords[i]) {
        return false;
      }
    }

    // then I guess we're okay...
    return true;
  }

  function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        arr.push({
          "key": prop,
          "value": obj[prop]
        });
      }
    }
    arr.sort(function(a, b) { return b.value - a.value; });
    //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
    return arr; // returns array
  }

  function topTenWordsOnPage() {
    // split body text into array
    var bodyText = getBodyText(window);
    var headingText = getHeadingText();

    var textArray = (bodyText + " " + headingText).split(/[\n\r\s]/);
    textArray = textArray.filter(isntCommonWord);

    var weightedObj = {};
    for(var i = 0; i < textArray.length; i++) {
      if(weightedObj[textArray[i]]) {
        weightedObj[textArray[i]] += 1;
      } else {
        weightedObj[textArray[i]] = 1;
      }
    }

    var sortedArray = sortObject(weightedObj);

    var topTen = [];
    for(var k = 0; k < (10 || sortedArray.length); k++) {
      topTen.push(sortedArray[k].key);
    }

    return topTen;
  }


  // do the things with the fonts
  function setProperTypeface() {
    var head = document.getElementsByTagName("head")[0];
    var comicify = document.createElement("style");
    var css = "* {font-family: Comic Sans MS !important;}";

    if (comicify.styleSheet){
      comicify.styleSheet.cssText = css;
    } else {
      comicify.appendChild(document.createTextNode(css));
    }

    head.appendChild(comicify);
  }

  // add doge
  function muchDoge() {
    var dogeContainer = document.createElement("div");

    dogeContainer.style.position = "fixed";
    dogeContainer.style.bottom = (Math.random() * 90) + "%";
    dogeContainer.style.right = (Math.random() * 90) + "%";
    dogeContainer.style.zIndex = 999999;


    var doge = document.createElement("img");
    doge.src = "http://ds-neue.dev/doge-sm.gif";
    doge.style.position = "absolute";
    doge.style.top = "0";
    doge.style.left = "0";

    var scaleFactor =  1 + (Math.random() * 3);
    doge.width = doge.width * scaleFactor;
    doge.height = doge.height * scaleFactor;

    dogeContainer.appendChild(doge);

    for(var i = 0; i < 3; i++) {
      dogeContainer.appendChild( soConcept() );
    }
    
    document.body.appendChild(dogeContainer);
  }

  // add concepts to doge
  function soConcept() {
    var concept = document.createElement("p");
    concept.style.position = "relative";
    concept.style.top = ( -50 + Math.random() * 90) + "%";
    concept.style.left = ( -50 + Math.random() * 90) + "%";
    
    var colors = ["red", "pink", "green", "blue", "yellow", "orange"];

    var modifiers = ["such", "so", "much", "plz", "nice", "wow"];
    var words = topTenWordsOnPage();

    concept.style.color = colors[Math.ceil(Math.random() * colors.length - 1)];
    concept.style.fontSize = (20 + Math.random() * 60) + "px";
    concept.innerHTML = modifiers[Math.ceil(Math.random() * modifiers.length - 1)] + " " + words[Math.ceil(Math.random() * words.length - 1)];
  
    return concept;

  }

  // much javascripts. make it happen:
  for(var i = 0; i < (Math.random() * 15 + 2); i++) {
    muchDoge();
  }

  setProperTypeface();


})();