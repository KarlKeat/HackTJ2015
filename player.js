function player(){
	this.hp = 100;
	this.speed = 1;
	this.atk = 1;
	this.xpos = 100;
	this.ypos = 100;
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
		return this.xpos;
	}
	function getyPos()
	{
		return this.ypos;
	}
	function move()
	{
		var code = e.keyCode ? e.keyCode : e.which;
		if (code == 37) //left
			this.xpos = this.xpos - this.speed;
		else if (code == 38) //up
			this.ypos = this.ypos + this.speed;
		else if (code == 39) //right
			this.xpos = this.xpos + this.speed;
		else if (code == 40) //down
			this.ypos = this.ypos - this.speed;
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
	this.xpos = player().getxPos();
	this.ypos = player().getyPos();
	function move()
	{
		if (code == 37) //left
			this.xpos = this.xpos - this.speed;
		if (code == 38) //up
			this.ypos = this.ypos - this.speed;
		if (code == 39) //right
			this.xpos = this.xpos - this.speed;
		if (code == 40) //down
			this.ypos = this.ypos - this.speed;
	}
	function getAtk()
	{
		return this.atk;
	}
}
