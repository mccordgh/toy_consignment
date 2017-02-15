"use strict";

console.log("CONTROLLER");

let Model = require('./Model.js'),
		Events = require('./Events.js');

Model.initialize();

$(function() {
	setEventListeners();
});

function setEventListeners(){
	$('#listAllButton').click((event) => {
		Model.loadToys();
		Events.listAllView(event);
	});

	$('#addButton').click((event) => {
		Events.addView(event);
	});

	$('.modal').click((event) => {
		$('#modalView').css('display', 'none');
	});

	$('#addToyBtn').click((event) => {
		if ($('#txtToyName').val() === "" || $('#txtToyURL').val() === "" || $('#txtToyPrice').val() === "" || $('#txtToyDesc').val() === "") {
			alert("Please fill in all fields!");
		} else {
			Model.addToy({
				desc: $('#txtToyDesc').val(),
				name: $('#txtToyName').val(),
				price: $('#txtToyPrice').val(),
				url: $('#txtToyURL').val()
			});
		}

	});

}
