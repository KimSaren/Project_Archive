/*	Kim Sarén, 415405
	saren.kim@tuni.fi
	Harjoitus 1, tehtävä 10	*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

int main(int argc, char *argv[])



{
	/* Alustetaan muuttujat */
	int i, j, k, ainutlaatuinen, eka;
	int laskuri;
	int tarkistus;
	int frekvenssi = 1;
	int pituus;
	double luku1, luku2, suurin, pienin;
	double yleisin[30];
	
	
	
	
	/* Etsitään ja tulostetaan pienin arvo */
	pienin = atof(argv[1]);
	for(i = 1; i < argc; i++)
	{
		luku1 = atof(argv[i]);
		if(luku1 < pienin)
			pienin = luku1;
	}
	printf("Pienin: %f\n", pienin);
	
	
	
	
	/* Etsitään ja tulostetaan suurin arvo */
	suurin = atof(argv[1]);
	for(i = 1; i < argc; i++)
	{
		luku1 = atof(argv[i]);
		if(luku1 > suurin)
			suurin = luku1;
	}
	printf("Suurin: %f\n", suurin);
	
	
	
	
	/* Tulostetaan ainutlaatuiset muuttujat sekä suurimman frekvenssin omaava muuttuja */
	eka = 0;
	pituus = 0;
	for(i = 1; i < argc; i++)
	{
		ainutlaatuinen = 0;
		luku1 = atof(argv[i]);
		laskuri = 1;
		
		/* Ensimmäistä alkiota verrataan eteenpäin */
		if(i == 1)
		{
			for(j = i+1; j < argc; j++)
			{
				luku2 = atof(argv[j]);
				if(luku1 == luku2)
				{
					laskuri = laskuri + 1;
					ainutlaatuinen = 1;
				}
			}
		}
		
		/* Viimeistä alkiota verrataan taaksepäin */
		else if(i == argc-1)
		{
			for(j = i-1; j>0; j--)
			{
				luku2 = atof(argv[j]);
				if(luku1 == luku2)
				{
					laskuri = laskuri + 1;
					ainutlaatuinen = 1;
				}
			}
		}
		
		/* Muita alkioita verrataan eteen JA taaksepäin */
		else
		{
			for(j = i+1; j < argc; j++)
			{
				luku2 = atof(argv[j]);
				if(luku1 == luku2)
				{
					laskuri = laskuri + 1;
					ainutlaatuinen = 1;
				}
			}

			for(j = i-1; j>0; j--)
			{
				luku2 = atof(argv[j]);
				if(luku1 == luku2)
				{
					laskuri = laskuri + 1;
					ainutlaatuinen = 1;
				}
			}
		}
		
		
		/* Ainutlaatuisten alkioiden tulosteet */
		if((ainutlaatuinen == 0) && (eka == 0) && (i != argc-1))
		{
			printf("Ainutlaatuiset: %f", luku1);
			eka = 1;
		}
		else if((ainutlaatuinen == 0) && (eka == 0) && (i == argc-1))
		{
			printf("Ainutlaatuiset: %f\n", luku1);
			eka = 1;
		}
		else if((ainutlaatuinen == 0) && (eka != 0) && (i != argc-1))
		{
			printf(" %f", luku1);
			eka = 1;
		}
		else if((ainutlaatuinen == 0) && (eka != 0) && (i == argc-1))
			printf(" %f\n", luku1);
		else if((i == argc-1) && (eka == 1))
			printf("\n");
		
		
		/* Tulostetaan lopuksi vielä useiten toistuva alkio ja sen frekvenssi */

		if(laskuri > frekvenssi)
		{
			frekvenssi = laskuri;
			pituus = 1;
			yleisin[0] = atof(argv[i]);
		}
		else if(laskuri == frekvenssi)
		{
			tarkistus = 0;
			for(k = 0; k < pituus; k++)
			{
				if(yleisin[k] == atof(argv[i]))
					tarkistus = 1;
			}
			if(tarkistus == 0)
			{
				yleisin[pituus] = atof(argv[i]);
				pituus = pituus + 1;
			}
		}
	}
	
	if(frekvenssi > 1)
	{
		printf("Useimmiten esiintyneet (%d kertaa):", frekvenssi);
		for(k = 0; k < pituus; k++)
		{
				printf(" %f", yleisin[k]);
		}
		printf("\n");
	}

	
	return 0;
}