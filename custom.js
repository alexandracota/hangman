
var wordList = ["hat","boots","scarf","sunglasses","jacket","sweater","shirt","necklace"];
var Hangman;
var wordToGuess;
var Game;
var listOfLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];


var wordToGuess = {}

	wordGuess.start = function(listOfWords) {
		this.listOfWords = (listOfWords);
		this.generateKey(this.selectWord());
		this.generateRevealedLetters();
	//},

	selectWord: function() {
		return this.listOfWords[Math.floor(Match.random() * this.listOfWords.length)];
	},

	setCustomWord: function(customWord) {
		this.generateKey(customWord);
		this.generateRevealedLetters();
	},

	generateKey: function(word) {
		this.key = word.split("");
	},

	generateRevealedLetters: function() {
		this.revealedLetters = [];
		for (var i = this.key.length; i > 0; i--) {
			this.revealedLetters.push("");
		}
	},

	hasGuessedLetter: function(guessedLetter) {
		return this.key.some(function(unguessedLetter) {
			return unguessedLetter === guessedLetter;
		});
	},

	revealLetters: function(guessedLetter) {
		var key = this.key;
		this.revealedLetters = this.revealedLetters.map(function(revealedLetter, index) {
			if (guessedLetter === key[index]) {
				return guessedLetter;
			} 
			else {
				return revealedLetter;
			}
		});
	},

	isRevealed: function() {
		return !this.revealedLetters.some(function(letter) {
			return letter === "";
		});
	}
};

Game = {

	initialize: function(listOfWords) {
		
		this.guessedLetters = [];
		
		this.incorrectGuessedLetters = [];
		
		var hangman = Object.create(Hangman);
		
		this.setHangman(hangman);

		wordToGuess = Object.create(wordToGuess);
		
		wordToGuess.initialize(listOfWords);
		
		this.setWordToGuess(wordToGuess);
	},

	setWordToGuess: function(word) {
		
		this.wordToGuess = word;
	},

	setHangman: function(hangman) {
		
		this.hangman = hangman;
	},

	makeGuess: function(letter) {
		
		this.markLetterAsGuessed(letter);
		
		if (this.wordToGuess.hasGuessedLetter(letter)) {
			this.wordToGuess.revealLetters(letter);
		}
		
		else {
			this.markLetterAsIncorrectGuess(letter);
			this.hangman.addBodyPart();
			}
		},

	markLetterAsGuessed: function(letter) {
		
		this.guessedLetters.push(letter);
	},

	hasBeenGuessed: function(letter) {
		
		return this.guessedLetters.some(function(guessedLetter) {
			
			return guessedLetter === letter;
			});
	},

	markLetterAsIncorrectGuess: function(letter) {
		
		this.incorrectGuessedLetters.push(letter);
	},

	isOver: function(hangman, wordToGuess) {
		
		return hangman.isComplete() || wordToGuess.isRevealed();
	}
};

$(function() {
	var game;

	function newGame(listofWords) {
		game = Object.create(Game);
		game.initialize(listOfWords);

		$('#incorrect-guesses h3').empty().append("Incorrect Guesses");

		$('word-container').empty();
		game.wordToGuess.revealedLetters.forEach(function(letter) {
			$("word-container").append("<p class='letter'>" + letter + "</p>");
		});

		$('#ungessed-letters').empty();
		game.listOfLetters.forEach(function(letter) {
			$("#unguessed-letters").append("<span class='letter-choice'>" + letter + "</span>");
		});

		$(".letter-choice").click(function() {
			console.log("click");
			$(this).addClass("muted");
			var guessedLetter = $(this).text();

			if (game.hasBeenGuessd(guessedLetter)) {
				console.log("If this has been guessd");
				console.log("guessedLetter: " + guessedLetter);
				console.log("Oops! You've already guessed that letter.");
			}
			else {
				game.makeGuess(guessedLetter);
				console.info("The guessed letters");
				console.log(game.guessedLetters);

			$('#word-container').empty();
			game.wordToGuess.revealedLetters.forEach(function(letter) {
			$('#word-container').append("<p class='letter'>" + letter + "</p>");
		});

		$('div#hangman-sprite').removeClass().addClass('hangman-sprite' + game.hangman.bodyParts);

		$('#incorrect-guesses h3').empty().append("Incorrect Guesses: ");
		game.incorrectGuessedLetters.forEach(function(letter) {
			$('#incorrect-guesses h3').append(letter + " ");
		})

		if (game.isOver) {
			winningCondition(game);
		}
	}
});

}

function winningCondition(gameObject) {
	if (gameObject.hangman.isComplete()) {
		$('#word-container').empty();
		gameObject.wordToGuess.key.forEach(function(letter) {
			$('#word-container').append("<p class='letter red'>" + letter + "</p>");
		});
		console.log("You lose. Try Again.");
		$("button#play-again").fadeIn();
		game.guessedLetters = [];
	}
	else if (gameObject.wordToGuess.isRevealed()) {
	$('#word-container').empty();
	gameObject.wordToGuess.key.forEach(function(letter) {
		$('#word-container').append("<p class='letter green'>" + letter + "</p>");
	});
	console.log("You win!");
	$("button#play-again").fadeIn();
	game.guessedLetters = [];	
		
	}
}

$("#choose-category ul li").click(function() {
	var categoryChoice = $(this).attr("id");
	$(".game-setup").fadeOut();
	$(".initially-hidden").delay(400).fadeIn();
	newGame(wordLists[categoryChoice]);
});

$("#play-again").click(function() {
	$(this).fadeOut();
	$(".initially-hidden").fadeOut();
	$(".game-seup").delay(400).fadeIn();
	$("#hangman-sprite").delay(400).removeClass().addClass("hangman-sprite0");
});

console.log(wordList(), Hangman(), wordToGuess(), Game(), listOfLetters())
});





















