/* Kim sarén
   kim.saren@tuni.fi
   Osa 4, H2 */

#include <stdio.h>
#include <stdlib.h>
#include <setjmp.h>
#include <signal.h>
#include "signaalit.h"

/* Muuttujien määrittely */
jmp_buf paluuTila;

/* Funktiot */
void hoidaSIGFPE(int s)
{
    signal(SIGFPE, hoidaSIGFPE);
    longjmp(paluuTila, SIGFPE);
}


void hoidaSIGSEGV(int s)
{
    signal(SIGFPE, hoidaSIGSEGV);
    longjmp(paluuTila, SIGSEGV);
}