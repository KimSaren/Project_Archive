/*	Kim Sarén, 415405
	saren.kim@tuni.fi
	Harjoitus 1, tehtävä 9	*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

int main(int argc, char *argv[])
{
	/* Alustetaan muuttujat */
	int luku1, luku2, luku3, luku4;
	int tulo;
	int i, j;
	/* Leveysmääre 1, jotta säästetään myöhemmin tilaa */
	int leveys = 1;
	
	/* Lasketaan aluksi leveys komentoparametrin arvoista oletuksella, että
	käyttäjän toinen ja neljäs syöte ovat kahden lukuvälin suurimmat arvot */
	luku2 = atoi(argv[2]);
	luku4 = atoi(argv[4]);
	tulo = luku2*luku4;
	
	/* Ratkaistaan leveys while-silmukalla toistamalla kymmenjakoja */
	while(tulo != 0)
	{
		leveys = leveys + 1;
		tulo = tulo/10;
	}
	
	/* Lähdetään sitten muodostamaan kertotaulua, kun leveys on tunnettu */
	/* Asetetaan lukumääreet parametreista */
	luku1 = atoi(argv[1]);
	luku3 = atoi(argv[3]);
	
	/* Tulostetaan ensin tyhjä rivi leveyden määrittämän verran */
	for(i = 0; i <= leveys-1; i++)
	{
		printf(" ");
	}
	
	/* Tulostetaan sitten ensimmäinen lukuväli yläriville */
	for(luku1; luku1 <= luku2; luku1++)
	{
		printf("%*d", leveys, luku1);
	}
	printf("\n");
	
	/* Lähdetään sitten tulostamaan loput rivit, muutetaan ensin luku1 takaisin lähtötilanteeseen */
	for(luku3; luku3 <= luku4; luku3++)
	{
		printf("%*d", leveys, luku3);
		luku1 = atoi(argv[1]);
		for(luku1; luku1 <= luku2; luku1++)
		{
			tulo = luku1*luku3;
			printf("%*d", leveys, tulo);
		}
		printf("\n");
	}
	
	return 0;
}