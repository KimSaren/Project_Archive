package oope2017ht.tiedot;
import apulaiset.*;
import fi.uta.csjola.oope.lista.*;
import oope2017ht.*;
import oope2017ht.omalista.OmaLista;


/**
  * Tieto-luokka, joka hallinnoi tiedostojen ja hakemistojen nimeämistä.
  * <p>
  * Harjoitustyö, Olio-ohjelmoinnin perusteet, kevät 2017.
  * <p>
  * @author Kim Sarén (saren.kim.A@student.uta.fi)
  */


public abstract class Tieto implements Comparable<Tieto> {
    //Attribuutit
    private StringBuilder nimi = new StringBuilder(200);
    
    //Rakentaja
    public Tieto(StringBuilder n) throws IllegalArgumentException {
        if(n instanceof StringBuilder) {
            boolean onnistuuko = tarkista(n);
            if(onnistuuko)
                nimi(n);
            else
                throw new IllegalArgumentException();
        }
        else
            throw new IllegalArgumentException();
    }
    
    /** 
      * Nimen kopiorakentaja.
      * @param Tieto-tyyppinen viite kopioitavaan tietoon.
      */
    public Tieto(Tieto t) {
        //Syväkopioidaan nimi
        nimi = kopioi(t.nimi());
    }
    
    
    //Aksessorit
    public void nimi(StringBuilder n) {
        try{
            nimi = n;
        }
        catch(IllegalArgumentException e) {
            System.out.println("Error!");
        }
    }
    
    public StringBuilder nimi() {
        return nimi;
    }
    
    /**
      * Metodi uuden nimi-olion luomiseen.
      * @param nimen StringBuilder-tyyppinen esitys.
      * @return uusi StringBuilder-tyyppinen nimiolio.
      */
    public StringBuilder kopioi(StringBuilder s) {
        //Tehdään nimestä ensin String-tyyppinen esitys
        String str = s.toString();
        
        //Luodaan uusi StringBuilder
        StringBuilder kopio = new StringBuilder();
        
        //Kopioidaan merkkijonoesitys uuteen StringBuilderiin
        kopio.append(str);
        
        //Palautetaan kopio
        return kopio;
    }
    
    /**
      * Metodi nimen oikeellisuuden tarkistukseen
      * @param StringBuilder-tyyppinen nimiesitys.
      * @return true, kun nimi on oikeellinen. Muulloin false.
      */
    public boolean tarkista(StringBuilder n) {
        String s = n.toString();
        int j = 0;
        for(int i = 0; i < s.length(); i++) {
            char merkki = s.charAt(i);
            if(merkki == '.')
                j = j + 1;
            if((j >= 2) || ((s.length() == 1) && (j==1)))
                return false;
            //Jos yksikin merkki poikkeaa halutusta, paluuarvo on false
            if((!Character.isLetter(merkki)) && (!Character.isDigit(merkki))) {
                if((merkki != '.') && (merkki != '_'))
                    return false;
            }
            else if(i == s.length())
                return true;
        }
        return true;
    }
    
    //Object-luokan metodien korvaukset
    /**
      * Object-luokasta korvattu toString()-metodi.
      */
    public String toString() {
        return(nimi().toString());
    }
    
    /**
      * Object-luokasta korvattu compareto(<T>)-metodi.
      * @param Tieto-tyyppinen viite vertailtavaan alkioon.
      * @return palauttaa vertailussa merkistön pituuden eron.
      */
    public int compareTo(Tieto t) {
        //Muunnetaan oliot merkkijonomuotoon
        String s = t.nimi().toString();
        String n = nimi.toString();
        int vertaa = n.compareTo(s);
        //Palautetaan vertailu
        return vertaa;
    }
    
    /**
      * Object-luokan equals()-metodin korvaus.
      * @param viite vertailtavaan objektiin.
      * @return true, jos merkkijonoesitys on sama. False muulloin.
      */
    public boolean equals(Object o) {
            //Muunnetaan StringBuilder-tyyppinen attribuutti String-tyyppiseksi
            if((o != null) && (o instanceof Tieto)) {
                Tieto t = (Tieto)o;
                StringBuilder sb = new StringBuilder();
                sb = t.nimi();
                String s = sb.toString();
                String n = nimi.toString();
                
                //oliot ovat samat, jos niillä on täsmälleen sama merkkijonoesitys
                //Saman pituiset?
                if(n.length() == s.length()) {
                    //Merkkijonoesitys sama?
                    if(n.equals(s)) {
                        return true;
                    }
                    //Jos yksikin eri merkki, paluuarvo on false
                    else {
                        return false;
                    }
                }
                //Eri pituiset -> paluuarvo false
                else
                    return false;
            }
            else if((o != null) && (o instanceof String)) {
                String s = (String)o;
                String n = nimi.toString();
                
                //oliot ovat samat, jos niillä on täsmälleen sama merkkijonoesitys
                //Saman pituiset?
                if(n.length() == s.length()) {
                    //Merkkijonoesitys sama?
                    if(n.equals(s)) {
                        return true;
                    }
                    //Jos yksikin eri merkki, paluuarvo on false
                    else {
                        return false;
                    }
                }
                //Eri pituiset -> paluuarvo false
                else
                    return false;
            }
            else if((o != null) && (o instanceof StringBuilder)) {
                StringBuilder sb = new StringBuilder(200);
                sb = (StringBuilder)o;
                String s = sb.toString();
                String n = nimi.toString();
                
                //oliot ovat samat, jos niillä on täsmälleen sama merkkijonoesitys
                //Saman pituiset?
                if(n.length() == s.length()) {
                    //Merkkijonoesitys sama?
                    if(n.equals(s)) {
                        return true;
                    }
                    //Jos yksikin eri merkki, paluuarvo on false
                    else {
                        return false;
                    }
                }
                //Eri pituiset -> paluuarvo false
                else
                    return false;
            }
            else
                return false;
    }
    
}