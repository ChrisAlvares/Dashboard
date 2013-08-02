var Shapes = {};

(function($, sp)
{
	
	sp.ManipulativeShape = function()
	{
		this.shape = null;
		this.direction = null;
		this.delegate = null;
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
		
		this.speedX = this.getRandomSpeed();
		this.speedY = this.getRandomSpeed();
				
		layer.add(this.shape);
	}
	
	sp.ManipulativeShape.prototype.on = function(event_str, callback)
	{
		var that = this;
		this.shape.on(event_str, function()
		{
			callback(that);
		});
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
		{
			this.shape.setY(this.shape.getY()+this.speedY);
			if(this.shape.getY() > (this.shape.getLayer().getHeight() + this.shape.getHeight())) {
				this.shape.destroy();
				return false;
			}
		}
		else
		{
			this.shape.setY(this.shape.getY()-this.speedY);
			
			if(this.shape.getY() < 0)
			{
				this.shape.destroy();
				return false;
			}
		}
		
		if(this.directionHorizontal == sp.ManipulativeShape.LeftToRight)
		{
			this.shape.setX(this.shape.getX()+this.speedX);
			
			if(this.shape.getX() > (this.shape.getLayer().getWidth() + this.shape.getWidth())) {
				this.shape.destroy();
				return false;
			}

		}
		else
		{
			this.shape.setX(this.shape.getX()-this.speedX);
			if(this.shape.getX() < 0) {
				this.shape.destroy();
				return false;
			}	
		}
		return true;
	}	
})(jQuery, Shapes);