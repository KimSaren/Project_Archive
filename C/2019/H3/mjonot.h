/*	Kim Sarén, 415405
	saren.kim@tuni.fi
	Harjoitus 3, tehtävä 8	*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <limits.h>
#include <stddef.h>

/* Esitellään funktio */
char ** jarjesta_mjt(char **mjt, size_t lkm, int (*vrt)(const char*, const char *));