/*	Kim Sarén, 415405
	saren.kim@tuni.fi
	Harjoitus 2, tehtävä 1
	Bittijonoja		*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

int main(int argc, char *argv[])
{
	/* Alustetaan muuttujat */
	int pituus = 0, j = 0, i = 0, summa = 0;
	
	/* Selvitetään ensin merkkijonon pituus */
	while(argv[1][pituus] != '\0')
	{
		pituus = pituus + 1;
	}
	
	/* Tutkitaan bittijonoa käänteisesti lopusta alkuun: siis alkiosta pituus alkioon 0 */
	for(i = pituus-1; i >= 0; i--)
	{
		if((argv[1][i] == '1') && (i != 0))
			summa = summa + pow(2,j);
		else if((argv[1][i] == '1') && (i == 0))
			summa = summa - pow(2,j);
		j = j + 1;
	}
	
	printf("%d\n", summa);
	
	return 0;
}