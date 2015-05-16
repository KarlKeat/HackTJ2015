
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
function Genome(mhp,spd,mov,atk,dmg)
{
	this.maxhp = mhp;
	this.speed = spd;
	this.movPattern = mov;
	this.atkPattern = atk;
	this.damage = dmg;

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
	function getDamage()
	{
		return this.damage;
	}
	function mutate()
	{
		var x = Math.floor((Math.random()*5)+1);
		if(x==1)
		{
			var plusorminus = Math.floor((Math.random()*4)+1);
			var size = Math.floor((Math.random()*20)+1);
			if(plusorminus!=1)
			{
				this.maxhp += size;
			}
		}
		x = Math.floor((Math.random()*5)+1);
		if(x==1)
		{
			var plusorminus = Math.floor((Math.random()*4)+1);
			var size = Math.floor((Math.random()*5)+1);
			if(plusorminus!=1)
			{
				this.speed += size;
			}
		}
		x = Math.floor((Math.random()*5)+1);
		if(x==1)
		{
			var plusorminus = Math.floor((Math.random()*4)+1);
			var size = Math.floor((Math.random()*5)+1);
			if(plusorminus!=1)
			{
				this.damage += size;
			}
		}
		this.atkPattern.mutate();
		this.movPattern.mutate();
	}
}
function AttackPattern(can,dmg,num,spd)
{
	this.capable = can;
	this.rangedDamage = dmg;
	this.shotNumber = num;
	this.speed = spd;

	function canAttack()
	{
		return this.capable;
	}
	function getRangedDamage()
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
		if(!capable)
		{
			var x = Math.floor((Math.random()*20)+1);
			if(x==1)
				return;
			else
				capable = true;
		}
		var x = Math.floor((Math.random()*5)+1);
		if(x==1)
		{
			var plusorminus = Math.floor((Math.random()*4)+1);
			var size = Math.floor((Math.random()*5)+1);
			if(plusorminus!=1)
			{
				this.speed += size;
			}
		}
		x = Math.floor((Math.random()*5)+1);
		if(x==1)
		{
			var plusorminus = Math.floor((Math.random()*4)+1);
			var size = Math.floor((Math.random()*5)+1);
			if(plusorminus!=1)
			{
				this.rangedDamage += size;
			}
		}
	}
}