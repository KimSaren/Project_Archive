/* Kim Sarén
   kim.saren@tuni.fi
   Osa 4, harjoitus 1 */

#include "gotokoe.h"

/* Muodostetaan funktio */
int max2D(int **t2d, int kork, int lev)
{
    int max = 0; /* Tallennuspaikka korkeimmalle arvolle */
    int i = -1, j = 0; /* "Luuppipaikat" */



    ULKOSILMUKKA:
    j = 0;  
    i++; /* Lisäys poikkeuksellisesti tässä */

    if(!(i < kork)) /* Tarkistusehto i:lle */
        goto LOPPU;

    goto SISASILMUKKA;



    SISASILMUKKA:
    if(!(j < lev)) /* Tarkistusehto j:lle */
        goto ULKOSILMUKKA;

    if(!(t2d[i][j] <= max))
        goto MAKSIMI;
    
    j++;
    goto SISASILMUKKA;
    



    MAKSIMI:
    max = t2d[i][j];
    j++;
    goto SISASILMUKKA;


    LOPPU:
    return max;
}