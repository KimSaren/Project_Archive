//Pakataan samaan pakkaukseen muiden tiedostojen kanssa
package oope2017ht.omalista;

// Otetaan k�ytt��n lista-pakkauksen sis�lt�
// sek� apulaiset-pakkaus
import fi.uta.csjola.oope.lista.*;
import apulaiset.*;
import oope2017ht.tiedot.*;
import oope2017ht.Tulkki;

/**
  * OmaLista-luokka, joka vastaa Linkitetyn Listan operaatioiden hy�dynt�misest�
  * <p>
  * Harjoitusty�, Olio-ohjelmoinnin perusteet, kev�t 2017.
  * <p>
  * @author Kim Sar�n (saren.kim.A@student.uta.fi)
  */

public class OmaLista extends LinkitettyLista implements Ooperoiva {
    

   /*
    *Ooperoiva-luokasta saatujen metodien kuormitus
    */
   
   /** 
     * Metodi, joka hakee listasta objektin ja palauttaa siihen liittyv�n viitteen.
     * @param haettavan objektin viite.
     * @return null, jos lista tai alkio on tyhj�. Alkio, kun l�ydet��n viitett� vastaava
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
   
   /** Metodi, joka lis�� uuden alkion ja asettaa sen nousevaan aakkosj�rjestykseen.
     * @param viite objektille, joka halutaan lis�t� listaan.
     * @return false, jos lis�ys ep�onnistui. True, kun lis�ys onnistui.
     */
   public boolean lisaa(Object uusi) {
        try {
            //Jos alkio on null-tyyppinen, lis�ys ei onnistu
            Object viite = hae(uusi);
            if((uusi == null) || (viite != null))
                return false;
            //Lista on tyhj� ja alkio ep�tyhj�
            else if(koko() == 0) {
                lisaaAlkuun(uusi);
                return true;
            }
            //Lista on ep�tyhj� ja alkio on ep�tyhj�
            else {
                //Muuttuja arviointia varten
                int tulos;
                for(int i = 0; i < koko(); i++) {
                    Comparable vertailtava = (Comparable)alkio(i);
                    tulos = vertailtava.compareTo(uusi);
                    //Vertailun tuloksen perusteella suoritetaan mahd. toimenpiteit�
                    //Uusi alkio vertailtavan kanssa samassa aakkosj�rjestyksess�
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
                    //Uusi alkio ennen vertailukohdetta aakkosj�rjestyksess�
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
                    //Uusi alkio viimeisen� kaikista vertailukohteista
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
   
   /** Poistaa objektin listalta, mik�li sen viite osuu yksiin listan olion kanssa
     * @param poistettavan objektin viite
     * @return null, kun poisto ep�onnistui. Poistettavan objektin viite, kun poisto onnistui.
     */
   public Object poista(Object poistettava) {
       //Onko lista tai parametri tyhj�?
       if(onkoTyhja() || (poistettava == null))
           return null;
       else {
           //Etsit��n sopivia viitteit� equals-metodin avulla
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
