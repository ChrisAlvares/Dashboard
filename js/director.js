(function($, document, window)
{
	var Director = function(opts) {

		$.extend(this.options, opts);
		
		var $c = $(this.options.container);
		
		this.stage = new Kinetic.Stage({
			container: $c[0],
			width: $c.width(),
			height: $c.height()
		});
		
		this.shapes = [];
		
		this.mainLayer = new Kinetic.Layer({
			width: this.stage.getWidth(),
			height: this.stage.getHeight()
		});
		this.stage.add(this.mainLayer);
		
		$(window).resize(function() {
			stage.setSize($c.width(), $c.height());
		});	
		
	}
	
	Director.prototype.options = {
		max:200, //number of circles to apply
		spawn_rate:5000 //in milliseconds
	}
	
	Director.prototype.start = function()
	{

		var d = this;
		var animation = new Kinetic.Animation(function(frame)
		{
			d.animate(frame);
		}, this.mainLayer);
		animation.start();	
    }
    
    Director.prototype.animate = function(frame)
    {
	    if(this.shouldSpawnCircle(frame))
	    {
		    alert("test");
	    }
	    
    }
    
    Director.prototype.shouldSpawnCircle = function(frame)
    {

	    if(typeof this.lastFrameTime === 'undefined')
	    {
	    	this.lastFrameTime = frame.time;
	    	this.addShape();
	    }	
	    if((frame.time - this.lastFrameTime) > this.options.spawn_rate)
	    {
	    	this.addShape();
		    this.lastFrameTime = frame.time;
	    }
	    for(var index in this.shapes)
	    {
		    this.shapes[index].step();
	    }
    }
    
    Director.prototype.addShape = function()
    {
    	var circle = new Shapes.Circle();
    	circle.addToLayer(this.mainLayer);
	    this.shapes.push(circle);
    }
	
	
	
	/*
		Create the jQuery plugin
	*/
	$.fn.dashboardDirector = function (options) {
		if(typeof options === 'undefined') options = {};
		return this.each(function () {
			$.extend(options, this.defaults, {container:$(this)[0]});
			var d = new Director(options);
			d.start();
		});
	}
	
	$.fn.dashboardDirector.defaults = {
		max:200, //the number of circles to apply
		spawn_rate:1000, //in milliseconds
	}


})(jQuery, document, window);