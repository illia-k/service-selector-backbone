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
	
	var ServiceList = Backbone.Collection.extend({
		model: Service,
		getChecked: function(){
			return this.where({checked:true});
		}		
	});	
	
	var services = new ServiceList([
		new Service({title: "test1", price: 10}),
		new Service({title: "test2", price: 20}),
		new Service({title: "test3", price: 30}),
		new Service({title: "test4", price: 40})		
	]);
	
	var ServiceView = Backbone.View.extend({
		tagName: 'li',
		events:{
			'click': 'toggleService'	
		},
		initialize: function(){
			this.listenTo(this.model, 'change', this.render);	
		},
		render: function(){
			this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" /> ' + this.model.get('title') + '<span>$' + this.model.get('price') + '</span>');
			this.$('input').prop('checked', this.model.get('checked'));
			
			return this;			
		},		
		toggleService: function(){
			this.model.toggle();
		}		 		
	});
	
	var App = Backbone.View.extend({
		el: $('#main'),
		initialize: function(){
			this.total = $('#total span');
			this.list = $('#services');
			
			this.listenTo(services, 'change', this.render);
			
			services.each(function(service){
				var view = new ServiceView({model: service});
				this.list.append(view.render().el);
			}, this);
		},
		render: function(){
			var total = 0;
			
			_.each(services.getChecked(), function(elem){
				total += elem.get('price');
			});
			
			this.total.text('$' + total);
			
			return this;
		}
	});
	
	new App();	
	
});