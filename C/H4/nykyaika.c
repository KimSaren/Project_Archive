/* Kim Sarén
   kim.saren@tuni.fi
   Osa 4 H3 */

#include <stdio.h>
#include <time.h>

int main(void)
{
    time_t a = time(NULL); /* Alkuaika */
    struct tm *b = localtime(&a); /* Paikallinen aika */

    if(b->tm_wday == 1)
        printf("Maanantai");
    
    else if(b->tm_wday == 2)
        printf("Tiistai");

    else if(b->tm_wday == 3)
        printf("Keskiviikko");
    
    else if(b->tm_wday == 4)
        printf("Torstai");
    
    else if(b->tm_wday == 5)
        printf("Perjantai");
    
    else if(b->tm_wday == 6)
        printf("Lauantai");
    
    else if(b->tm_wday == 7)
        printf("Sunnuntai");
    

    /* Loput tulostuksesta */
    if(b->tm_mon >= 9)
        printf(" %d.%d.%d klo %d:%d\n", b->tm_mday, b->tm_mon+1, b->tm_year+1900, b->tm_hour, b->tm_min);

    else if(b->tm_mon < 9)
        printf(" %d.0%d.%d klo %d:%d\n", b->tm_mday, b->tm_mon+1, b->tm_year+1900, b->tm_hour, b->tm_min);

    return 0;
}