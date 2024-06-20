

let sentences = [];
let likedSentences = [];
let dislikedSentences = [];

// Fetch the sentences from sentences.json
fetch('bible.json')
  .then(response => response.json())
  .then(data => {
    // Book:Chapter:Verse is the format
    // with verseId as the key


    sentences = data.Book.flatMap(c => c.Chapter.flatMap(v => v.Verse));

    showRandomSentence();
  })
  .catch(error => console.error('Error fetching sentences:', error));

function showRandomSentence() {
  if (sentences.length === 0) {
    document.getElementById('sentenceCard').innerText = 'No more sentences!';
    return;
  }
  const randomIndex = Math.floor(Math.random() * sentences.length);
  const sentence = sentences[randomIndex]; // this is an object like : {Verseid, Verse}
  document.getElementById('sentenceCard').innerText = `${sentence.Verse}\n\n${verseReference(sentence.Verseid)}`;
  document.getElementById('sentenceId').innerText = sentence.Verseid;

  cardElement.style.transform = `translateX(0px)`;
  cardElement.style.opacity = '1';
}

function verseReference(verseId) {

  //verseReference 02001002 is 2 chars for book, 3 chars for chapter, 3 chars for verse

  const books = [
    "Genesis",
    "Exodus",
    "Leviticus",
    "Numbers",
    "Deuteronomy",
    "Joshua",
    "Judges",
    "Ruth",
    "1 Samuel",
    "2 Samuel",
    "1 Kings",
    "2 Kings",
    "1 Chronicles",
    "2 Chronicles",
    "Ezra",
    "Nehemiah",
    "Esther",
    "Job",
    "Psalms",
    "Proverbs",
    "Ecclesiastes",
    "Song of Solomon",
    "Isaiah",
    "Jeremiah",
    "Lamentations",
    "Ezekiel",
    "Daniel",
    "Hosea",
    "Joel",
    "Amos",
    "Obadiah",
    "Jonah",
    "Micah",
    "Nahum",
    "Habakkuk",
    "Zephaniah",
    "Haggai",
    "Zechariah",
    "Malachi",
    "Matthew",
    "Mark",
    "Luke",
    "John",
    "Acts",
    "Romans",
    "1 Corinthians",
    "2 Corinthians",
    "Galatians",
    "Ephesians",
    "Philippians",
    "Colossians",
    "1 Thessalonians",
    "2 Thessalonians",
    "1 Timothy",
    "2 Timothy",
    "Titus",
    "Philemon",
    "Hebrews",
    "James",
    "1 Peter",
    "2 Peter",
    "1 John",
    "2 John",
    "3 John",
    "Jude",
    "Revelation"
  ];

  const book = books[parseInt(verseId.slice(0, 2))];
  const chapter = parseInt(verseId.slice(2, 5)) + 1;
  const verse = parseInt(verseId.slice(5, 8)) + 1;
  return `${book} ${chapter}:${verse}`;
}

const cardElement = document.getElementById('sentenceCard');
cardElement.addEventListener('touchstart', touchStart());
cardElement.addEventListener('touchend', touchEnd);
cardElement.addEventListener('touchmove', touchMove);

let isDragging = false;
let startX;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

function touchStart() {
  return function (event) {
    startX = event.touches[0].clientX;
    isDragging = true;

    animationID = requestAnimationFrame(animation);
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - startX;
    currentTranslate = prevTranslate + deltaX;

    const movedBy = currentTranslate - prevTranslate;

    if(movedBy < -100){
      cardElement.classList.add('dislike');
    } else if(movedBy > 100){
      cardElement.classList.add('like');
    } else {
      cardElement.classList.remove('like', 'dislike');
    }
  

    
  }
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  const verseId = document.getElementById('sentenceId').innerText;

  if (movedBy < -100) {
    cardElement.style.transform = `translateX(-100%)`;
    cardElement.style.opacity = '0';
    dislikedSentences.push(verseId);
    console.log(`disliked verse ${verseId}`)
    
    resetCard();
    prevTranslate = 0;
  } else if (movedBy > 100) {
    cardElement.style.transform = `translateX(100%)`;
    cardElement.style.opacity = '0';
    likedSentences.push(verseId);
    
    console.log(`liked verse ${verseId}`)
    resetCard();
    prevTranslate = 0;
  } else {
    currentTranslate = prevTranslate;
    cardElement.style.transform = `translateX(${currentTranslate}px)`;
  }
}

function resetCard() {
  setTimeout(() => {
    showRandomSentence();
    cardElement.style.transition = 'none';
    cardElement.style.transform = 'translateX(0)';
    cardElement.style.opacity = '1';
    isDragging = false;
    currentTranslate = 0;
    prevTranslate = 0;
    cardElement.classList.remove('hidden', 'like', 'dislike');

  }, 300);
  setTimeout(() => {
    requestAnimationFrame(() => {
      cardElement.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
    });
  }, 400);

  
}

function animation(verseId) {
  cardElement.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}



function swipeCard(action) {
  const card = document.getElementById('sentenceCard');
  const sentenceId = document.getElementById('sentenceId').innerText;

  if (action === "like") {

  } else {

  }
  card.classList.add(action === 'like' ? 'like' : 'dislike');
  card.classList.add('hidden');

  setTimeout(() => {
    card.classList.remove('hidden', 'like', 'dislike');
    showRandomSentence();
  }, 300);
}


