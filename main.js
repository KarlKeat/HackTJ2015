function game(){	
	var enemies = []; //lists all the enemies in the game, can be editted within the functions (add, remove)
	var points = 0; //add when they defeat enemies, go to next round(set # of points)
	var numEnemies = 20; //final
	var levelHP = 10; //change every level, used to call generateEnemy
	var levelSpeed = 10; //change every level, used to call generateEnemy
	var myHP = 5; 
	var player = new player();
	var time = 60;
	var level = 1;
	function start()
	{
		while(true)
		window.setInterval(check, 100);

		for(var i = 0; i < numEnemies; i++)
		{

			enemies.push(generateEnemy(1, 1));
		}
	}
	function generateEnemy(mhp, sp, dmg)
	{
		if(mhp < 5)
			var hp = Math.floor((Math.random()*(mhp+5)) + 1);
		else
			var hp = Math.floor((Math.random()*(mhp+5)) + (mhp-5));

		if(sp < 5)
			var speed = Math.floor((Math.random()*(sp+5)) + 1);
		else
			var speed = Math.floor((Math.random()*(sp+5)) + (sp-5));

		if(sp < 5)
			var damage = Math.floor((Math.random()*(damage+5)) + 1);
		else
			var damage = Math.floor((Math.random()*(damage+5)) + (damage-5));

		var mov = generateMov();

		if(level == 1)
			var atk = generateAtk(false, );

		var xPos = 1; //leaving it as constant for now 
		var yPos = 1; //leaving it as contant for now

		var e = new Enemy(new Genome(hp, speed, mov, atk, damage), xPos, yPos);

	}
	function generateAtk(can, dmg, num, spd)
	{
		
		var atk = new AttackPattern(can, dmg, num, spd)


	}
	function generateMov(can, comseq)
	{
		//to be implemented
	}
	function nextLevel()
	{
		time = 60;
		points+=20;
		levelHP+=5;
		levelSpeed+=5;
		level++;
		timer();
		check();
	}
	function timer(){
		while(time != 0)
			window.setInterval(function(){time--;},100); //what # should be here so that it decreases every second
		shop();
	}
	function decreaseHP()
	{
		//if = 0, game ends //decreases through collisions + combat
		myHP-=5;
		if(myHP <= 0)
			endGame();
	}
	function check()
	{
		if(myHP == 0){
			endGame();
			break;
		}
		while(enemies.length < numEnemies)
		{
			enemies.push(generateEnemy(levelHP,levelSpeed));
		}
		//check if player and enemy are in same position, if so, call decreaseHP()
		for(var i = 0; i < 20; i++)
			if(enemies[i].getXPos() == player.getXPos() && enemies[i].getYPos() == player.getYPos())
				decreaseHP();
	}
	function endGame(){
		//game over screen and option to restart?
		 enemies = []; 
		 points = 0; 
		 numEnemies = 20; 
		 levelHP = 10; 
		 levelSpeed = 10; 
		 myHP = 5; 
		 player = new player();
		 time = 60;
		 level = 1;
		 //prompt yes or no to restart
		 var choice = prompt("Game over. Play again y/n?");
		 if (choice == "y")
		 	start();
		 else
		 	return; //lmao you're supposed to end the program here but idk how to do that and this is what stackoverflow said
	}

	function shop(points, atk, speed, hp)
	{
		int ptotal = points;
		int atkcost = atk*10;
		int speedcost = speed*10;
		function plusAtk()
		{
			if (ptotal >= atkcost)
			{
				ptotal -= atkcost;
				atkcost += 10;
			}
			return atk + 1;
		}
		function plusSpeed()
		{
			if (ptotal >= speedcost)
			{
				ptotal -= speedcost;
				speedcost += 10;
			}
			return speed + 1;
		}
		function plusHP()
		{
			if (ptotal >= 10)
				ptotal -= 10;
			return hp + 10;
		}
		function close()
		{
			return ptotal;
		}
	}
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
			return bullet(atk, speed, move());
		}
		function trap()
		{
			return bullet(atk, 0, move());
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
	function Enemy(genome,x,y){
		this.maxhp = genome.getMaxHP();
		this.hp = genome.getMaxHP();
		this.speed = genome.getSpeed();
		this.movPattern = genome.getMovPattern();
		this.atkPattern = genome.getAtkPattern();
		this.xPos = x;
		this.yPos = y;
		this.lifespan = 0;
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
		function isDead()
		{
			if(this.hp<=0)
				return true;
			else
				return false;
		}
		function getXPos()
		{
			return xPos;
		}
		function getYPos()
		{
			return yPos;
		}
		function incrementLifespan()
		{
			lifespan++;
		}
		function getLifespan()
		{
			return lifespan;
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
	}
	function MovementPattern(can,comseq)
	{
		this.capable = can;
		this.commandSequence = comseq; //Array of integers. 1 = up, 2 = right, 3 = down, 4 = left.
		function canFollow()
		{
			return capable;
		}
		function getCommandSequence()
		{
			return commandSequence;
		}
		function mutate()
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
	}
}
