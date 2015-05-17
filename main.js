function game(){	
	var enemies = []; //lists all the enemies in the game, can be editted within the functions (add, remove)
	var projectiles = []; //lists all projectiles in the game
	var deadEnemies = [];
	var points = 0; //add when they defeat enemies, go to next round(set # of points)
	var numEnemies = 20; //final
	var levelHP = 10; //change every level, used to call generateEnemy
	var levelSpeed = 10; //change every level, used to call generateEnemy
	var myHP = 5; 
	var player = new player();
	var time = 60;
	var level = 1;
	var ticks = 0;
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);

	function start()
	{
		for(var i = 0; i < numEnemies; i++)
 		{
 			enemies.push(generateEnemy(1, 1));
 		}
 		while(true)
			window.setInterval(check, 100);
	}
	function draw()
	{
		for(var x = 0;x<enemies.length;x++)
		{
			enemies[x].draw(ctx);
		}
		for(var x = 0;x<projectiles.length;x++)
		{
			projectiles[x].draw(ctx);
		}
	}
	function calcBestLifespan()
 	{
 		//gets called at the end of each level, calculates 5 best lifespans from each round and uses their genomes
 		var lifeArray = [deadEnemies[0], deadEnemies[1], deadEnemies[2], deadEnemies[3], deadEnemies[4]];
 		var minVal = lifeArray[0].getLifespan();
 		var minValCell = 0;
 		for(var i = 1; i < lifeArray.length; i++)
 			if(lifeArray[i].getLifespan() < minVal){
 				minVal = lifeArray[i].getLifespan();
 				minValCell = i;
 			}
 		for(var i = 5; i < deadEnemies.length; i++)
 		{
 			if(deadEnemies[i].getLifespan() > minVal)
 			{
 				lifeArray[minValCell] = deadEnemies[i];
 				//recalculate minVal and minValCell
 				for(var i = 0; i < lifeArray.length; i++)
 					if(lifeArray[i].getLifespan() < minVal){
 						minVal = lifeArray[i].getLifespan();
 						minValCell = i;
 					}
 			}
 		}
 		for(var i = 5; i < enemies.length; i++)
 		{
 			if(enemies[i].getLifespan() > minVal)
 			{
 				lifeArray[minValCell] = enemies[i];
 				//recalculate minVal and minValCell
 				for(var i = 0; i < lifeArray.length; i++)
 					if(lifeArray[i].getLifespan() < minVal){
 						minVal = lifeArray[i].getLifespan();
 						minValCell = i;
 				}
 			}
 		}
 		//take out all enemies (alive) that were alive for 5 or less seconds before the level ended & replace them w/ mutated ones
 		//call generateEnemy(genome) in the places where we take out the thingys above ^^ (randomly choose which of the 5 best genomes to use in param)
 		for(var i = 0; i < enemies.length; i++)
 		{
 			if(enemies[i].getLifespan() <= 5)
 			{
 				enemies[i] = generateEnemy(lifeArray[Math.floor(Math.random()*5)].getGenome());
 			}
 		}
 	}
 	function generateEnemy(genome)
 	{
 		var x = 1; //idk where on/off screen to generate the enemy
 		var y = 1; //^^^^
 		return new Enemy(genome.mutate(), x, y);
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

		if(dmg < 5)
			var damage = Math.floor((Math.random()*(dmg+5)) + 1);
		else
			var damage = Math.floor((Math.random()*(dmg+5)) + (dmg-5));

		var mov = generateMov();

		if(level == 1)
			var atk = generateAtk(false, );

		var xPos = 1; //leaving it as constant for now 
		var yPos = 1; //leaving it as contant for now

		var e = new Enemy(new Genome(hp, speed, mov, atk, damage), xPos, yPos);

	}
	function generateAtk(can, dmg, num, spd)
	{
		var atk = new AttackPattern(can, dmg, num, spd);

		if(dmg < 5)
			var damage = Math.floor((Math.random()*(dmg+5)) + 1);
		else
			var damage = Math.floor((Math.random()*(dmg+5)) + (dmg-5));
 
		if(spd < 5)
			var speed = Math.floor((Math.random()*(spd+5)) + 1);
		else
			var speed = Math.floor((Math.random()*(spd+5)) + (spd-5));
		var atk = new AttackPattern(can, dmg, num, spd);
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
		calcBestLifespan();
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
		for(var i = 0; i < numEnemies; i++)
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
		function getPointTotal()
		{
			return points;
		}
		function getAtkCost()
		{
			return atkcost;
		}
		function getSpeedCost()
		{
			return speedcost;
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
		spriteIdle = "Graphics/PlayerIdle.png";
		SpriteShoot = "Graphics/PlayerShoot.png";
		sprite = "Graphics/PlayerIdle.png";
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
			sprite = spriteIdle;
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
			sprite = SpriteShoot
			projectiles.push(new bullet(atk, speed, xPos, yPos, true, move()));
		}
		function trap()
		{
			projectiles.push(new bullet(atk, 0, xPos, yPos, true, move()));
		}
		function draw(context)
		{
			context.drawImage(sprite,xPos,yPos);
		}
	}
	function bullet(atk, speed, xp, yp, direct, friend)
	{
		this.atk = atk;
		this.speed = speed;
		this.direction = direct;
		this.xPos = xp;
		this.yPos = yp);
		this.friendly = friend;
		sprites = ["Graphics/Bullet1.png","Graphics/Bullet2.png","Graphics/Bullet3.png","Graphics.Bullet4.png"]
		sprite = sprites[0];
		if (this.direction == 37) //left
			sprite = sprites[4];
		else if (this.direction == 38) //up
			sprite = sprites[1];
		else if (this.direction == 39) //right
			sprite = sprites[2];
		else if (this.direction == 40) //down
			sprite = sprites[3];
		function move()
		{
			if (this.direction == 37) //left
				this.xPos = this.xPos - this.speed;
			else if (this.direction == 38) //up
				this.yPos = this.yPos - this.speed;
			else if (this.direction == 39) //right
				this.xPos = this.xPos - this.speed;
			else if (this.direction == 40) //down
				this.yPos = this.yPos - this.speed;
		}
		function getAtk()
		{
			return this.atk;
		}
		function isFriendly()
		{
			return friendly;
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
		this.direction = 1;
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
		function move(tick) //takes in tick number
		{
			//uses tick number to determine if it's in midair and which direction it's moving in
		}
		function shoot()
		{
			projectiles.push(new bullet(atkPattern.getDamage(),atkPattern.getShotSpeed(),xPos,yPos,direction,false))
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
