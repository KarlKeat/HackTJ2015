function player(){
	this.hp = 100;
	this.maxhp = 100;
	this.speed = 1;
	this.atk = 1;
	this.XPos = 100;
	this.YPos = 100;
	this.direction = 1;
	i1 = "Graphics/PlayerIdle1.png";
	s1 = "Graphics/PlayerShoot1.png";
	i2 = "Graphics/PlayerIdle2.png";
	s2 = "Graphics/PlayerShoot2.png";
	s3 = "Graphics/PlayerShoot3.png";
	i3 = "Graphics/PlayerIdle3.png";
	s4 = "Graphics/PlayerShoot4.png";
	i4 = "Graphics/PlayerIdle4.png";
	sprite = "Graphics/PlayerIdle1.png";
	this.renderPlayer = function renderPlayer()
	{
		var l = new Image();
		l.src = sprite;
		ctx.drawImage(l,this.XPos,this.YPos);
	}
	this.getHP = function getHP()
	{
		return this.hp;
	}
	this.getSpeed = function getSpeed()
	{
		return this.speed;
	}
	this.getAtk = function getAtk()
	{
		return this.atk;
	}
	this.getDirection = function getDirection()
	{
		return direction;
	}
	this.setHP = function setHP(hp)
	{
		this.hp = hp;
	}
	this.refill = function refill()
	{
		this.hp = this.maxhp;
	}
	this.setSpeed = function setSpeed(speed)
	{
		this.speed = speed;
	}
	this.setAtk = function setAtk(atk)
	{
		this.atk = atk;
	}
	this.isDead = function isDead()
	{
		return this.hp <= 0;
	}
	this.getXPos = function getXPos()
	{
		return this.XPos;
	}
	this.getYPos = function getYPos()
	{
		return this.YPos;
	}
	this.move = function move(code)
	{
		sprite = spriteIdle;
		if (code == 37) //left
		{
			this.XPos = this.XPos - this.speed;
			direction = 4;
			sprite = i4;
		}
		else if (code == 38) //up
		{
			this.YPos = this.YPos + this.speed;
			direction = 1;
			sprite = i1;
		}
		else if (code == 39) //right
		{
			this.XPos = this.XPos + this.speed;
			direction = 2;
			sprite = i2;
		}
		else if (code == 40) //down
		{
			this.YPos = this.YPos - this.speed;
			direction = 3;
			sprite = i3;
		}
		return code;
	}
	this.shoot = function shoot()
	{
		if (direction == 4) //left
		{
			sprite = s4;
		}
		else if (direction == 1) //up
		{
			sprite = s1;
		}
		else if (direction == 2) //right
		{
			sprite = s2;
		}
		else if (direction == 3) //down
		{
			sprite = s3;
		}
		projectiles.push(new bullet(atk, speed, XPos, YPos, true, move()));
		projectiles.push(new bullet(atk, speed, XPos, YPos, true, move));
	}
	this.trap = function trap()
	{
		projectiles.push(new bullet(atk, 0, XPos, YPos, true, move));
	}
	return this;
}
