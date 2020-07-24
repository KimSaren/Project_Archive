/* Kim sarén
   kim.saren@tuni.fi
   Osa 4, H2 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <setjmp.h>
#include <signal.h>
#include "signaalit.h"

/* Muuttujat */
char syote[30];
int luku, a, b;
unsigned int i, j;

/* Main-funktio */
int main(void)
{
    /* Luodaan int-taulukko lukujen käsittelyä varten */
    int lkm = 0;
    int *taulukko = malloc(sizeof(int)*(lkm+1));

    /* Uudelleenohjataan signaalit */
    signal(SIGFPE, hoidaSIGFPE);
    signal(SIGSEGV, hoidaSIGSEGV);


    /* Jatketaan silmukkaa, kunnes syöte on jokin vaihtoehdoista */
    while(fgets(syote, 30, stdin) && (sscanf(syote,"%d %d", &a, &b) ||
    sscanf(syote,"tulosta %u", &i) || sscanf(syote,"tulosta")))
    {
        printf(" -1 ");
        /* Switch-rakenne valinnoista */
        switch(setjmp(paluuTila))
        {
            case 0:
            {
                printf(" 0 ");
                if(strcmp(syote, "lisää %d %d") == 0)
                {
                    printf(" 1 ");
                    lkm = lkm + 1;
                    taulukko = realloc(taulukko, lkm+1); /* Kasvatetaan taulukon kokoa */
                    luku = a/b;
                    taulukko[lkm-1] = luku;
                }
                
                else if(strcmp(syote, "tulosta %u") == 0)
                {
                    printf(" 2 ");
                    printf("%d\n", taulukko[i]);
                }
                
                else if(strcmp(syote, "tulosta") == 0)
                {
                    printf(" 3 ");
                    for(j = 0; j < lkm; j++)
                    {
                        if(j == 0)
                            printf("%d", taulukko[j]);
                        else
                            printf(" %d", taulukko[j]);
                    }
                    printf("\n");
                }
            }


            case SIGFPE:
            {
                printf("Aiheutui signaali SIGFPE\n");
            }


            case SIGSEGV:
            {
                printf("Aiheutui signaali SIGSEGV\n");
            }


            default:
            {
                printf("Aiheutui signaali UNKNOWN\n");
            }
        }
    }

    return 0;
}