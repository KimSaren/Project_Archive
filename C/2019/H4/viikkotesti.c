#include <locale.h>  /* Ympäristön asetuksessa käytettävä funktio setlocale. */
#include <stdlib.h>

#include "viikko.h"

int main(int argc, char *argv[])
{
  viikko(atoi(argv[1]), atoi(argv[2]), atoi(argv[3]));
  setlocale(LC_TIME, "fi_FI.utf8");  /* Käyttöön suomenkieli UTF8-koodauksella. */
  viikko(atoi(argv[1]), atoi(argv[2]), atoi(argv[3]));
  return 0;
}