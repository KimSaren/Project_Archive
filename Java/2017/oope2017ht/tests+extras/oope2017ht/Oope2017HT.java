package oope2017ht;


import oope2017ht.tiedot.*;
import oope2017ht.omalista.OmaLista;
import fi.uta.csjola.oope.lista.*;
import apulaiset.*;

/**
  * Main-operaation sisältävä ajoluokka, josta prosessi lähtee liikenteeseen.
  * <p>
  * Harjoitustyö, Olio-ohjelmoinnin perusteet, kevät 2017.
  * <p>
  * @author Kim Sarén (saren.kim.A@student.uta.fi)
  */
public class Oope2017HT {
    public static void main(String[] args) {
        //Luodaan uusi käyttöliittymä
        Kayttoliittyma kl = new Kayttoliittyma();
        
        //Suoritetaan käyttöliittymä
        kl.syotteet();
    }
}