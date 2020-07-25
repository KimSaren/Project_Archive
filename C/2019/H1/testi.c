#include <stdio.h>

#include "likimvrt.h"

int main(void)
{
  double d = 3*0.1;
  if(d == 0.3)
  {
    printf("Arvo d = %.20f on %.20f\n", d, 0.3);
  }
  else
  {
    printf("Arvo d = %.20f ei ole %.20f\n", d, 0.3);
  }
  printf("Toleranssi: %.20f\n", lueToleranssi());
  if(doubleVrt(d, 0.3))
  {
    printf("Arvo d = %.20f on likimäärin %.20f\n", d, 0.3);
  }
  else
  {
    printf("Arvo d = %.20f ei ole likimäärin %.20f\n", d, 0.3);
  }
  asetaToleranssi(0.0000000000000000001);
  printf("Uusi toleranssi: %.20f\n", lueToleranssi());
  if(doubleVrt(d, 0.3))
  {
    printf("Arvo d = %.20f on likimäärin %.20f\n", d, 0.3);
  }
  else
  {
    printf("Arvo d = %.20f ei ole likimäärin %.20f\n", d, 0.3);
  } 
  return 0;
}