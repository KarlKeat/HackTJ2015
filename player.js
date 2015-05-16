function player(){
	this.hp = 100;
	this.maxhp = 100;
	this.speed = 1;
	this.atk = 1;
	this.xPos = 100;
	this.yPos = 100;
	function getHP()
	{
		return this.hp;
	}
	function getSpeed()
	{
		return this.speed;
	}
	function getAtk()
	{
		return this.atk;
	}
	function setHP(hp)
	{
		this.hp = hp;
	}
	function refill()
	{
		this.hp = this.maxhp;
	}
	function setSpeed(speed)
	{
		this.speed = speed;
	}
	function setAtk(atk)
	{
		this.atk = atk;
	}
	function isDead()
	{
		return this.hp <= 0;
	}
	function getxPos()
	{
		return this.xPos;
	}
	function getyPos()
	{
		return this.yPos;
	}
	function move()
	{
		var code = e.keyCode ? e.keyCode : e.which;
		if (code == 37) //left
			this.xPos = this.xPos - this.speed;
		else if (code == 38) //up
			this.yPos = this.yPos + this.speed;
		else if (code == 39) //right
			this.xPos = this.xPos + this.speed;
		else if (code == 40) //down
			this.yPos = this.yPos - this.speed;
		return code;
	}
	function shoot()
	{
		var bullet = bullet(atk, speed, move());
	}
}
function bullet(atk, speed, direct)
{
	this.atk = atk;
	this.speed = speed;
	this.direction = direct;
	this.xPos = player().getxPos();
	this.yPos = player().getyPos();
	function move()
	{
		if (this.direction == 37) //left
			this.xPos = this.xPos - this.speed;
		if (this.direction == 38) //up
			this.yPos = this.yPos - this.speed;
		if (this.direction == 39) //right
			this.xPos = this.xPos - this.speed;
		if (this.direction == 40) //down
			this.yPos = this.yPos - this.speed;
	}
	function getAtk()
	{
		return this.atk;
	}
}
