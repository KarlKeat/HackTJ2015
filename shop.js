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
