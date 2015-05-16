		var enemies = []; //lists all the enemies in the game, can be editted within the functions (add, remove)
		var points = 0; //add when they defeat enemies, go to next round(set # of points)
		var numEnemies = 20; //final
		var levelHP = 10; //change every level, used to call generateEnemy
		var levelSpeed = 10; //change every level, used to call generateEnemy
		var myHP = 5; 
		var player = new player();
		function nextLevel()
		{
			points+=20;
			levelHP+=5;
			levelSpeed+=5;
			check();
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
			//check if player and enemy are in same position, if so, call decreaseHP()
			for(var i = 0; i < 20; i++)
			if(enemies[i].getXPos() == player.getXPos() && enemies[i].getYPos() == player.getYPos())
				decreaseHP();
			if(myHP == 0){
				endGame();
				break;
			}
			//update 60 times/sec
			while(enemies.length < numEnemies)
			{
				enemies.push(generateEnemy(levelHP,levelSpeed));
			}
		}
		function endGame(){
			//do later (after 1 am)
		}
		//updates enemies array w/ new enemy, creates enemy w/ numbers (parameters) within 5? 
		//if # < 5, then range is [1, #+5]
		//creates attack pattern, passes it to genome param w/ the other random #s (function for this?)
