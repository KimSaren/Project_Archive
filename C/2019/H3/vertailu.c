/*	Kim Sarén, 415405
	saren.kim@tuni.fi
	Harjoitus 3, tehtävä 8	*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <limits.h>
#include "vertailu.h"
#include "rectangle.h"

/* Alustetaan tarvittavat muuttujat */


/* Funktiot */
int rectAlaVrt(const void *a, const void *b)
{
	/* PINTA-ALAT */
	Rectangle * const *x = a;
	Rectangle * const *y = b;
	
	int ala1 = ((*x)->width)*((*x)->height);
	int ala2 = ((*y)->width)*((*y)->height);
	/* 3 vaihtoehtoa */
	return (ala1 > ala2 ? 1 : ala1 < ala2 ? -1 : 0);
}



int rectXyVrt(const void *a, const void *b)
{
	/* Nelikulmiot */
	Rectangle * const *r1 = a;
	Rectangle * const *r2 = b;
	
	/* x-koordinaatit */
	int x1 = (*r1)->origin.x;
	int x2 = (*r2)->origin.x;
	
	/* y-koordinaatit */
	int y1 = (*r1)->origin.y;
	int y2 = (*r2)->origin.y;
	
	
	/* Vaihtoehdot */
	if(x1 > x2)
		return 1;
	else if(x2 > x1)
		return -1;
	else if(y1 > y2)
		return 1;
	else if(y2 > y1)
		return -1;
	else
		return 0;
}



int rectLeveysVrt(const void *a, const void *b)
{
	Rectangle * const *r1 = a;
	Rectangle * const *r2 = b;
	
	int leveys1 = (*r1)->width;
	int leveys2 = (*r2)->width;
	
	/* 3 Vaihtoehtoa */
	return ((leveys1 > leveys2) ? -1: (leveys2 > leveys1) ? 1: 0);
}



int mjPitAakkosVrt(const void *a, const void *b)
{
	char * const *mjono1 = a;
	char * const *mjono2 = b;
	
	
	/* Pituusvertailu */
	if(strlen(*mjono1)>strlen(*mjono2))
		return -1;
	else if(strlen(*mjono2)>strlen(*mjono1))
		return 1;
	
	else /* Yhtä pitkät */
		return strcmp(*mjono1, *mjono2);
}