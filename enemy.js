function Enemy(genome){
	this.maxhp = genome.getMaxHP();
	this.hp = genome.getMaxHP();
	this.speed = genome.getSpeed();
	this.movPattern = genome.getMovPattern();
	this.atkPattern = genome.getAtkPattern();

	function getHP()
	{
		return this.hp;
	}
	function getMaxHP()
	{
		return this.maxhp;
	}
	function getSpeed()
	{
		return this.speed;
	}
	function getMovPattern()
	{
		return this.movPattern;
	}
	function getAtkPattern()
	{
		return this.atkPattern;
	}
	function setHP(x)
	{
		this.hp = x;
	}
	function setSpeed(x)
	{
		this.speed = x;
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
function Genome(mhp,spd,mov,atk)
{
	this.maxhp = mhp;
	this.speed = spd;
	this.movPattern = mov;
	this.atkPattern = atk;

	function getMaxHP()
	{
		return this.maxhp;
	}
	function getSpeed()
	{
		return this.speed;
	}
	function getMovPattern()
	{
		return this.movPattern;
	}
	function getAtkPattern()
	{
		return this.atkPattern;
	}
	
	function mutate()
	{
		var x = Math.floor((Math.random()*5)+1);
		if(x==1)
		{
			var plusorminus = Math.floor((Math.random()*2)+1);
			var size = Math.floor((Math.random()*20)+1);
			if(plusorminus==1)
			{
				this.maxhp += size;
			}
		}
		x = Math.floor((Math.random()*5)+1);
		if(x==1)
		{
			var plusorminus = Math.floor((Math.random()*2)+1);
			var size = Math.floor((Math.random()*5)+1);
			if(plusorminus==1)
			{
				this.spd += size;
			}
		}
		this.atkPattern.mutate();
		this.movPattern.mutate();
	}
}
function AttackPattern(can,dmg,num,spd)
{
	this.capable = can;
	this.damage = dmg;
	this.shotNumber = num;
	this.speed = spd;

	function canAttack()
	{
		return this.capable;
	}
	function getDamage()
	{
		return this.damage;
	}
	function getShotNumber()
	{
		return this.shotNumber;
	}
	function getShotSpeed()
	{
		return this.speed;
	}
	function move()
	{
		//to be implemented
	}
	function mutate()
	{
		//to be implemented
	}
}
