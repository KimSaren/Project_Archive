/*	Kim Sarén, 415405
	saren.kim@tuni.fi
	Harjoitus 1, tehtävä 11	*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

int main(int argc, char *argv[])



{
	/* Alustetaan muuttujat */
	double diskriminantti;
	double juuri1, juuri2;
	
	/* Tarkistetaan aluksi, onko diskriminantti >= 0 */
	diskriminantti = atof(argv[2])*atof(argv[2]) - 4*atof(argv[1])*atof(argv[3]);
	
	/* 3 eri vaihtoehtoa: 0, 1 tai 2 juurta riippuen diskriminantin arvosta */
	if(diskriminantti < 0)
		printf("Ei ratkaisua\n");
	else if(diskriminantti == 0)
	{
		juuri1 = (-atof(argv[2]))/(2*atof(argv[1]));
		printf("%.3f\n", juuri1);
	}
	else
	{
		juuri1 = ((-atof(argv[2]))+sqrt(diskriminantti))/(2*atof(argv[1]));
		juuri2 = ((-atof(argv[2]))-sqrt(diskriminantti))/(2*atof(argv[1]));
		if(juuri1 <= juuri2)
			printf("%.3f %.3f\n", juuri1, juuri2);
		else
			printf("%.3f %.3f\n", juuri2, juuri1);
		
	}
	
	return 0;
}