(function($, window)
{

	Shapes.Circle = function()
	{
		
		this.shape = new Kinetic.Circle({
        	x:-1000,
        	y:-1000,
        	radius: this.getRandomSize(30, 100),
        	fill:this.getRandomColor(),
        	opacity:this.getRandomOpacity()
        });
        
	}
	
	Shapes.Circle.prototype = new Shapes.ManipulativeShape();
	
})(jQuery, window);