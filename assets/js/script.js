/// <reference path="lib/jquery.min.js" />
/// <reference path="lib/backbone-min.js" />
/// <reference path="lib/underscore-min.js" />
$(function(){
		
	var Service = Backbone.Model.extend({
		
		defaults:{
			title: 'My service',
			price: 100,
			checked: false
		},
		
		toggle: function(){
			this.set('checked', !this.get('checked'));
		}	
	});		
});