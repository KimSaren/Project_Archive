/*	Kim Sarén, 415405
	saren.kim@tuni.fi
	Harjoitus 1, tehtävä 20	*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>


/* Nykyisen toleranssin palautus */
double lueToleranssi();

/* Asetetaan uusi toleranssi tällä funktiolla */
void asetaToleranssi(double uusiToleranssi);




/* Tarkistetaan, onko lukujen erotus toleranssiarvon rajoissa */
int doubleVrt(double a, double b);