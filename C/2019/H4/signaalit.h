/* Kim sarén
   kim.saren@tuni.fi
   Osa 4, H2 */

#include <signal.h>
#include <setjmp.h>

/* Muuttujan esittely */
extern jmp_buf paluuTila;

/*Funktioiden esittely */
void hoidaSIGFPE(int s);

void hoidaSIGSEGV(int s);