function Enemy(genome,x,y){
	this.maxhp = genome.maxhp;
	this.hp = genome.maxhp;
	this.speed = genome.speed;
	this.movPattern = genome.movPattern;
	this.atkPattern = genome.atkPattern;
	this.XPos = x;
	this.YPos = y;
	this.lifespan = 0;
	this.direction = 1;
	this.sprite = "Graphics/SlimeMove1.png";
	this.getHP = function getHP()
	{
		return this.hp;
	}
	this.maxHP = function maxHP()
	{
		return this.maxhp;
	}
	this.getSpeed = function getSpeed()
	{
		return this.speed;
	}
	this.getMovPattern = function getMovPattern()
	{
		return this.movPattern;
	}
	this.getAtkPattern = function getAtkPattern()
	{
		return this.atkPattern;
	}
	this.setHP = function setHP(x)
	{
		this.hp = x;
	}
	this.setSpeed = function setSpeed(x)
	{
		this.speed = x;
	}
	this.move = function move(tick, pXPos, pYPos) //takes in tick number and player x/YPos
	{
		if (tick % 10 == 0)
		{
			sprite = "Graphics/SlimeMove" + this.count + ".png";
			this.count++;
			if (this.count > 11)
				this.count = 1;
		}
		if (tick % 100 == 0)
		{
			 if (this.mov.getCapable()) //if follows player
			{
				if (this.XPos < pXPos)
					this.XPos = this.XPos + this.speed;
				if (this.YPos < pYPos)
					this.YPos = this.YPos + this.speed;
				if (this.XPos > pXPos)
					this.XPos = this.XPos - this.speed;
				if (this.YPos > pYPos)
					this.YPos = this.YPos - this.speed;
			}
			else
			{
				var move = this.move.getCommandSequence().splice(0, 1);
				if (move == 1) //north
					this.YPos = this.YPos + this.speed;
				else if (move === 2) //east
					this.XPos = this.XPos + this.speed;
				else if (move === 3) //south
					this.YPos = this.YPos - this.speed;
				else //west
					this.XPos = this.XPos - this.speed;
				this.move.getCommandSequence().push(move);
			}
		}
	}
	this.renderEnemy = function renderEnemy()
	{
		ctx.drawImage(new Image(sprite),this.XPos,this.YPos);
	}
	this.shoot = function shoot()
	{
		projectiles.push(new bullet(atkPattern.getDamage(),atkPattern.getShotSpeed(),this.XPos,this.YPos,direction,false));
	}
	this.isDead = function isDead()
	{
		if(this.hp<=0)
			return true;
		else
			return false;
	}
	this.getXPos = function getXPos()
	{
		return XPos;
	}
	this.getYPos = function getYPos()
	{
		return YPos;
	}
	this.incrementLifespan = function incrementLifespan()
	{
		lifespan++;
	}
	this.getLifespan = function getLifespan()
	{
		return lifespan;
	}
	return this;
}
