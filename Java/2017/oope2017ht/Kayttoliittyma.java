//Pakataan oope2017-pakkaukseen
package oope2017ht;

//Tuodaan tarvittavat paketit 
import oope2017ht.tiedot.*;
import oope2017ht.omalista.OmaLista;
import fi.uta.csjola.oope.lista.*;
import apulaiset.*;

/**
  * Käyttöliittymä-luokka, jossa luetaan syötteet sekä päätetään ohjelman jatkamisesta.
  * <p>
  * Harjoitustyö, Olio-ohjelmoinnin perusteet, kevät 2017.
  * <p>
  * @author Kim Sarén (saren.kim.A@student.uta.fi)
  */

public class Kayttoliittyma {
    
    /** 
      * Kyselysilmukka, jossa luetaan syötteet sekä siirretään komennot tulkille
      */
    public void syotteet() {
        String syote;
        Tulkki tulkki = new Tulkki();
        boolean jatketaan = true;
        System.out.println("Welcome to SOS.");
        //Jatketaan kyselyä niin pitkään, kuin jatketaan-muuttuja on tosi
        while(jatketaan) {
            //Tulostetaan hakemistopolku sekä merkki >
            tulkki.hakemistoPolku();
            System.out.print(">");
            syote = In.readString();
            jatketaan = tulkki.tulkitse(syote);
        }
        //Silmukka loppuu
        System.out.println("Shell terminated.");
    }
}