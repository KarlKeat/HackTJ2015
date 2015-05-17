function Genome(mhp,spd,mov,atk,dmg)
{
	this.maxhp = mhp;
	this.speed = spd;
	this.movPattern = mov;
	this.atkPattern = atk;
	this.damage = dmg;
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
	this.getDamage = function getDamage()
	{
		return this.damage;
	}
	this.mutate = function mutate()
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
	return this;
}
