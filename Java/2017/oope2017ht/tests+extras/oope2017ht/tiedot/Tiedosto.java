package oope2017ht.tiedot;
import apulaiset.*;
import fi.uta.csjola.oope.lista.*;
import oope2017ht.*;
import oope2017ht.omalista.OmaLista;

/**
  * Tiedosto-luokka, joka vastaa tiedoston toiminnallisuudesta.
  * <p>
  * Harjoitustyö, Olio-ohjelmoinnin perusteet, kevät 2017.
  * <p>
  * @author Kim Sarén (saren.kim.A@student.uta.fi)
  */


public class Tiedosto extends Tieto {
    //Attribuutit
    private int koko;
    
    //Rakentajat
    public Tiedosto(StringBuilder n, int k) throws IllegalArgumentException {
        super(n);
        try {
            if(k >= 0)
                koko(k);
            else
                throw new IllegalArgumentException();
        }
        catch(IllegalArgumentException e) {
            throw new IllegalArgumentException();
        }
    }
    
    /** 
      * Kopiorakentaja, jossa tiedoston nimi syväkopioidaan
      * @param Kopiotavan tiedoston Tiedosto-tyyppinen viite
      */
    public Tiedosto(Tiedosto t) {
        //Kutsutaan Tieto-luokan kopiorakentajaa
        super(t);
        
        //Kopioidaan koko pinnallisesti
        koko(t.koko());
    }
    
    //Aksessorit
    public void koko(int k) throws IllegalArgumentException {
        if(k < 0) {
            throw new IllegalArgumentException();
        }
        else
            koko = k;
    }
    
    public int koko() {
        return koko;
    }
    
    //Object-luokan metodien korvaukset
    /** 
      * Object-luokan toString()-metodin korvaus.
      */
    public String toString() {
        return(super.toString() + " " + koko);
    }
    
}