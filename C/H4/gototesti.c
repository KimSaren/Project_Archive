#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
#include <time.h>

#include "gotokoe.h"

int main(int argc, char *argv[])
{
  int kork = atoi(argv[1]);
  int lev = atoi(argv[2]);
  int **t2d = malloc(kork*sizeof(int *));
  int i = 0, j = 0;
  int max1 = INT_MIN, max2 = INT_MIN;
  srand(time(NULL));
  for(i = 0; i < kork; ++i)
  {
    t2d[i] = malloc(lev*sizeof(int));
    for(j = 0; j < lev; ++j)
    {
      t2d[i][j] = rand();
      max1 = (max1 < t2d[i][j]) ? t2d[i][j] : max1;
    }
  }
  max2 = max2D(t2d, kork, lev);
  if(max1 == max2)
  {
    printf("Maksimi ok, %d\n", max1);
  }
  else
  {
    printf("Virhe, maksimi on %d eikä %d\n", max1, max2);
  }
  for(i = 0; i < kork; ++i)
  {
    free(t2d[i]);
  }
  free(t2d);
  return 0;
}