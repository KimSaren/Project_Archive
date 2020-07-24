/*
 *Kim Sarén, 415405, TIEP2
 *
 *Linebreaker-ohjelma
 *
 */

public class LB1 {
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
         for(int i = 0; i < pituus; i++) {
            int j = 0;
            int apuluku = 0;
            int apuluku2 = 0;
            int k;
            char kirjain = laini.charAt(i);
            char kirjain2 = laini.charAt(j);
            char kirjain3 = laini.charAt(apuluku);
            int pituus2 = rivi.length();

            //kootaan leveyden mittainen rivi
            if((pituus2 == 0) && (kirjain != VL)) {
               rivi = rivi + kirjain;
               apuluku = i;
            }
            else if((pituus2 != 0) && (pituus2 < leveys))
               rivi = rivi + kirjain;
            else
               rivi = rivi;
            if(pituus2 == leveys-1)
               apuluku2 = i;

               //VAIHTOEHTO3 seuraava kirjasin EI välilyönti
               else if((i < pituus -1) && (kirjain != VL)) {

                  //Tehdään käänteinen silmukka, joka etsii ensimmäisen välilyönnin ja tallettaa indeksipisteen
                  for(j = i; j == apuluku; j--) {
                     k=j;
                     System.out.println(kirjain2);
                     if(kirjain2 == VL) {
                        //Sitten tulostetaan uusi rivi, tässä kohtaa apuluku tulee tarpeen
                        i = k;
                        j = apuluku;
                        for(apuluku = apuluku; apuluku < k; apuluku++) {
                           rivi = rivi + kirjain;
                              if(apuluku == k - 1) {
                                 for(apuluku = apuluku; apuluku <= apuluku2; apuluku++) {
                                    rivi = rivi + VL;
                                    if(apuluku == i) {
                                       System.out.println(rivi + "/");
                                       rivi = "";
                                    }
                                    
                                 }
                              }
                        }
                     }
                  }
               }
            }

            //Rakennetaan logiikkaa rivien sisentämiseen
            //VAIHTOEHTO1 rivi päättyy välilyöntiin
            if((pituus2 == leveys - 1) && (kirjain == VL)) {
               System.out.println(rivi + "/");
               rivi = "";
            }
            else if(pituus2 == leveys) {

               //VAIHTOEHTO2 rivin seuraava kirjasin on välilyönti
               if((i < pituus - 1) && (kirjain == VL)) {
                  System.out.println(rivi + "/");
                  rivi = "";
               }


            else if(i == pituus - 1) {
               if(pituus2 == leveys) {
                  System.out.println(rivi + "/");
                  rivi = "";
               }
               else if(pituus2 < leveys -1) {
                  String uRivi = rivi;
                  for(pituus2 = pituus2; pituus2 < leveys -1; pituus2++){
                     uRivi= uRivi + VL;
                  }
                  System.out.println(uRivi + "/");
               }
      }
            
      }




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