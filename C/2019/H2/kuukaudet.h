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


/* Määritellään alkuun pyydetyt enum-vakiot */
enum{TAMMIKUU = 0, HELMIKUU = 1, MAALISKUU = 2, HUHTIKUU = 3, TOUKOKUU = 4, KESAKUU = 5, HEINAKUU = 6, ELOKUU = 7, SYYSKUU = 8, LOKAKUU = 9, MARRASKUU = 10, JOULUKUU = 11, KK_LKM};


/* Esitellään taulukot */
 extern const char *KK_NIMET[KK_LKM];
extern const char KK_PAIVAT[2][KK_LKM];


/* Ja käytettävät funktiot */
int karkausvuosi(int vuosiluku);

char kkPituus(const char *kkNimi, int vuosiluku);
