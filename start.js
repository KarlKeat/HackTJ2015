		var points = 0;
		var enemies = [];
		var numEnemies = 20;
		function start()
		{
			window.setInterval(check, 3000);

			for(var i = 0; i < numEnemies; i++)
			{

				enemies.push(generateEnemy(1, 1));
			}
		}
		function generateEnemy(mhp, sp)
		{
			if(mhp < 5)
				var hp = Math.floor((Math.random()*(mhp+5)) + 1);
			else
				var hp = Math.floor((Math.random()*(mhp+5)) + (mhp-5));

			if(sp < 5)
				var speed = Math.floor((Math.random()*(mhp+5)) + 1);
			else
				var speed = Math.floor((Math.random()*(mhp+5)) + (mhp-5));

			var mov = generateMov();
			var atk = generateAtk();
			var xPos = 1; //leaving it as constant for now 
			var yPos = 1; //leaving it as contant for now

			var e = new Enemy(new Genome(hp, speed, mov, atk), xPos, yPos);


		}
		function generateAtk(can,dmg,num,spd)
		{


		}
		function generateMov()
		{

		}
	
