/*	Kim Sarén, 415405
	saren.kim@tuni.fi
	Harjoitus 1, tehtävä 20	*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include "likimvrt.h"

static double toleranssi = 0.000001;

/* Nykyisen toleranssin palautus */
double lueToleranssi()
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