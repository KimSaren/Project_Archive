//Pakataan samaan pakkaukseen muiden tiedostojen kanssa
package oope2017ht.omalista;

// Otetaan käyttöön lista-pakkauksen sisältö
// sekä apulaiset-pakkaus
import fi.uta.csjola.oope.lista.*;
import apulaiset.*;
import oope2017ht.tiedot.*;
import oope2017ht.Tulkki;

/**
  * OmaLista-luokka, joka vastaa Linkitetyn Listan operaatioiden hyödyntämisestä
  * <p>
  * Harjoitustyö, Olio-ohjelmoinnin perusteet, kevät 2017.
  * <p>
  * @author Kim Sarén (saren.kim.A@student.uta.fi)
  */

public class OmaLista extends LinkitettyLista implements Ooperoiva {
    

   /*
    *Ooperoiva-luokasta saatujen metodien kuormitus
    */
   
   /** 
     * Metodi, joka hakee listasta objektin ja palauttaa siihen liittyvän viitteen.
     * @param haettavan objektin viite.
     * @return null, jos lista tai alkio on tyhjä. Alkio, kun löydetään viitettä vastaava
     * alkio listalta.
     */
   public Object hae(Object haettava) {
       if((onkoTyhja()) || (haettava == null)) {
           return null;
       }
       else {
           int indeksi;
           for(int i = 0; i < koko(); i++) {
               if(alkio(i).equals(haettava)) {
                   return alkio(i);
               }
           }
           return null;
       }
   }
   
   /** Metodi, joka lisää uuden alkion ja asettaa sen nousevaan aakkosjärjestykseen.
     * @param viite objektille, joka halutaan lisätä listaan.
     * @return false, jos lisäys epäonnistui. True, kun lisäys onnistui.
     */
   public boolean lisaa(Object uusi) {
        try {
            //Jos alkio on null-tyyppinen, lisäys ei onnistu
            Object viite = hae(uusi);
            if((uusi == null) || (viite != null))
                return false;
            //Lista on tyhjä ja alkio epätyhjä
            else if(koko() == 0) {
                lisaaAlkuun(uusi);
                return true;
            }
            //Lista on epätyhjä ja alkio on epätyhjä
            else {
                //Muuttuja arviointia varten
                int tulos;
                for(int i = 0; i < koko(); i++) {
                    Comparable vertailtava = (Comparable)alkio(i);
                    tulos = vertailtava.compareTo(uusi);
                    //Vertailun tuloksen perusteella suoritetaan mahd. toimenpiteitä
                    //Uusi alkio vertailtavan kanssa samassa aakkosjärjestyksessä
                    if(tulos == 0) {
                        if(i < (koko() - 1)) {
                            lisaa((i + 1), uusi);
                            i = koko();
                        }
                        else if(i == koko()) {
                            lisaaLoppuun(uusi);
                            i = koko();
                        }
                    }
                    //Uusi alkio ennen vertailukohdetta aakkosjärjestyksessä
                    else if(tulos > 0) {
                        if(i == 0) {
                            lisaaAlkuun(uusi);
                            i = koko();
                        }
                        else {
                            lisaa(i, uusi);
                            i = koko();
                        }
                    }
                    //Uusi alkio viimeisenä kaikista vertailukohteista
                    else if((i == (koko() - 1)) && (tulos < 0)) {
                        lisaaLoppuun(uusi);
                        i = koko();
                    }
                }
                return true;
            }
       }
       //Jos vertailu ei onnistu, napataan virhe ja palautetaan false
       catch(Exception e) {
           System.out.println("Error!");
           e.printStackTrace();
           return false;
       }
   }
   
   /** Poistaa objektin listalta, mikäli sen viite osuu yksiin listan olion kanssa
     * @param poistettavan objektin viite
     * @return null, kun poisto epäonnistui. Poistettavan objektin viite, kun poisto onnistui.
     */
   public Object poista(Object poistettava) {
       //Onko lista tai parametri tyhjä?
       if(onkoTyhja() || (poistettava == null))
           return null;
       else {
           //Etsitään sopivia viitteitä equals-metodin avulla
           for(int i = 0; i < koko(); i++) {
               if(alkio(i).equals(poistettava)){
                   poistettava = alkio(i);
                   poista(i);
                   return poistettava;
               }
           }
           return null;
       }
   }
}
