function game(){	
				var enemies = []; //lists all the enemies in the game, can be editted within the functions (add, remove)
				var projectiles = []; //lists all projectiles in the game
				var deadEnemies = [];
				var points = 0; //add when they defeat enemies, go to next round(set # of points)
				var numEnemies = 20; //final
				var levelHP = 10; //change every level, used to call generateEnemy
				var levelSpeed = 10; //change every level, used to call generateEnemy
				var myHP = 5; 
				var player;
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
				console.log("hi");
				init();
				function init()
				{
					console.log("yo");
					while(true)
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
				}
				function startScreen()
				{
					//Displays logo, click anywhere to start the game
					var img = new Image(canvas.width, canvas.height);
					img.src = "Graphics/TitleScreen.png";
					ctx.drawImage(img,0,0);
					document.addEventListener("click",start);
				}
				function start()
				{
					for(var i = 0; i < numEnemies; i++)
			 		{
			 			enemies.push(generateEnemy(new Genome(5,1,new MovementPattern(false,"11223344"),new AttackPattern(false,2,1,1),1)));
			 		}
			 		player = new player();
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
						//projectiles[x].renderProj();
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
				function shop(points, atk, speed, hp)
				{
					var ptotal = points;
					var atkcost = atk*10;
					var speedcost = speed*10;
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
					this.XPos = 100;
					this.YPos = 100;
					this.direction = 1;
					i1 = "Graphics/PlayerIdle1.png";
					s1 = "Graphics/PlayerShoot1.png";
					i2 = "Graphics/PlayerIdle2.png";
					s2 = "Graphics/PlayerShoot2.png";
					s3 = "Graphics/PlayerShoot3.png";
					i3 = "Graphics/PlayerIdle3.png";
					s4 = "Graphics/PlayerShoot4.png";
					i4 = "Graphics/PlayerIdle4.png";
					sprite = "Graphics/PlayerIdle1.png";
					this.renderPlayer = function renderPlayer()
					{
						var l = new Image();
						l.src = sprite;
						ctx.drawImage(l,this.XPos,this.YPos);
					}
					this.getHP = function getHP()
					{
						return this.hp;
					}
					this.getSpeed = function getSpeed()
					{
						return this.speed;
					}
					this.getAtk = function getAtk()
					{
						return this.atk;
					}
					this.getDirection = function getDirection()
					{
						return direction;
					}
					this.setHP = function setHP(hp)
					{
						this.hp = hp;
					}
					this.refill = function refill()
					{
						this.hp = this.maxhp;
					}
					this.setSpeed = function setSpeed(speed)
					{
						this.speed = speed;
					}
					this.setAtk = function setAtk(atk)
					{
						this.atk = atk;
					}
					this.isDead = function isDead()
					{
						return this.hp <= 0;
					}
					this.getXPos = function getXPos()
					{
						return this.XPos;
					}
					this.getYPos = function getYPos()
					{
						return this.YPos;
					}
					this.move = function move(code)
					{
						sprite = spriteIdle;
						if (code == 37) //left
						{
							this.XPos = this.XPos - this.speed;
							direction = 4;
							sprite = i4;
						}
						else if (code == 38) //up
						{
							this.YPos = this.YPos + this.speed;
							direction = 1;
							sprite = i1;
						}
						else if (code == 39) //right
						{
							this.XPos = this.XPos + this.speed;
							direction = 2;
							sprite = i2;
						}
						else if (code == 40) //down
						{
							this.YPos = this.YPos - this.speed;
							direction = 3;
							sprite = i3;
						}
						return code;
					}
					this.shoot = function shoot()
					{
						if (direction == 4) //left
						{
							sprite = s4;
						}
						else if (direction == 1) //up
						{
							sprite = s1;
						}
						else if (direction == 2) //right
						{
							sprite = s2;
						}
						else if (direction == 3) //down
						{
							sprite = s3;
						}
						projectiles.push(new bullet(atk, speed, XPos, YPos, true, move()));
						sprite = SpriteShoot
						projectiles.push(new bullet(atk, speed, XPos, YPos, true, move));
					}
					this.trap = function trap()
					{
						projectiles.push(new bullet(atk, 0, XPos, YPos, true, move));
					}
					return this;
				}
				
				function bullet(atk, speed, xp, yp, direct, friend)
				{
					this.atk = atk;
					this.speed = speed;
					this.direction = direct;
					this.XPos = xp;
					this.YPos = yp;
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
					this.move = function move()
					{
						if (this.direction == 37) //left
							this.XPos = this.XPos - this.speed;
						else if (this.direction == 38) //up
							this.YPos = this.YPos - this.speed;
						else if (this.direction == 39) //right
							this.XPos = this.XPos - this.speed;
						else if (this.direction == 40) //down
							this.YPos = this.YPos - this.speed;
					}
					this.getAtk = function getAtk()
					{
						return this.atk;
					}
					this.isFriendly = function isFriendly()
					{
						return friendly;
					}
					return this;
				}
				function Enemy(genome,x,y){
					this.maxhp = genome.maxhp;
					this.hp = genome.maxhp;
					this.speed = genome.speed;
					this.movPattern = genome.movPattern;
					this.atkPattern = genome.atkPattern;
					this.XPos = x;
					this.YPos = y;
					this.lifespan = 0;
					this.direction = 1;
					this.sprite = "Graphics/SlimeMove1.png";
					this.getHP = function getHP()
					{
						return this.hp;
					}
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
					this.setHP = function setHP(x)
					{
						this.hp = x;
					}
					this.setSpeed = function setSpeed(x)
					{
						this.speed = x;
					}
					this.move = function move(tick, pXPos, pYPos) //takes in tick number and player x/YPos
					{
						if (tick % 10 == 0)
						{
							sprite = "Graphics/SlimeMove" + this.count + ".png";
							this.count++;
							if (this.count > 11)
								this.count = 1;
						}
						if (tick % 100 == 0)
						{
							 if (this.mov.getCapable()) //if follows player
							{
								if (this.XPos < pXPos)
									this.XPos = this.XPos + this.speed;
								if (this.YPos < pYPos)
									this.YPos = this.YPos + this.speed;
								if (this.XPos > pXPos)
									this.XPos = this.XPos - this.speed;
								if (this.YPos > pYPos)
									this.YPos = this.YPos - this.speed;
							}
							else
							{
								var move = this.move.getCommandSequence().splice(0, 1);
								if (move == 1) //north
									this.YPos = this.YPos + this.speed;
								else if (move === 2) //east
									this.XPos = this.XPos + this.speed;
								else if (move === 3) //south
									this.YPos = this.YPos - this.speed;
								else //west
									this.XPos = this.XPos - this.speed;
								this.move.getCommandSequence().push(move);
							}
						}
					}
					this.renderEnemy = function renderEnemy()
					{
						ctx.drawImage(new Image(sprite),this.XPos,this.YPos);
					}
					this.shoot = function shoot()
					{
						projectiles.push(new bullet(atkPattern.getDamage(),atkPattern.getShotSpeed(),this.XPos,this.YPos,direction,false));
					}
					this.isDead = function isDead()
					{
						if(this.hp<=0)
							return true;
						else
							return false;
					}
					this.getXPos = function getXPos()
					{
						return XPos;
					}
					this.getYPos = function getYPos()
					{
						return YPos;
					}
					this.incrementLifespan = function incrementLifespan()
					{
						lifespan++;
					}
					this.getLifespan = function getLifespan()
					{
						return lifespan;
					}
					return this;
				}
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
			}
