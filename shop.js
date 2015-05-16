function shop(points, atk, speed, hp)
{
	int ptotal = points;
	int atkcost = atk*10;
	int speedcost = speed*10;
	function plusAtk()
	{
		if (points >= atkcost)
		{
			points -= atkcost;
			atkcost += 10;
		}
		return atk + 1;
	}
	function plusSpeed()
	{
		if (points >= speedcost)
		{
			points -= speedcost;
			speedcost += 10;
		}
		return speed + 1;
	}
	function plusHP()
	{
		if (points >= 10)
			points -= 10;
		return hp + 10;
	}
	function close()
	{
		return points;
	}
}
