/*	Kim Sarén, 415405
	saren.kim@tuni.fi
	Harjoitus 1, tehtävä 20	*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

/* Pääfunktio */
int main(int argc, char *argv[])
{
	/* Alustetaan muuttujat */
	static double toleranssi = 0.000001;
	
	
	return 0;
}



/* Nykyisen toleranssin palautus */
double lueToleranssi();
{
	return toleranssi;
}



/* Asetetaan uusi toleranssi tällä funktiolla */
void asetaToleranssi(double uusiToleranssi)
{
	toleranssi = uusiToleranssi;
}




/* Tarkistetaan, onko lukujen erotus toleranssiarvon rajoissa */
int doubleVrt(double a, double b)
{
	if(fabs(a-b) <= toleranssi)
		return 1;
	else
		return 0;
}