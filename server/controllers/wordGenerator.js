//======== Dependencies ==========
var axios = require("axios");
var _ = require("underscore");
var Word = require("../models/word");
const mongoose = require('mongoose');
mongoose.Promise = Promise;

//======== Array Variables ==============
//var foodType=[];  // <----------Uncomment Pass in database query here
// var randomArray = [];
// var finalArray = [];
var line =  "\n" + "==========================================================================================="  + "\n"  ;
var randomWords = {

	//***** Varriable below is for testing purposes*****
	foodType: ["punjabi", "italian", "mexican","chinese","russian","indian", "indian", "indian",
	 "spanish","mediterranean","ethiopian","moroccan", "greek","american","japanese","korean",
	 "gastropub","pizza","desserts","salad","burgers","pasta","seafood","thai","vegan","english",
	 "healthy","vegetarian","food","chinese","sandwiches","fast food","soup","meat","barbeque",
	 "vegetables","buffet","cocktails","drinks","beer"],
	randomArray: [],
	finalArray: [],


	// getWords: function(){


	// 	Word.find({})
	// 		.then((response) => {
	// 			console.log("@@@Request for all words", response);
	// 			// res.json(response);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			// res.json({
	// 			// 	"message": "---Something went wrong with the db",
	// 			// 	"err": err
	// 			// })
			
	// });
		
	// },
	
	chooseTenRandom: function(){
		this.randomArray = _.sample(this.foodType, 10);
		console.log(line + "\n" + "Original Array: " + "\n" );
		this.formatLog(this.randomArray);
		this.randomArray = this.removeDuplicates(this.randomArray);
		console.log( "Array Without Duplicates: " + "\n");
		this.formatLog(this.randomArray);
	},

	removeDuplicates: function(arr){
		var tempObj = {};
		var j =1;
		for(var i =0; i < arr.length; i++){
			tempObj[arr[i]] = j;
			j++;
		};
		var final =[];
		for(var key in tempObj)
			final.push(key);
		return final;
	},

	reduceArray: function (){
		// this.getWords();
		this.chooseTenRandom();
		this.finalArray = _.sample(this.randomArray, 5);
		console.log("Terms To Query: " + "\n");
		this.formatLog(this.finalArray);
		this.getFinalArray();
	},

	clearRandomArray: function(){
		this.randomArray = [];
		console.log("Array has been cleared: " + this.randomArray + line);
	},

	generateWords: function(){
		this.reduceArray();
	},

	getFinalArray: function() {
		 return this.finalArray;
	},

	formatLog: function(arr){
		for(var t=0; t < arr.length; t++){ 
			var q = t + 1 + ". ";
			console.log(q +arr[t]);
		}
		console.log(line);
	}
};


//Runs method to clear the randomArray
// function clearWords () {
// 	var clear = randomWords.clearRandomArray();
// }
randomWords.generateWords();
// randomWords.getWords();

// ****** Checks to make sure randomArray clear is working *****
// function checkClear () {
// 	for(i =0; i < randomArray.length; i++) {
// 		if (randomArray[i] === "thai" || randomArray[i] === "indian" || randomArray[i] === "mexican"){
// 			clearWords();
// 			console.log(randomArray);
// 		}
// 	}
// }



module.exports = randomWords


