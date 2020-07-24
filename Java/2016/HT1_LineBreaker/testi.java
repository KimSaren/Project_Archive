/*
 *Kim Sarén, 415405, TIEP2
 *
 *Linebreaker-ohjelma
 *
 */

public class Testi {
   public static void main (String[] args) {
   //Esitellään muuttujia
   int leveys, pituus;
   String rivi;
   char syote;
   final char VL = ' ';
   final String VIRHE = "Error!";
   String laini;

      //Aloitetaan varsinainen koodaus
      //Iso silmukka, jossa kysely suoritetaan ainakin kerran
      boolean lippu2 = true;
      do {

         //Tervehdyssilmukka
         boolean lippu1 = true;
         do {
            System.out.println("Hello! I break lines.");
            System.out.println("Enter area width.");
            leveys = In.readInt();

            if(leveys >= 3)
               lippu1 = false;
            else if(leveys <3)
            System.out.println(VIRHE);
         }
         while(lippu1);


         //syötesilmukka 
         boolean lippu4 = true;
         do { 
            rivi="";
            System.out.println("Enter a line:");
            laini = In.readString();
            pituus = laini.length();


            //VIRHE 3 yksittäiset ovat sanat liian pitkiä
            //Silmukka, joka laskee sanojen pituudet ja vertaa niitä leveyteen ja määrää sopivan lippuarvon
            if((lippu4 == false) && (pituus != 1)) {
               for(int j = 0; j < pituus; j++) {
                  char kirjain = laini.charAt(j);
                  rivi = rivi + kirjain;
                  int pituus2 = rivi.length();
                  if(kirjain == VL) {
                     if(pituus2 <= leveys+1)
                        rivi = "";
                     else if(pituus2>leveys +1) {
                        lippu4 = true;
                        System.out.println(VIRHE);
                        rivi = "";
                        j = pituus;
                     }                     
                  }
                  else if(pituus2 > leveys) {
                     lippu4 = true;
                     System.out.println(VIRHE);
                     rivi = "";
                     j = pituus;
                  }
               }
            }

         }
         while(lippu4);


         //Tulostussilmukka
            



         //jatketaanko?
         boolean lippu3 = true;
         do {
            //Luetaan y/n-syöte käyttäjältä
            System.out.println("Continue?");
            syote=In.readChar();
            final char VALINTA1 = 'y';
            final char VALINTA2 = 'n';
            
            if(syote == VALINTA1)
               lippu3 = false;
            else if(syote == VALINTA2) {
               lippu3 = false;
               lippu2 = false;
            }
            else
               System.out.println(VIRHE);
         }
         while(lippu3);
      }
      while(lippu2);

      //Loppumoikka silmukoiden jälkeen
      System.out.println("See you soon!");
   }
}