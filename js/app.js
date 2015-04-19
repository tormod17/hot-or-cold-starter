
var guess;
var guesses=[];
var randomNumber;
var count=0;
var diff;
var oldDiff;
var temperature ='';


$(document).ready(function(){
	// prevents enter reloading the page
		$('#userGuess').keypress(function (e) {                                       
	       		if (e.which == 13) {
		            e.preventDefault();
	    	       }
		});

		/*--- Display information modal box ---*/
	  	$(".what").click(function(){
	    	$(".overlay").fadeIn(1000);

	  	});
	  /*	--- Hide information modal box ---*/
	  	$("a.close").click(function(){
	  		$(".overlay").fadeOut(1000);
	  	});

	  	$('#userGuess').keyup(function(){
	  		if ( randomNumber === undefined){
	  			alert('click new game -top right corner');
	  		}
	  	});
	

		newGame()

		qualifyInput()

		sortGuesses()



//Starts a new game generates a random -secret answer 
//and sets input value to nothing aempties the guess list and resets count=0// 
	  
		function newGame(){
	 		  	
			$('.new').click(function() {
					randomNumber = Math.floor(Math.random() * (100- 0)) + 0;
					console.log('Secret answer' + randomNumber);
					$('#guessList').empty();
					$('#userGuess').val('');
					count = 0;
		 			$('#count').text(count);
		 			$('#feedback').text('Make Your Guess');
		 			$('#feedback').css("background","#cc324b");

			});
		}

//	On Click display the Guess and adds guess to array guesses ---/*/
		function sortGuesses() {

			$('#guessButton').click(function() {
				
					guess = $( '#userGuess' ).val();
					guesses.push(guess);	
					console.log(guess);
					console.log(typeof guess);
					
			
					$('#guessList').append('<li>'+ guess + '</li>');
					$('#userGuess').val('');
					
					measureFirstGuess ();
					compareGuesses ();
					winningGuess();
					count += 1;
					$('#count').text(count);
			});
		}

		

	// measure the guess against the secret answer and return 
		function measureFirstGuess() {

	 			diff= Math.abs(guess-randomNumber)
	 			console.log('diff'+ diff);			
		 			
		 			if ( count == 0 && diff >= 1 &&  diff <= 10 ) { 
						temperature  = 'very hot';
					} else if  (count == 0 &&  diff >= 11  &&  diff <= 20) {
						temperature  ='hot';
					} else if (count == 0 && diff >= 21 && diff <= 30 ){
						temperature  ='warm';
					} else if  (count == 0 &&  diff >= 31 && diff <= 40) {
					  	temperature  = 'cold';
					} else if (count == 0 &&  diff >= 41 ) {
						temperature  = 'ice cold';
					} 
			$('#feedback').text(temperature );	
		}			

 		function compareGuesses() {

 				oldDiff = Math.abs(randomNumber - guesses[guesses.length - 2]);
 				console.log('old diff' +' '+ oldDiff);
 			
 				if ( oldDiff > diff ){ 
				temperature  = 'hotter';
				} else if (oldDiff > diff && oldDiff < 10){
				temperature = 'much hotter';
				} else if ( oldDiff < diff ){
				temperature = 'colder'
				}else if (oldDiff < diff && oldDiff > 30 ) { 
				temperature  =' much colder';
				} 
				$('#feedback').text(temperature );
 		}		
		
		function winningGuess() {
			if (guess == randomNumber) {
				temperature = 'Well done, you got it!'
				$('#feedback').text(temperature );
				$('#feedback').css("background","green");
			}
		}	

		function qualifyInput() { 
			$('#userGuess').keyup(function(){
							input = $(this).val();
				if ((isNaN(input))||(input <= 0)||(input>100)){
					alert("it is a not NUMBER! between 1 and 100");
					$('#userGuess').val('');
				}
			});
			
			$('#guessButton').submit(function(e){
				if (input == " "){
				e.preventDefault();
				alert('please enter a number between 1 and 100');
				}

			});
		}			
});


		

	


 