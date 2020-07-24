/*
 *Kim Sarén, 415405, TIEP2
 *
 *Linebreaker-ohjelma
 *
 */

public class LineBreaker {
   public static void main (String[] args) {
   //Esitellään muuttujia
   int leveys, pituus;
   String rivi;
   char syote;
   final char VL = ' ';
   final String VIRHE = "Error!";
   String laini;

   //Alkumoikka
   System.out.println("Hello! I break lines.");

      //Aloitetaan varsinainen koodaus
      //Iso silmukka, jossa kysely suoritetaan ainakin kerran
      boolean lippu2 = true;
      do {

         //Tervehdyssilmukka
         boolean lippu1 = true;
         do {
            System.out.println("Enter area width:");
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

            //VIRHE 1, aloitus välilyönnillä tai rivi loppuu välilyöntiin
            if((laini.charAt(0) == VL) ||  (laini.charAt(pituus-1) == VL)) {
               System.out.println(VIRHE);
               lippu4 = true;
            }



            //VIRHE 2 peräkkäiset välilyönnit tai rivi loppuu välilyöntiin
            else if(pituus != 1) {
               for(int i = 0; i < pituus-1; i++) {
                  char ekaMerkki = laini.charAt(i);
                  char tokaMerkki = laini.charAt(i+1);
                  if((ekaMerkki == VL) && (tokaMerkki == VL)) {
                     i = pituus;
                     System.out.println(VIRHE);
                     lippu4 = true;
                  }
                  else
                     lippu4 = false;
               }
            }

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
rivi = "";
String etuJono = "";
String takaJono = "";

//Tulostetaan rivejä välilyöntiin asti, tai kunnes päästään silmukan loppuun asti
for(int i = 0; i < pituus; i++) {
   char kirjain = laini.charAt(i);
   int riviPituus = rivi.length();
   int takaPituus = takaJono.length();
   int etuPituus = etuJono.length();
   if((kirjain != VL) && (i < pituus -1 ))
      rivi = rivi + kirjain;
   else if((riviPituus == 0) && (kirjain == VL))
      rivi = rivi;
   else if(kirjain == VL) {
      //TAPAUS 1, ei aiempaa jonoa ja pituus leveyden mittainen
      if((riviPituus == leveys) && (takaPituus == 0)) {
         System.out.println(rivi + "/");
         rivi = "";
      }
      //TAPAUS 2, rivi lyhyempi kuin leveys, ei aiempaa jonoa tallennettu 
      else if((riviPituus < leveys) && (takaPituus == 0)) {
         takaJono = rivi;
         rivi = "";
      }
      //TAPAUS 3, aiempi jono tallennettu ja rivin pituus leveyden mittainen
      else if((riviPituus == leveys) && (takaPituus != 0)) {
         //Tallennetun rivin täyttö ja tulostus ensin
         while(takaPituus < leveys) {
            takaJono = takaJono + VL;
            takaPituus = takaJono.length();
         }
         System.out.println(takaJono + "/");
         System.out.println(rivi + "/");
         rivi = "";
         takaJono = "";
      }
      //TAPAUS4, rivi lyhyempi kuin leveys, aiempi jono tallennettu
      else if((riviPituus < leveys) && (takaPituus != 0)) {
         etuJono = takaJono + VL + rivi;
         etuPituus = etuJono.length();
         //ALITAPAUS 4.1 yhdistetty jono on leveyden mittainen
         if(etuPituus == leveys) {
            System.out.println(etuJono + "/");
            etuJono = "";
            takaJono = "";
            rivi = "";
         }
         //ALITAPAUS 4.2 Yhdistetty jono leveyttä suurempi
         else if(etuPituus > leveys) {
            while(takaPituus < leveys) {
               takaJono = takaJono + VL;
               takaPituus = takaJono.length();
            }
            System.out.println(takaJono + "/");
            takaJono = rivi;
            rivi = "";
            etuJono = "";
         }
         //ALITAPAUS 4.3 Yhdistetty jono lyhyempi kuin leveys, muodostetaan siitä uusi takaJono
         else if(etuPituus < leveys) {
            takaJono = etuJono;
            etuJono = "";
            rivi = "";
         }
      }
   }
   //TAPAUS5 Ei välilyöntejä, saavutetaan silmukan loppu.
   else if(i == pituus - 1) {
      rivi = rivi + kirjain;
      riviPituus = rivi.length();
      takaPituus = takaJono.length();
      //ALITAPAUS 5.00 Ei aiempaa rivia, uusi rivi vaaditun mittainen
      if((takaPituus == 0) && (riviPituus == leveys)) {
         System.out.println(rivi + "/");
         rivi = "";
      }
      //ALITAPAUS 5.1 Ei aiempaa jonoa, tulostetaan viimeinen rivi
      else if(takaPituus == 0) {
         while(riviPituus < leveys) {
            rivi = rivi + VL;
            riviPituus = rivi.length();
         }
      System.out.println(rivi + "/");
      rivi = "";
      }
      //ALITAPAUS 5.2 Aiempi jono tallessa
      else if(takaPituus != 0) {
         etuJono = takaJono + VL + rivi;
         etuPituus = etuJono.length();
         //ALITAPAUS 5.21 Uusi jono leveyden mittainen
         if(etuPituus == leveys) {
            System.out.println(etuJono + "/");
         }
         //ALITAPAUS 5.22 Uusi jono lyhyempi kuin leveys
         else if(etuPituus < leveys) {
            while(etuPituus < leveys) {
               etuJono = etuJono + VL;
               etuPituus = etuJono.length();
            }
         System.out.println(etuJono + "/");
         }
         //ALITAPAUS 5.23 Uusi jono pidempi kuin leveys
         else if(etuPituus > leveys) {
            while(takaPituus < leveys) {
               takaJono = takaJono + VL;
               takaPituus = takaJono.length();
            }
            while(riviPituus < leveys) {
               rivi = rivi + VL;
               riviPituus = rivi.length();
            }
            System.out.println(takaJono + "/");
            System.out.println(rivi + "/");
         }
      }
      rivi = "";
      takaJono = "";
      etuJono = "";
   }
}



         //jatketaanko?
         boolean lippu3 = true;
         do {
            //Luetaan y/n-syöte käyttäjältä
            System.out.println("Continue (y/n)?");
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
      System.out.println("See you soon.");
   }
}