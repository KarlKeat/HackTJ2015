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
