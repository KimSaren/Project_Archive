/* Kim Sarén
   kim.saren@tuni.fi
   Osa 4 H3 */

#include <stdio.h>
#include <time.h>
#include "viikko.h"

/* Funktion määrittely */
void viikko(int pv, int kk, int vuosi)
{
    time_t a = time(NULL); /* Alustetaan aika a */
    struct tm *b = gmtime(&a); /* struct time *b */
    char mj[50];

    /* Muutetaan ensin ajankohdat, kuten on määritelty käyttäjän syötteissä */
    b->tm_mday = pv;
    b->tm_mon = kk-1;
    b->tm_year = vuosi-1900;

    /* Korjataan loput arvot uuteen aika-muuttujaan  */
    mktime(b);

    /* Siirretään viikonpäivää taaksepäin, kunnes ollaan maanantaissa */
    if(b->tm_wday != 0)
    {
        while(b->tm_wday > 1)
        {
            b->tm_wday = b->tm_wday-1;
            b->tm_mday = b->tm_mday-1;
        }
    }

    else
    {
        b->tm_wday = 1;
        b->tm_mday = b->tm_mday-6;
    }

    /* Korjataan ajankohdat uudestaan */
    mktime(b);


    while(b->tm_wday >= 1) /* ma-la */
    {
        strftime(mj, 50, "%A %d. %B %Y", b);
        printf("%s\n", mj);

        b->tm_wday = b->tm_wday+1;
        b->tm_mday = b->tm_mday+1;
        
        mktime(b);
    }

    /* su */
    strftime(mj, 50, "%A %d. %B %Y", b);
    printf("%s\n", mj);



    /* Testi
    printf("päivä %d, kuukausi %d, vuosi%d, viikonpäivä %d\n", b->tm_mday, b->tm_mon, b->tm_year, b->tm_wday);
    */
}