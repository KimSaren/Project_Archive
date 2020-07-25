#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static int dblLaskevaVrt(const void *a, const void *b)
{
  const double *x = a; /* Funktio olettaa, että a ja b osoittavat */
  const double *y = b; /* double -arvoihin. */
  return (*x > *y) ? -1 : ((*x < *y) ? 1 : 0); /* Osoitettujen arvojen vertailu. */
} /* Huomaa vertailun "päinvastaisuus", koska vertailu vastaa laskevaa järjestystä. */

static int mjKasvavaVrt(const void *a, const void *b)
{
  char * const *x = a; /* char * const *, koska funktio olettaa, että a ja b osoittavat */
  char * const *y = b; /* char * -merkkijonoihin osoittaviin vakio-osoittimiin! */
  return strcmp(*x, *y); /* Epäsuorasti osoitettujen merkkijonojen vertailu strcmp:llä. */
}

int main(int argc, char *argv[])
{
  int i = 0;
  double dt[5] = {-345.55, 123.45, -729.61, 3.14, 95.70};
  qsort(dt, 5, sizeof(double), dblLaskevaVrt);
  qsort(argv + 1, argc - 1, sizeof(char *), mjKasvavaVrt);
  for(i = 0; i < 5; ++i)
  {
    printf(" %.2f", dt[i]);
  }
  printf("\n");
  for(i = 1; i < argc; ++i)
  {
    printf(" %s", argv[i]);
  }
  printf("\n");
  return 0;
}