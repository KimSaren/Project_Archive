/* Kim sarén
   kim.saren@tuni.fi
   Osa 4, H5 */

#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <locale.h>
#include <string.h>
#include <math.h>
#include "pvm_ero.h"

void pvm_ero(const char *pvm1, const char *pvm2)
{
    struct tm pvs1 = {0};
    struct tm pvs2 = {0};

    int pv1, pv2, kk1, kk2, y1, y2, erotus;
    double aikaero, valitulos;
    char lainausmerkki = '"';
    char tuloste[40];
    char merkki1[5], merkki2[5];

    setlocale(LC_TIME, "fi_FI.utf8");  /* Käyttöön suomenkieli UTF8-koodauksella. */

    /* Luetaan ensin vaadittavat yksiköt parametreista */
    sscanf(pvm1, "%2d.%2d.%4d", &pv1, &kk1, &y1);
    sscanf(pvm2, "%2d.%2d.%4d", &pv2, &kk2, &y2);
    


    sscanf(pvm1, "%[^.]", &merkki1);
    sscanf(pvm2, "%[^.]", &merkki2);

    /*
    printf("%s %s\n", merkki1, merkki2);
    */


    /*
    printf("pv1 %d kk1 %d y1 %d ", pv1, kk1, y1);
    printf("pv2 %d kk2 %d y2 %d \n", pv2, kk2, y2);
    */

    /* Asetetaan sitten tiedot luotuihin struktuureihin */
    pvs1.tm_mday = pv1;
    pvs1.tm_mon = kk1-1;
    pvs1.tm_year = y1-1900;
    pvs1.tm_isdst = 0;

    pvs2.tm_mday = pv2;
    pvs2.tm_mon = kk2-1;
    pvs2.tm_year = y2-1900;
    pvs2.tm_isdst = 0;



    /* Muunnos */
    mktime(&pvs1);
    mktime(&pvs2);

    /* Laiton 1 */
    if(((pvs1.tm_mday != pv1) || (pvs1.tm_mon != kk1-1) || pvs1.tm_year != y1-1900))
        fprintf(stderr, "Parametri %c%s%c tai %c%s%c on laiton!\n", lainausmerkki, pvm1, lainausmerkki, lainausmerkki, pvm2, lainausmerkki);
    /* Laiton 2 */
    else if(((pvs2.tm_mday != pv2) || (pvs2.tm_mon != kk2-1) || pvs2.tm_year != y2-1900))
        fprintf(stderr, "Parametri %c%s%c tai %c%s%c on laiton!\n", lainausmerkki, pvm1, lainausmerkki, lainausmerkki, pvm2, lainausmerkki);
    else if(strlen(merkki1)>2 || strlen(merkki2)>2)
        fprintf(stderr, "Parametri %c%s%c tai %c%s%c on laiton!\n", lainausmerkki, pvm1, lainausmerkki, lainausmerkki, pvm2, lainausmerkki);

    /* Lailliset syötteet */
    else
    {
        pvs1.tm_isdst = 0;
        pvs1.tm_isdst = 0;
        aikaero = difftime(mktime(&pvs1),mktime(&pvs2));


        /* Kumpi pvm ensin? */
        if(mktime(&pvs2)-mktime(&pvs1) >= 0)
        {
        /* Päivämäärien tulosteet */
        strftime(tuloste, 40, "%A %d.%m.%Y --> ", &pvs1);
        printf("%s", tuloste);

        strftime(tuloste, 40, "%A %d.%m.%Y: yhteensä ", &pvs2);
        printf("%s", tuloste);

        /* Aikaeron tuloste */
        valitulos = (-1)*(aikaero/(3600*24)-1);
        printf("%.0f päivää\n", valitulos);
        }

        else
        {
            /* Päivämäärien tulosteet */
        strftime(tuloste, 40, "%A %d.%m.%Y --> ", &pvs2);
        printf("%s", tuloste);

        strftime(tuloste, 40, "%A %d.%m.%Y: yhteensä ", &pvs1);
        printf("%s", tuloste);

        /* Aikaeron tuloste */
        valitulos = aikaero/(3600*24)+1;
        erotus = valitulos;
        printf("%.0f päivää\n", valitulos);
        }
    }
    

}