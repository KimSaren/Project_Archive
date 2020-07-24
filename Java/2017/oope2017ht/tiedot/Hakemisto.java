package oope2017ht.tiedot;
import apulaiset.*;
import fi.uta.csjola.oope.lista.*;
import oope2017ht.*;
import oope2017ht.omalista.OmaLista;

/**
  * Hakemisto-luokka, joka vastaa hakemistojen toiminnallisuudesta.
  * <p>
  * Harjoitustyö, Olio-ohjelmoinnin perusteet, kevät 2017.
  * <p>
  * @author Kim Sarén (saren.kim.A@student.uta.fi)
  */


public class Hakemisto extends Tieto implements Komennettava<Tieto> {
    //Attribuutit
    /** Listan attribuutti, johon säilytään hakemiston sisältö */
    private OmaLista lista;
    /** Ylihakemiston viite, jonka avulla hakemistot sidotaan toisiinsa */
    private Hakemisto ylihakemisto;
    
    //Rakentajat
    public Hakemisto(StringBuilder n, Hakemisto yh) throws IllegalArgumentException {
        super(n);
        try {
            //Tarkistetaan, onko nimi oikeellinen
            ylihakemisto = yh;
            lista = new OmaLista();
        }
        catch(IllegalArgumentException e) {
            throw new IllegalArgumentException();
        }
    }
    
    /** Metodi ylihakemiston palautukseen
      * @return palauttaa viitteen nykyisen hakemiston ylihakemistoon
      */
    public Hakemisto haeYH() {
        return ylihakemisto;
    }
    
    //Komennettava-rajapinnasta perityt metodit ja niiden kuormitus
    /** Aksessori hakemiston listaan.
      * @return palauttaa nykyisen hakemiston listan, eli sisällön.
      */
    public OmaLista sisalto() {
        return lista;
    }
    
    /**
      * Komennettava-rajapinnasta kuormitettu hae-metodi, joka etsii alkion viitteitä listalta.
      * @param haettavan alkion merkkijonoesitys.
      * @return paluuarvo, jos alkio löytyi listalta. Muulloin null-alkio.
      */
    public Tieto hae(String n) {
        Object paluu = lista.hae(n);
        if(paluu != null) {
            Tieto paluuarvo = (Tieto)paluu;
            return paluuarvo;
        }
        else {
            return null;
        }
    }
    
    /**
      * Komennettavasta kuormitettu lisäysmetodi, joka lisää tiedon listalle
      * nousevaan aakkosjärjestykseen.
      * @param Lisättävän tiedon Tieto-tyyppinen viite.
      * @return true, kun lisäys onnistuu. Muulloin false.
      */
    public boolean lisaa(Tieto l) {
        if(l != null) {
            StringBuilder sb = new StringBuilder(500);
            String s;
            sb = l.nimi();
            s = sb.toString();
            Object olio = lista.hae(s);
            if(olio == null) {
                boolean onnistuuko = lista.lisaa(l);
                return onnistuuko;
            }
            else
                return false;
        }
        else
            return false;
    }
    
    /**
      * Komennettavasta kuormitettu poista-metodi, joka yrittää poistaa alkion listalta.
      * @param poistettavan alkion merkkijonoesitys.
      * @return palauttaa poistettavan alkion viitteen.
      */
    public Tieto poista(String n) {
        Object p = lista.poista(n);
        Tieto poistettava = (Tieto)p;
        return poistettava;
    }
    
    /**
     * Operaatio, joka tulostaa hakemiston hakemistopolun
     */
    public void sijainti() {
        if(ylihakemisto != null) {
            ylihakemisto.sijainti();
            System.out.print(nimi() + "/");
        }
        else {
            System.out.print(nimi() + "/");
        }
    }
    
    //Object-luokan metodien korvaukset
    /**
      * Object-luokasta korvattu toString()-metodi
      */
    public String toString() {
        return(super.toString() + "/ " + lista.koko());
    }
}