/*
 *
 *Kim Sarén, saren.kim.A@uta.fi
 *
 *ASCIIArt-ohjelma, joka käsittelee komentoriviparametrina saamaansa
 *kuvatiedostoa erilaisin tulostin- ja suodatinominaisuuksin
 *
 */

import java.io.*;
public class ASCIIArt {
    
   //Määritellään luokkavakiot merkeille
   public static final char VARI_MUSTA = '#';
   public static final char VARI_HARMAA1 = '@';
   public static final char VARI_HARMAA2 = '&';
   public static final char VARI_HARMAA3 = '$';
   public static final char VARI_HARMAA4 = '%';
   public static final char VARI_HARMAA5 = 'x';
   public static final char VARI_HARMAA6 = '*';
   public static final char VARI_HARMAA7 = 'o';
   public static final char VARI_HARMAA8 = '|';
   public static final char VARI_HARMAA9 = '!';
   public static final char VARI_HARMAA10 = ';';
   public static final char VARI_HARMAA11 = ':';
   public static final char VARI_HARMAA12 = '\'';
   public static final char VARI_HARMAA13 = ',';
   public static final char VARI_HARMAA14 = '.';
   public static final char VARI_VALKOINEN = ' ';
    
    //Aloitusteksti, tulostetaan ohjelmalle "banneri"
    public static void Aloitus() {
        System.out.println("-------------------");
        System.out.println("| A S C I I A r t |");
        System.out.println("-------------------");
    }
    
    //Valintalohko, jossa käyttäjältä pyydetään syötteitä seuraaviin askeliin
    public static void Valinta(String tiedostoNimi, char[][] taulukko, int[][] lukuTaulukko, int rivit, int leveys) {
        //Muuttujat
        boolean jatketaanko = true;
        boolean valintatarkistin;
        //Suodattimen koko, defaultina 3
        int kokoS = 3;
        String valinta;
        //Vakioidaan käskyt
        final String quit = "quit";
        final String printa = "printa";
        final String printi = "printi";
        final String info = "info";
        final String reset = "reset";
        final String filter = "filter";
        //Tehdään do while-silmukka, joka jatkaa kyselyä kunnes painetaan quit-vaihtoehtoa
        do {
        //Tulostetaan vaihtoehdot
            System.out.println("printa/printi/info/filter [n]/reset/quit?");
            //Luetaan valinta
            valinta = In.readString();
            //Vaihtoehto printa
            if((valintatarkistin = valinta.equals(printa)) == true)
                Tulosta(taulukko, rivit, leveys);
            //Vaihtoehto printi
            if((valintatarkistin = valinta.equals(printi)) == true)
                Tulosta2(lukuTaulukko, rivit, leveys);
            //Vaihtoehto info
            if((valintatarkistin = valinta.equals(info)) == true)
                Info(taulukko, rivit, leveys);
            //Vaihtoehto filter [n]
            //Pilkotaan aluksi valinta kahteen osaan
            String[] osat = valinta.split("[ ]");
            if((valintatarkistin = osat[0].equals(filter) == true)) {
                if((osat.length == 2) && ((Integer.parseInt(osat[1])) >=3)) {
                    kokoS = Integer.parseInt(osat[1]);
                    lukuTaulukko = Filter(taulukko, lukuTaulukko, kokoS, rivit, leveys);
                }
                else {
                    kokoS = 3;
                    lukuTaulukko = Filter(taulukko,lukuTaulukko, kokoS, rivit,leveys);
                }
                taulukko = Number2Char(lukuTaulukko, rivit, leveys);
                    
            }
            //Vaihtoehto reset
            if((valintatarkistin = valinta.equals(reset)) == true) {
                taulukko = Fill(tiedostoNimi, rivit, leveys);
                lukuTaulukko = Char2Number(taulukko, rivit, leveys);
            }
                
            //Jos vaihtoehto on quit
            else if((valintatarkistin = valinta.equals(quit)) == true) {
                System.out.println("Bye, see you soon.");
                jatketaanko = false;
            }
        }
        while(jatketaanko);
    }
    
    //Filter-operaatio, joka suodattaa yksityiskohtia mediaanisuodattimen avulla
    public static int[][] Filter(char[][] taulukko, int[][] lukuTaulukko, int kokoS, int rivit, int leveys) {
        //Esitellään muuttujat
        int raja = kokoS - 1;
        int kokoA = kokoS*kokoS;
        int puolet = kokoA / 2;
        int i, j, luku;
        int md;
        //Aputaulukko, josta arvot uuteen taulukkoon katsotaan
        int[][] uusiLukuTaulukko = new int[rivit][leveys];
        uusiLukuTaulukko = Char2Number(taulukko, rivit, leveys);
        //Aputaulukko uudelleenjärjestelyä sekä mediaanin laskentaa varten
        int[] apuTaulukko = new int[kokoA];
        //Muodostetaan käsittelysilmukat
        i = 0;
        j = 0;
        while(i < (rivit - raja)) {
            j = 0;
            while(j < (leveys - raja)) {
                //Muodostetaan aputaulukko tässä
                apuTaulukko = muodostaApuT(apuTaulukko, lukuTaulukko, i, j, kokoS);
                //Järjestellään taulukko suuruusjärjestykseen
                valintalajittele(apuTaulukko);
                 // Lasketaan mediaani ja sijoitetaan se muuttujaan.
                md = laskeMediaani(apuTaulukko);
                //Ja lopuksi sijoitetaan mediaani uuteen lukutaulukkoon
                uusiLukuTaulukko = mdSijoitus(uusiLukuTaulukko, md, puolet, i, j, kokoS);
                j++;
            }
            i++;
        }
        return uusiLukuTaulukko;
    }
    
    //Operaatio mediaanin sijoittamiselle
    public static int[][] mdSijoitus(int[][] uusiLukuTaulukko,int md,int puolet, int i, int j, int kokoS) {
        int indi = i;
        int indj = j;
        int kohta = 0;
        int raja1 = i + kokoS;
        int raja2 = j + kokoS;
        while(indi < raja1) {
            indj = j;
            while(indj < raja2) {
                if(kohta != puolet) {
                    indj++;
                    kohta++;
                }
                else if(kohta == puolet) {
                    uusiLukuTaulukko[indi][indj] = md;
                    indj = raja2;
                    indi = raja1;
                }
            }
            indi++;
        }
        return uusiLukuTaulukko;
    }
    
    //Aputaulukon muodostamisen operaatio
    public static int[] muodostaApuT(int[] apuTaulukko, int[][] lukuTaulukko, int i, int j, int kokoS) {
        //Muuttujat silmukoihin
        int kohta = 0;
        int raja1 = i + kokoS;
        int raja2 = j + kokoS;
        int indi = i;
        int indj = j;
        int luku;
        while(indi < raja1) {
            indj = j;
            while(indj < raja2) {
                luku = lukuTaulukko[indi][indj];
                apuTaulukko[kohta] = luku;
                indj++;
                kohta++;
            }
            indi++;
        }
        return apuTaulukko;
    }
    
    /* Vaihtaa indeksiarvoihin a ja b liittyvien alkioiden arvot keskenään.
    * Paluuarvo on true, jos alkiot voitiin vaihtaa. Paluuarvo on false,
    * jos taulukolle ei ole varattu muistia tai indeksiarvoissa on virhe.
    */
   public static boolean vaihdaAlkiot(int[] luvut, int a, int b) {
      // Alustetaan paluuarvo virheen varalta epätodeksi.
      boolean vaihtoOnnistui = false;

      // Alkiot vaihdetaan vain, jos taulukolle on varattu muistia ja indeksiarvot
      // ovat oikeellisia.
      if (luvut != null)
         // 0 <= a, b < luvut.length.
         if ((0 <= a) && (0 <= b) && (a < luvut.length) && (b < luvut.length)) {
            // Otetaan ensimmäisen alkion alkuperäinen arvo talteen.
            int apu = luvut[a];
            
            // Korvataan ensimmäisen alkion arvo toisen alkion arvolla.
            luvut[a] = luvut[b];
            
            // Sijoitetaan apumuuttujaan säilötty ensimmäisen alkion alkuperäinen
            // arvo toisen alkion arvoksi.
            luvut[b] = apu;
            
            // Käännetään lippu onnistumisen merkiksi.
            vaihtoOnnistui = true;
         }

      // Palautetaan tieto vaihdosta.
      return vaihtoOnnistui;
   }
   
   /* Hakee ja palauttaa taulukon pienimmän alkion indeksin. Haku aloitetaan
    * annetusta paikasta. Jos pienimpiä arvoja on useita, on paluuarvo
    * ensimmäisen pienimmän alkion indeksi. Paluuarvo on negatiivinen,
    * jos taulukolle ei ole varattu muistia tai aloitusindeksi on virheellinen.
    */
   public static int haePienimmanAlkionIndeksi(int[] luvut, int alkuInd) {
      // Alustetaan paluuarvo virheen varalta
      int pienimmanLuvunIndeksi = -1;

      // Haetaan, jos paramerit ovat laillisia. Tarkistukset voivat olla samassa
      // lausekkeessa, kun null-arvo tarkistetaan aivan lausekkeen aluksi
      // ja lausekkeessa käytetään ehdollista AND-operaattoria, joka lopettaa
      // lausekkeen arvioinnin heti, kun lausekkeen lopputulos on selvillä.
      if (luvut != null && 0 <= alkuInd && alkuInd < luvut.length) {         
         // Annetaan pienimmän arvon sisältävälle muuttujalle suurin
         // mahdollinen arvo, jotta muuttujan arvo päivittyy varmasti.
         // (Jos taulukkossa on vain Integer.MAX_VALUE-arvoja paluuarvo
         // on käytäjän antama alkuindeksi.)
         int pieninLuku = Integer.MAX_VALUE;

         // Aloitetaan haku käytäjän määräämästä paikasta.
         int ind = alkuInd;
         
         // Tutkitaan koko taulukko alkio alkiolta.
         while (ind < luvut.length) {
         
            // Päivitetään pienimmän luvun ja sen indeksin muistuvat muuttujat,
            // jos nykyisen alkion arvo on tähän mennessä löydettyä pienintä
            // arvoa pienempi.
            int nykyinenLuku = luvut[ind];
            if (nykyinenLuku < pieninLuku) {
               pieninLuku = nykyinenLuku;
               pienimmanLuvunIndeksi = ind;
            }
            
            // Siirrytään seuraavaan alkioon.
            ind++;
         }
      }
      
      // Palautetaan tulos.
      return pienimmanLuvunIndeksi;
   }
   
   /* Lajittelee taulukon alkiot nousevaan järjestykseen valintalajittelulla.
    * Paluuarvo on true, jos taulukolle on varattu muistia ja siinä on alkioita.
    */
   public static boolean valintalajittele(int[] luvut) {
      // Tarkistetaan, että tarjolla on taulukko ja siinä lukuja.
      if (luvut != null && luvut.length > 0) {
         // Aloitetaan taulukon ensimmäisestä alkiosta.
         int ekanLajittelemattomanInd  = 0;
         
         // Lajitellaan.
         while (ekanLajittelemattomanInd  < luvut.length - 1) {
            // Haetaan lajittelematomista luvuista pienin.
            int pienimmanInd = haePienimmanAlkionIndeksi(luvut, ekanLajittelemattomanInd);
            
            // Alkioiden vaihto.
            vaihdaAlkiot(luvut, ekanLajittelemattomanInd, pienimmanInd);
            
            // Siirrytään seuraavaan alkioon.
            ekanLajittelemattomanInd++;
         }

         // Viestitään onnistumisesta.
         return true;
      }
      else
         return false;
   }
   
   /* Lasketaan ja palautetaan mediaani, jos taulukolle on varattu muistia 
    * ja siinä on alkioita. Virhetilanteessa paluuarvo on Double.NaN.
    */
   public static int laskeMediaani(int[] luvut) {
      // Asetetaan paluuarvoksi virhekoodi.
      int mediaani = 0;

      // Tarkistetaan, että on mistä laskea mediaani.
      if (luvut != null && luvut.length > 0) {
         boolean lajitteluOnnistui = valintalajittele(luvut);

         // Koodia toivottavasti selventävä apumuuttuja.
         int pituus = luvut.length;

         // Taulukko saattin lajiteltua.
         if (lajitteluOnnistui) {
            // Palautetaan keskimmäisimmän luvun arvo, kun lukuja on pariton määrä.
            if (luvut.length % 2 == 1)
               mediaani = luvut[pituus / 2];
         }
      }
      
      // Palautetaan tulos.
      return mediaani;
   }
    
    //Info-operaatio, joka tulostaa taulukon merkit ja niiden lukumäärät
    public static void Info(char[][] taulukko, int rivit, int leveys) {
        //Luodaan merkkitaulukko sekä muuttuja merkille sekä sen indeksille
        char merkki;
        char merkkiTaulukossa = ' ';
        int lukum = 0;
        char[] merkkiTaulukko = new char[] {VARI_MUSTA, VARI_HARMAA1, VARI_HARMAA2, VARI_HARMAA3,
        VARI_HARMAA4,VARI_HARMAA5,VARI_HARMAA6, VARI_HARMAA7, VARI_HARMAA8, VARI_HARMAA9, VARI_HARMAA10, 
        VARI_HARMAA11, VARI_HARMAA12, VARI_HARMAA13, VARI_HARMAA14, VARI_VALKOINEN};
        //Tarkistetaan, onko taulukolle varattu muistia
        if(taulukko != null) {
            //Tulostetaan ensin mitat
            System.out.println(rivit + " x " + leveys);
            //Sitten tarkastellaan merkkejä
            for(int k = 0; k < merkkiTaulukko.length; k++) {
                for(int i = 0; i < rivit; i++) {
                    for(int j = 0; j < leveys; j++) {
                        merkki = taulukko[i][j];
                        merkkiTaulukossa = merkkiTaulukko[k];
                        if(merkki == merkkiTaulukossa)
                            lukum = lukum + 1;
                    }
                }
            System.out.println(merkkiTaulukossa + " " + lukum);
            lukum = 0;
            }
        }
        
    }
        
    //Rivilaskuri tehtävästä 6
    public static int RiviCounter(String tiedostoNimi) {
        //Esitellään muuttuja esiintymille
        int rivilkm;
        //Sitten rakennetaan try- ja catch-logiikka livulle
        //Try-silmukka
        try{
            rivilkm = 0;
            //Esitellään syötevirta
            FileInputStream syotevirta = new FileInputStream(tiedostoNimi);
            //Sitten esitellään lukija
            InputStreamReader lukija = new InputStreamReader(syotevirta);
            //Lopuksi luodaan puskuroitu lukija
            BufferedReader puskuroituLukija = new BufferedReader(lukija);
            while (puskuroituLukija.ready()) {
                String rivi = puskuroituLukija.readLine();
                rivilkm = rivilkm + 1;
            }
            puskuroituLukija.close();
            return rivilkm;
        }
        //Catch-silmukka virheiden nappaamiseen
        catch (FileNotFoundException e) {
            rivilkm = -1;
            return rivilkm;
        }
        catch (Exception e) {
            rivilkm = -1;
            return rivilkm;
        }
    }
    
    //Leveyslaskuri, sovellettuna t. 6
    public static int LeveysCounter(String tiedostoNimi) {
        //Esitellään muuttuja esiintymille
        int rivileveys;
        //Sitten rakennetaan try- ja catch-logiikka livulle
        //Try-silmukka
        try{
            rivileveys = 0;
            //Esitellään syötevirta
            FileInputStream syotevirta = new FileInputStream(tiedostoNimi);
            //Sitten esitellään lukija
            InputStreamReader lukija = new InputStreamReader(syotevirta);
            //Lopuksi luodaan puskuroitu lukija
            BufferedReader puskuroituLukija = new BufferedReader(lukija);
            while (puskuroituLukija.ready()) {
                String rivi = puskuroituLukija.readLine();
                rivileveys = rivi.length();
            }
            puskuroituLukija.close();
            return rivileveys;
        }
        //Catch-silmukka virheiden nappaamiseen
        catch (FileNotFoundException e) {
            rivileveys = -1;
            return rivileveys;
        }
        catch (Exception e) {
            rivileveys = -1;
            return rivileveys;
        }
    }
    
    //Täyttöoperaatio, jossa ladataan taulukko käyttäjän antamasta tiedostosta
    public static char[][] Fill(String tiedostoNimi, int rivit, int leveys) {
        //Luodaan uusi taulukko
        char[][] uusiTaulukko = new char[rivit][leveys];
        //Muuttuja i
        int i = 0;
        //Try- ja catch-silmukat
        //Try
        try{
            //Esitellään syötevirta
            FileInputStream syotevirta = new FileInputStream(tiedostoNimi);
            //Sitten esitellään lukija
            InputStreamReader lukija = new InputStreamReader(syotevirta);
            //Lopuksi luodaan puskuroitu lukija
            BufferedReader puskuroituLukija = new BufferedReader(lukija);
            while (puskuroituLukija.ready()) {
                String rivi = puskuroituLukija.readLine();
                for(int j = 0; j < leveys; j++) {
                    uusiTaulukko[i][j] = rivi.charAt(j);
                }
                i++;
            }
            puskuroituLukija.close();
            return uusiTaulukko;
        }
        //Catch-silmukka virheiden nappaamiseen
        catch (FileNotFoundException e) {
            uusiTaulukko = null;
            return uusiTaulukko;
        }
        catch (Exception e) {
            uusiTaulukko = null;
            return uusiTaulukko;
        }
    }
    
    //Char2Number-operaatio, joka muuttaa merkit numeroiksi taulukossa
    public static int[][] Char2Number(char[][] taulukko, int rivit, int leveys) {
        //Merkkitaulukko, jossa tehdään vertailu
        char[] merkkiTaulukko = new char[] {VARI_MUSTA, VARI_HARMAA1, VARI_HARMAA2, VARI_HARMAA3,
        VARI_HARMAA4,VARI_HARMAA5,VARI_HARMAA6, VARI_HARMAA7, VARI_HARMAA8, VARI_HARMAA9, VARI_HARMAA10, 
        VARI_HARMAA11, VARI_HARMAA12, VARI_HARMAA13, VARI_HARMAA14, VARI_VALKOINEN};
        //Lukutaulukko, joka täytetään
        int[][] lukuTaulukko = new int[rivit][leveys];
        //Muuttujien esittely
        char merkki;
        //Vertailu ja täyttö
        for(int i = 0; i < rivit; i++) {
            for(int j = 0; j < leveys; j++) {
                for(int k = 0; k < merkkiTaulukko.length; k++) {
                    merkki = merkkiTaulukko[k];
                    if(taulukko[i][j] == merkki) {
                        lukuTaulukko[i][j] = k;
                        k = merkkiTaulukko.length - 1;
                    }
                }
            }
        }
        return lukuTaulukko;
    }
    
    //Number2Char-operaatio, joka muuttaa numerot merkeiksi taulukossa
    public static char[][] Number2Char(int[][] lukuTaulukko, int rivit, int leveys) {
        //Luodaan taulukko merkeille, josta tehdään vertailu
       char[] merkkiTaulukko = new char[] {VARI_MUSTA, VARI_HARMAA1, VARI_HARMAA2, VARI_HARMAA3,
       VARI_HARMAA4, VARI_HARMAA5,VARI_HARMAA6, VARI_HARMAA7, VARI_HARMAA8, VARI_HARMAA9, VARI_HARMAA10, 
       VARI_HARMAA11, VARI_HARMAA12, VARI_HARMAA13, VARI_HARMAA14, VARI_VALKOINEN};
       //Täytettävä taulukko
       char[][] taulukko = new char[rivit][leveys];
       //Esitellään muuttujat
       char merkki;
       int luku;
       //Vertailu ja täyttö
       for(int i = 0; i < rivit; i++) {
            for(int j = 0; j < leveys; j++) {
                for(int k = 0; k < merkkiTaulukko.length; k++) {
                    luku = lukuTaulukko[i][j];
                    merkki = merkkiTaulukko[luku];
                    taulukko[i][j] = merkki;
                }
            }
        }
        return taulukko;
    }
    
    //Tulostusoperaatio merkeille, tulostaa merkkitaulukon
    public static void Tulosta(char[][] taulukko, int rivit, int leveys) {
        // Tulostetaan, jos on varattu muistia.
        if (taulukko != null) {
            for(int i = 0; i < rivit; i++) {
                for(int j = 0; j < leveys; j++){
                    if(j < leveys - 1)
                        System.out.print(taulukko[i][j]);
                    else
                        System.out.println(taulukko[i][j]);
                }
            }
        }
    }
    
    //Tulostusoperaatio luvuille, tulostaa kokonaislukutaulukon
    public static void Tulosta2(int[][] lukuTaulukko, int rivit, int leveys) {
        //Lukumuuttuja silmukalle
        int luku;
        // Tulostetaan, jos on varattu muistia.
        if (lukuTaulukko != null) {
            for(int i = 0; i < rivit; i++) {
                for(int j = 0; j < leveys; j++){
                    luku = lukuTaulukko[i][j];
                    if(j < leveys - 1) {
                        if(luku < 10)
                            System.out.print(" " + lukuTaulukko[i][j] + " ");
                        else if(luku>=10)
                            System.out.print(lukuTaulukko[i][j] + " ");
                    }
                    else {
                        if(luku < 10)
                            System.out.println(" " + lukuTaulukko[i][j]);
                        else if(luku>=10)
                            System.out.println(lukuTaulukko[i][j]);
                    }
                }
            }
        }
    }
    
    //Pääoperaatio alkaa tästä
    public static void main(String[] args) {
        //Esitellään muuttujat
        int rivit, leveys;
        String tiedostoNimi = args[0];
        //Aloitusteksti tulostetaan ensin
        Aloitus();
        //Lasketaan tiedoston rivit
        rivit = RiviCounter(tiedostoNimi);
        //Lasketaan leveys
        leveys = LeveysCounter(tiedostoNimi);
        //Ja luodaan sitten taulukko luvuille ja kirjaimille
        char[][] taulukko;
        int[][] lukuTaulukko;
        //Mikäli käyttäjän antama syöte on oikeellinen, täytetään taulukko
        if((rivit != -1) && (leveys != -1)) {
            taulukko = new char[rivit][leveys];
            taulukko = Fill(tiedostoNimi, rivit, leveys);
            lukuTaulukko = new int[rivit][leveys];
            lukuTaulukko = Char2Number(taulukko, rivit, leveys);
        }
        //Mikäli ei, saadaan null-muotoinen, tyhjä taulukko
        else {
            taulukko = null;
            lukuTaulukko = null;
        }
        //Kutsutaan sitten valintaoperaattoria, mikäli taulut ovat epätyhjiä
        if((taulukko != null) && (lukuTaulukko != null))
            Valinta(tiedostoNimi, taulukko, lukuTaulukko, rivit, leveys);
        //Mikäli taulukot ovat epätyhjiä, lopetetaan ohjelma tähän.
        else {
            System.out.println("Invalid command-line argument!");
            System.out.println("Bye, see you soon.");
        }
            
    }
}
