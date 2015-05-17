		var points = 0;
		var enemies = [];
		var numEnemies = 20;
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
	
