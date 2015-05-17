function AttackPattern(can,dmg,num,spd)
{
	this.capable = can;
	this.rangedDamage = dmg;
	this.shotNumber = num;
	this.speed = spd;
	this.canAttack = function canAttack()
	{
		return this.capable;
	}
	this.getRangedDamage = function getRangedDamage()
	{
		return this.damage;
	}
	this.getShotNumber = function getShotNumber()
	{
		return this.shotNumber;
	}
	this.getShotSpeed = function getShotSpeed()
	{
		return this.speed;
	}
	this.mutate = function mutate()
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
		x = Math.floor((Math.random()*20)+1);
		if(x==1)
		{
			var plusorminus = Math.floor((Math.random()*4)+1);
			if(plusorminus!=1)
			{
				this.shotNumber++;
			}
		}
	}
	return this;
}
function MovementPattern(can,comseq)
{
	this.capable = can;
	this.commandSequence = comseq; //Array of integers. 1 = up, 2 = right, 3 = down, 4 = left.
	this.canFollow = function canFollow()
	{
		return capable;
	}
	this.getCommandSequence = function getCommandSequence()
	{
		return commandSequence;
	}
	this.mutate = function mutate()
	{
		var appendOrModify = Math.floor((Math.random()*3)+1);
		var index = Math.floor(Math.random()*commandSequence.length);
		var x = Math.floor((Math.random()*5)+1);
		var dir = Math.floor((Math.random()*4)+1);
		if(x>=3)
		{
			if(appendOrModify>2)
			{
				//modify
				commandSequence[index] = dir;
			}
			else
			{
				commandSequence.splice(index,0,dir)
			}
		}
	}
	return this;
}
