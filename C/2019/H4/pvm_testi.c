/* Kim sarén
   kim.saren@tuni.fi
   Osa 4, H5 */

#include <stdio.h>
#include <time.h>
#include "pvm_ero.h"

int main(void)
{
    char pvm1[20] = "26.04.2016";
    char pvm2[20] = "09.5.2013";

    pvm_ero(pvm1, pvm2);

    return 0;
}