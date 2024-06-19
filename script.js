

let sentences = [];
let likedSentences = [];
let dislikedSentences = [];

// Fetch the sentences from sentences.json
fetch('bible.json')
    .then(response => response.json())
    .then(data => {
        // Book:Chapter:Verse is the format
        // with verseId as the key


        sentences = data.Book.flatMap(c=>c.Chapter.flatMap(v=>v.Verse));

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
  const chapter = parseInt(verseId.slice(2, 5))+1;
  const verse = parseInt(verseId.slice(5, 8))+1;
  return `${book} ${chapter}:${verse}`;
}

const cardElement = document.getElementById('sentenceCard');
const hammertime = new Hammer(cardElement);

hammertime.on('pan', function(event) {
    cardElement.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px)`;
    if (event.deltaX > 100) {
        cardElement.classList.add('like');
        cardElement.classList.remove('dislike');
    } else if (event.deltaX < -100) {
        cardElement.classList.add('dislike');
        cardElement.classList.remove('like');
    } else {
        cardElement.classList.remove('like');
        cardElement.classList.remove('dislike');
    }
});

hammertime.on('panend', function(event) {
    cardElement.style.transform = 'translate(0, 0)';
    if (event.deltaX > 100) {
        swipeCard('like');
    } else if (event.deltaX < -100) {
        swipeCard('dislike');
    }
    cardElement.classList.remove('like', 'dislike');
});


function swipeCard(action) {
    const card = document.getElementById('sentenceCard');
    const sentenceId = document.getElementById('sentenceId').innerText;

    if(action === "like"){
      likedSentences.push(sentenceId);
    } else {
      dislikedSentences.push(sentenceId);
    }
    card.classList.add(action === 'like' ? 'like' : 'dislike');
    card.classList.add('hidden');

    setTimeout(() => {
        card.classList.remove('hidden', 'like', 'dislike');
        showRandomSentence();
    }, 300);
}


