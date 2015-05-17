function bullet(atk, speed, xp, yp, direct, friend)
{
	this.atk = atk;
	this.speed = speed;
	this.direction = direct;
	this.XPos = xp;
	this.YPos = yp;
	this.friendly = friend;
	sprites = ["Graphics/Bullet1.png","Graphics/Bullet2.png","Graphics/Bullet3.png","Graphics.Bullet4.png"]
	sprite = sprites[0];
	if (this.direction == 37) //left
		sprite = sprites[4];
	else if (this.direction == 38) //up
		sprite = sprites[1];
	else if (this.direction == 39) //right
		sprite = sprites[2];
	else if (this.direction == 40) //down
		sprite = sprites[3];
	this.renderProj = function renderProj()
	{
		ctx.drawImage(new Image(sprite),this.XPos,this.YPos);
	}
	this.move = function move()
	{
		if (this.direction == 37) //left
			this.XPos = this.XPos - this.speed;
		else if (this.direction == 38) //up
			this.YPos = this.YPos - this.speed;
		else if (this.direction == 39) //right
			this.XPos = this.XPos - this.speed;
		else if (this.direction == 40) //down
			this.YPos = this.YPos - this.speed;
	}
	this.getAtk = function getAtk()
	{
		return this.atk;
	}
	this.isFriendly = function isFriendly()
	{
		return friendly;
	}
	return this;
}
