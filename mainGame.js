function game()
{	
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
	var lifeArray;
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext("2d");
	var gameOver = false;
	var gameState;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);
	init();
	function init()
	{
		while(false)
		{
			enemies = []; //lists all the enemies in the game, can be editted within the functions (add, remove)
			projectiles = []; //lists all projectiles in the game
			deadEnemies = [];
			points = 0; //add when they defeat enemies, go to next round(set # of points)
			numEnemies = 20; //final
			levelHP = 10; //change every level, used to call generateEnemy
			levelSpeed = 10; //change every level, used to call generateEnemy
			myHP = 5; 
			player;
			time = 60;
			level = 1;
			ticks = 0;
			gameOver = false;
			lifeArray;
			startScreen();
		}
		startScreen();
	}
	function startScreen()
	{
		//Displays logo, click anywhere to start the game
		var img = new Image(canvas.width, canvas.height);
		img.src = "Graphics/TitleScreen.png";
		ctx.drawImage(img,0,0);
		document.addEventListener("click",start());
	}
	function start()
	{
		for(var i = 0; i < numEnemies; i++)
 		{
 			enemies.push(generateEnemy(new Genome(5,1,new MovementPattern(false,"11223344"),new AttackPattern(false,2,1,1),1)));
 		}
 		renderall();
 		while(!gameOver)
			gameState = window.setInterval(check, 100);
	}
	function renderall()
	{
		for(var x = 0;x<enemies.length;x++)
		{
			var kunal = enemies[x];
			kunal.renderEnemy();
		}
		for(var x = 0;x<projectiles.length;x++)
		{
			projectiles[x].renderProj();
		}
		player.renderPlayer();
	}
	function calcBestLifespan()
 	{
 		//gets called at the end of each level, calculates 5 best lifespans from each round and uses their genomes
 		lifeArray = [deadEnemies[0], deadEnemies[1], deadEnemies[2], deadEnemies[3], deadEnemies[4]];
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
 		deadEnemies = [];
 	}
 	function generateEnemy(genome)
 	{
 		var x = 1; //idk where on/off screen to generate the enemy
 		var y = 1; //^^^^
 		//var z = genome.mutate();
 		var e = new Enemy(genome, x, y);
 		return e;
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
	function nextLevel()
	{
		time = 60;
		points+=20;
		levelHP+=5;
		levelSpeed+=5;
		level++;
		check();
		calcBestLifespan();
	}
	function checkKey(e){
		if(e.keyCode == 32)
			player.shoot();
		else
			player.move(e.keyCode);
	}
	function check()
	{
		time--;
		if(time==0)
		{
			clearInterval(gameState);
			shop();
		}
		renderall();
		document.addEventListener("keydown", checkKey, false);
		ticks++;
		var deleteProjectiles = [];
		if(myHP == 0){
			gameOver = true;
			return;
		}
		var dead = [];
		for(var x = 0; x < enemies.length; x++)
		{
			if(enemies[x].getHP()<=0)
			{
				deadEnemies.push(enemies[x]);
				dead.push(x);
			}
		}
		for(var x = 0; x<dead.length; x++)
		{
			enemies.splice(x,1);
		}
		while(enemies.length < numEnemies)
		{
			if(level == 1)
				enemies.push(new Enemy((new Genome(5,1,new MovementPattern(false,"11223344"),new AttackPattern(false,2,1,1),1)).mutate()));
			else
				enemies.push(generateEnemy(lifeArray[Math.floor(Math.random()*5)].getGenome()));
		}
		//enemies move
		for (var i = 0; i < enemies.length; i++)
			enemies[0].move(tick, player.XPos, player.YPos);
		//check if unfriendly projectile and enemy hit
		for(var i = 0; i < projectiles.length; i++)
		{
			for (var j = 0; j < enemies.length; j++)
			{
				if (!projectiles[i].isFriendly() && (projectiles[i].getLength()/2 + projectiles[i].getXPos() > enemies[j].getXPos() - 13 || projectiles[i].getWidth()/2 + projectiles[i].getYPos() > enemies[j].getYPos() - 13))
				{
					enemies[j].setHP(enemies[i].getHP() - projectiles[i].getAtk());	
					deleteProjectiles.push(i);
				}
			}
		}
		//removes projectiles that hit enemies
		for (var i = 0; i < deleteProjectiles.length; i++)
			projectiles = projectiles.splice(deleteProjectiles[i], 1);
		//check if unfriendly projectile hits player
		for(var i = 0; i < projectiles.length; i++)
		{
			if (projectiles[i].isFriendly() && (projectiles[i].getLength()/2 + projectiles[i].getXPos() > player.getXPos() - 24 || projectiles[i].getWidth()/2 + projectiles[i].getYPos() > player.getYPos() - 13))
				{
					player.setHP(player.getHP() - projectiles[i].getAtk());	
					deleteProjectiles.push(i);
				}
		}
		//removes projectiles that hit enemies
		for (var i = 0; i < deleteProjectiles.length; i++)
			projectiles = projectiles.splice(deleteProjectiles[i], 1);
		//checks if enemy hits player
		for (var i = 0; i < enemies.length; i++)
		{
			if(enemies[i].getLength()/2 + enemies[i].getXPos() > player.getXPos() - 24 || enemies[i].getWidth()/2 + enemies[i].getYPos() > player.getYPos() - 13)
					player.setHP(player.getHP() - enemies[i].getAtk());	
		}
	}
}
