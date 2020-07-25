/*	Kim Sarén, 415405
	saren.kim@tuni.fi
	Harjoitus 3, tehtävä 8	*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <limits.h>
#include "mjonot.h"

/* Alustetaan tarvittavat muuttujat */
int i, j, vertaus, tarkistus, pituus2;
size_t pituus;
char *merkki;

/* Toteutetaan funktio merkkijontaulukolle */
char ** jarjesta_mjt(char **mjt, size_t lkm, int (*vrt)(const char*, const char *))
{
	char **taulukko = malloc(sizeof(char *)*lkm); /* Varataan aluksi taulukko, joka on annettua kokoa */
	
	/* Kopioidaan ensin arvot parametrin taulukosta */
	for(i = 0; i < lkm; i ++)
	{
		/* Otetaan pituus taulukon merkistä */
		pituus = strlen(mjt[i]);
		taulukko[i] = malloc(sizeof(char)*pituus+1);
		
		for(j = 0; j < pituus+1; j++)
		{
			taulukko[i][j] = mjt[i][j];
		}
	}
	
	
	/* Lajitellaan seuraavassa vaiheessa luotu taulukko funktion vrt-mukaisesti */
	for(i = 0; i < lkm-1; i ++)
	{
		
		vertaus = vrt(taulukko[i+1],taulukko[i]); /* Vertaillaan peräkkäisiä rivejä taulukossa lkm-1 asti */
			
		
		if(vertaus != 0 ) /* Jos vaihdetaan rivien paikkoja */
		{
			merkki = taulukko[i]; /* Tallennetaan kopio */
			taulukko[i] = taulukko[i+1]; /* Korvataan merkki seuraavan rivin merkillä */
			taulukko[i+1] = merkki; /* Korvataan vielä seuraavan rivin merkki tallennetulla kopiolla */
			
			
			


			
			i = -1;
		}
	}	
	
	return taulukko;
	
}