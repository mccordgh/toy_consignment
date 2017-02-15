"use strict";

let db = require('./dbInteractions.js'),
		View = require('./View.js'),
		toys = [];

let Model = {
	initialize(){
		console.log("init");
		this.loadToys();
		View.setupViews();
	},
	filterHandler(toys, toyFilter){
		let tmpArray = $.grep(toys, function(i) {
			return i.name.toLowerCase().indexOf(toyFilter.toLowerCase()) > -1;
		});
		View.displayToys(tmpArray);
	},
	loadToys(){
		console.log("LOAD TOYS");
		db.getAllToys()
		.then((data) => {
			toys = data;
			console.log("TOYS", data);
			View.setToyArray(toys);
			View.displayToys(toys);
			$('.cardImage').click((event) => {
				View.displaySingleToy(Model.getToys()[event.target.id]);
			});
			$('.delButton').click((event) => {
				let grabID = $(event.target).attr("data--id");
				db.deleteToyFromFB(grabID)
					.then(() => {
						alert(`${toys[grabID].name} deleted from database!`);
						this.loadToys();
					});
			});
		}).catch((error) => {
			console.log("error", error);
		});
	},
	getToys(){
		return toys;
	},
	addToy(toyObj){
		toys[Object.keys(toys).length] = toyObj;
		db.addToyToFB(toyObj);
		alert(`${toyObj.name} added to database!`);
	}
};

module.exports = Model;