#include <stdio.h>
#include <stdlib.h>
#include <string.h> /* Vertailufunktio strcmp, pituusfunktio strlen. */
#include "mjonot.h"

int pituusjarj(const char *a, const char *b)
{
  return (strlen(a) < strlen(b));  /* Onko a lyhyempi? */
}

int aakkosjarj(const char *a, const char *b)
{ /* strcmp vertaa merkkijonojen aakkosjärjestystä. Merkkijonojen a ja b
     vertailun tulos palautuu int-arvona, joka on negatiivinen, jos a < b,
     nolla, jos a == b ja positiivinen, jos a > b. */
  return (strcmp(a, b) < 0);   /* Onko a aakkosjärjestyksessä pienempi? */
}

int main(int argc, char *argv[])
{
  size_t lkm = argc-1;
  char **aakkoset = jarjesta_mjt(&argv[1], lkm, aakkosjarj);
  char **pituudet = jarjesta_mjt(&argv[1], lkm, pituusjarj);
  size_t i = 0;
  printf("Alkuperäinen järjestys:\n");
  for(i = 1; i <= lkm; ++i)
  {
    printf(" %s\n", argv[i]);
  }
  printf("Pituusjärjestys:\n");
  for(i = 0; i < lkm; ++i)
  {
    printf(" %s\n", pituudet[i]);
    free(pituudet[i]); /* Ei enää tarvita. */
  }
  free(pituudet);
  printf("Aakkosjärjestys:\n");
  for(i = 0; i < lkm; ++i)
  {
    printf(" %s\n", aakkoset[i]);
    free(aakkoset[i]);
  }
  free(aakkoset);
  return 0;
}