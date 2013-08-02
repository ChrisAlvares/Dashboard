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
	    	this.addShape();
	    }
	    
	    for(var index=0;index<this.shapes.length;index++)
	    {
		    if(!this.shapes[index].step())
		    {
			    this.shapes.splice(index, 1);
			    index--;
		    }
	    }
    }
    
    Director.prototype.shouldSpawnCircle = function(frame)
    {

	    if(typeof this.lastFrameTime === 'undefined')
	    {
	    	this.lastFrameTime = frame.time;
	    	return true;
	    }	
	    if((frame.time - this.lastFrameTime) > this.options.spawn_rate)
	    {
		    this.lastFrameTime = frame.time;
		    return true;
	    }
	    return false;
    }
    
    Director.prototype.addShape = function()
    {
    	if(typeof this.uniqueId === 'undefined')
    		this.uniqueId = 0;
    	this.uniqueId++;
    	
    	var circle = new Shapes.Circle();
    	circle.addToLayer(this.mainLayer);
    	circle.id = this.uniqueId;
    	circle.on('mouseover', function(shape)
    	{
	    	window.hue.setColor(3, shape.getColor().replace(/#/, ''));

    	});
    	
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