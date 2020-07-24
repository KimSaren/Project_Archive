/*	Kim Sarén, 415405
	saren.kim@tuni.fi
	Harjoitus 2, tehtävä 6
	Kuukaudet		*/


#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <limits.h>
#include <ctype.h>
#include "kuukaudet.h"

/* Alustetaan tarvittavat muuttujat */
int i, j, k, pituus, pituus2, arvo, samat, luku;
char merkki;

/* Määritetään jo esitellyt taulukot */
const char *KK_NIMET[KK_LKM] = {"tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"};
const char KK_PAIVAT[2][KK_LKM] = {{31,28,31,30,31,30,31,31,30,31,30,31},{31,29,31,30,31,30,31,31,30,31,30,31}};


/* Määritellään sitten funktioiden toiminta */
/* Vuosi on karkausvuosi, jos se on jaollinen neljälläsadalla TAI neljällä muttei satasilla */
int karkausvuosi(int vuosiluku)
{
	if(vuosiluku % 400 == 0)
		return 1;
	else if((vuosiluku % 4 == 0) && (vuosiluku % 100 != 0))
		return 1;
	else
		return 0;
}


char kkPituus(const char *kkNimi, int vuosiluku)
{
	pituus = 0;
	while(kkNimi[pituus] != '\0')
	{
		pituus = pituus + 1;
	}
	/* Vertaillaan saatua merkkiä taulukon merkkeihin */
	for(k = 0; k < KK_LKM; k ++)
	{
		pituus2 = 0;
		while(KK_NIMET[k][pituus2] != '\0')
		{
			pituus2 = pituus2 + 1;
		}
		
		if(pituus == pituus2)
		{
			samat = 1;
			for(j = 0; j < pituus; j++)
			{
				if(tolower(kkNimi[j]) != tolower(KK_NIMET[k][j]))
				{
					samat = 0;
				}
			}
			if(samat == 1)
			{
				i = karkausvuosi(vuosiluku);
				return KK_PAIVAT[i][k];
			}
		}
	}
	
	/* Jos tulosta ei löytynyt, palautetaan -1 */
	return -1;
}