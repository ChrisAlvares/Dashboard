var Shapes = {};

(function($, sp)
{
	
	sp.ManipulativeShape = function()
	{
		this.shape = null;
		this.direction = null;
	}
	
	sp.ManipulativeShape.TopToBottom = 1;
	sp.ManipulativeShape.BottomToTop = 2;
	sp.ManipulativeShape.LeftToRight = 3;
	sp.ManipulativeShape.RightToLeft = 4;
	
	
	sp.ManipulativeShape.prototype.addToLayer = function(layer)
	{
		//we need to set the starting position 

		var pos = this.getStartingPosition(layer.getWidth(), layer.getHeight());
		this.shape.setX(pos.x);
		this.shape.setY(pos.y);
		
		this.speed = this.getRandomSpeed();
	
		layer.add(this.shape);
	}
	
	sp.ManipulativeShape.prototype.getRandomColor = function()
	{
        return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
	}
	
	sp.ManipulativeShape.prototype.getRandomSize = function(min, max)
	{
		return Math.random() * (max-min) + min
	}
	
	sp.ManipulativeShape.prototype.getStartingPosition = function(width, height)
	{

		var position = {x:0, y:0};
		
		this.directionVertical = (Math.floor(Math.random()*2)==0)?
			sp.ManipulativeShape.TopToBottom:
			sp.ManipulativeShape.BottomToTop;
			
		this.directionHorizontal = (Math.floor(Math.random()*2)==0)?
			sp.ManipulativeShape.LeftToRight:
			sp.ManipulativeShape.RightToLeft;
			
		if(this.directionVertical == sp.ManipulativeShape.TopToBottom)
			position.y = 0 - (Math.random() * 200 + this.shape.getHeight());
		else
			position.y = height + (Math.random() * 200 + this.shape.getHeight());
			
		if(this.directionHorizontal == sp.ManipulativeShape.LeftToRight)
			position.x = 0 - (Math.random() * 200 + this.shape.getWidth());
		else
			position.x = width + (Math.random() * 200 + this.shape.getWidth());

		return position;	
	}
	
	
	sp.ManipulativeShape.prototype.getRandomOpacity = function()
	{
		return Math.random() + .1;
	}
	
	sp.ManipulativeShape.prototype.getRandomSpeed = function()
	{
		return Math.random() * 10;
	}
	
	sp.ManipulativeShape.prototype.step = function()
	{
		if(this.directionVertical == sp.ManipulativeShape.TopToBottom)
			this.shape.setY(this.shape.getY()+this.speed);
		else
			this.shape.setY(this.shape.getY()-this.speed);
		
		if(this.directionHorizontal == sp.ManipulativeShape.LeftToRight)
			this.shape.setX(this.shape.getX()+this.speed);
		else
			this.shape.setX(this.shape.getX()-this.speed);
		

	}

})(jQuery, Shapes);