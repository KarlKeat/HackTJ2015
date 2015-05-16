function shop(points, atk, speed, hp)
{
	int ptotal = points;
	int atkcost = atk*10;
	int speedcost = speed*10;
	function plusAtk()
	{
		if (points >= atkcost)
		{
			player().setAtk(atk+1);
			points -= atkcost;
			atkcost += 10;
		}
	}
	function plusSpeed()
	{
		if (points >= speedcost)
		{
			player().setSpeed(speed+1);
			points -= speedcost;
			speedcost += 10;
		}
	}
	function plusHP()
	{
		if (points >= 10)
		{
			player().setHP(hp + 10);
			points -= 10;
		}
	}
	function close()
	{
		return points;
	}
}
