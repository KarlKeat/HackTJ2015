function player(){
	this.hp = 100;
	this.speed = 1;
	this.atk = 1;
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
	function move()
	{
		//to be implemented
	}
	function shoot()
	{
		//to be implemented
	}
}
