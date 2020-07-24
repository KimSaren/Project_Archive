//Pakataan oope2017-pakkaukseen
package oope2017ht;

//Tuodaan tarvittavat paketit 
import oope2017ht.tiedot.*;
import oope2017ht.omalista.OmaLista;
import fi.uta.csjola.oope.lista.*;
import apulaiset.*;

/**
  * Tulkki-luokka, joka tulkitsee käyttöliittymän komentoja.
  * <p>
  * Harjoitustyö, Olio-ohjelmoinnin perusteet, kevät 2017.
  * <p>
  * @author Kim Sarén (saren.kim.A@student.uta.fi)
  */

public class Tulkki {
    //Attribuutit
    /** Juurihakemiston attribuutti */
    private Hakemisto juuri;
    /** Viite nykyiseen hakemistoon */
    private Hakemisto nykyinen;
    
    //Tehdään oletusrakentaja, joka luo Hakemistolle juuren
    //Sekä asettaa nykyiseen hakemistoon juuri-viitteen
    public Tulkki() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        juuri = new Hakemisto(sb,null);
        nykyinen = juuri;
    }
    
    /** Tehdään tulkintaoperaatio, joka saa String-tyyppisen komentonsa käyttöliittymältä
      * @param käyttöliittymän komento String-muotoisena.
      * @return false, jos valinta on exit. Muulloin true.
      */
    public boolean tulkitse(String s) {
        try {
            Object viite; 
            Tieto viiteT;
            //Lopetuskäsky?
            if(s.equals("exit"))
                return false;
            else {
                //Tehdään syötteestä jako osiin
                String[] osat = s.split("[ ]");
                //Tarkistetaan, onko samanniminen tieto jo olemassa
                if(osat.length > 1)
                    viite = nykyinen.hae(osat[1]);
                else
                    viite = null;
                //Tyhjennetään StringBuilder
                StringBuilder sb = new StringBuilder();
                //Uusi hakemisto
                if((osat[0].equals("md")) && (viite == null) && (osat.length == 2)) {
                    sb.append(osat[1]);
                    Hakemisto uusiH = new Hakemisto(sb,nykyinen);
                    nykyinen.lisaa(uusiH);
                }
                //Uusi tiedosto
                else if((osat[0].equals("mf")) && (viite == null) && (osat.length == 3)) {
                    uusiTiedosto(osat);
                }
                //Vaihda nykyistä hakemistoa
                else if((osat[0].equals("cd")) && ((osat.length == 2) || osat.length == 1)) {
                    vaihda(osat, viite);
                }
                //Listataan hakemiston tiedot
                else if(osat[0].equals("ls")) {
                    listausTarkistus(osat);
                }
                //Vaihdetaan nykyisen tiedon nimi
                else if((osat[0].equals("mv")) && (osat.length == 3) && (viite != null)) {
                    vaihdaNimi(osat, viite);
                }
                //Kopiointi tiedostolle
                else if(osat[0].equals("cp") && (osat.length == 3)) {
                    if((viite != null) && (viite instanceof Tiedosto) && (nykyinen.hae(osat[2]) == null))
                        kopioi(osat, viite);
                    else
                        throw new Exception();
                }
                //Poistetaan tiedosto
                else if((osat[0].equals("rm")) && (osat.length == 2) && (viite != null))
                    viiteT = nykyinen.poista(osat[1]);
                //Rekursiivinen listaus
                else if((osat[0].equals("find") && (osat.length == 1))) {
                    puunTulostus(nykyinen);
                }
                else
                    throw new Exception();
                return true;
            }
        }
        catch(Exception e){
            System.out.println("Error!");
            return true;
        }
    }
    
    
    /**
      * Operaatio, joka tulostaa nykyisen hakemistopolun
      */   
    public void hakemistoPolku() {
        nykyinen.sijainti();
    }
    
    /*
     * Erillisiä, pitkähköjä operaatioita tulkintaketjun selkeyttämiseksi
     */
    
    
    /**
      * Operaatio, joka luo uuden tiedoston
      * @param parametrina merkkijonoista koostuva taulukko
      * @throws Exception virheilmoitus, kun tiedoston nimessä tai koossa on kiellettyjä ilmauksia
      */
    public void uusiTiedosto(String[] osat) throws Exception {
        try {
            StringBuilder sb = new StringBuilder();
            sb.append(osat[1]);
            int koko = Integer.parseInt(osat[2]);
            Tiedosto uusiT = new Tiedosto(sb,koko);
            nykyinen.lisaa(uusiT);
        }
        catch(Exception e) {
            throw new Exception();
        }
    }
    
    
    /** Listan tulostusoperaatio
      * @param lista, jossa on nykyisen hakemiston sisältö
      */
    public void tulosta(OmaLista lista) throws Exception {
        if(lista.koko() != 0) {
            for(int i = 0; i < lista.koko(); i++) {
                System.out.println(lista.alkio(i));
            }
        }
    }
    
    /** Metodi kansion vaihtamiseen
      * @param sanojen taulukko, jonka tietoja käytetään if-else-logiikan muodostamiseen.
      * @param viite käsiteltävään alkioon, joka esiintyi taulukon indeksissä [1]
      * @throws Exception mikäli ajonaikana tapahtuu parametrin käsittelyyn liittyvä virhe
      */
    public void vaihda(String[] osat, Object viite) throws Exception {
        if((viite != null) && (viite instanceof Hakemisto))
            nykyinen = (Hakemisto)viite;
        else if(osat.length == 1) {
            Hakemisto uusiH = juuri;
            if(uusiH != null)
                nykyinen = uusiH;
            else
                throw new Exception();
        }
        else if(osat[1].equals("..")) {
            Hakemisto uusiH = nykyinen.haeYH();
            if(uusiH != null)
                nykyinen = uusiH;
            else
                throw new Exception();
        }
        else
            throw new Exception();
    }
    
    /** Metodi tiedoston nimen vaihtamiseen
      */
    public void vaihdaNimi(String[] osat, Object viite) throws Exception {
        Object viiteUusi = nykyinen.hae(osat[2]);
            if(viiteUusi == null) {
                StringBuilder sb = new StringBuilder();
                sb.append(osat[2]);
                Tieto viiteT = (Tieto)viite;
                viiteT.nimi(sb);
                //Poistetaan viite, jonka jälkeen lisätään se uudestaan, jotta järjestys säilyisi
                viiteT = nykyinen.poista(osat[2]);
                //Sitten lisätään takaisin, jonka jälkeen lisäysoperaatio hoitaa järjestyksen
                nykyinen.lisaa(viiteT);
            }
            else
                throw new Exception();
    }
    
    /** Listauksen logiikka
      * @param saa parametrinaan taulukon merkkijonoista
      * @throws Exception virheilmoitus, jos joko taulukossa tai sen sisällössä on ongelmia
      */
    public void listausTarkistus(String[] osat) throws Exception {
        //Haetaan nykyhakemiston lista-alkio
        if(osat.length == 1) {
            OmaLista lista = nykyinen.sisalto();
            tulosta(lista);
        }
        //Parametrilla annettu tiedosto
        else if(osat.length == 2) {
            listaa(osat[1]);
        }
        else
            throw new Exception();
    }
    
    /** Listauksen metodi
      * @param merkkijonomuotoinen esitys, jota haetaan hakemiston listalta
      * @throws Exception mikäli viite on null-tyyppistä
      */
    public void listaa(String s) throws Exception {
        Object viite = nykyinen.hae(s);
        if(viite instanceof Tiedosto) {
            Tiedosto viiteTiedosto = (Tiedosto)viite;
            System.out.println(viiteTiedosto);
        }
        else if(viite instanceof Hakemisto) {
            Hakemisto viiteH = (Hakemisto)viite;
            System.out.println(viiteH);
        }
        else
            throw new Exception();
    }
    
    /** Tiedoston kopioimisen metodi
      * @param merkkijonoesitykset taulukossa
      * @param toisena esiintyvän merkkijonon viite taulukossa
      * @throws Exception, mikäli viitteet ovat virheelliset ja metodien suoritus epäonnistuu
      */
    public void kopioi(String[] osat, Object viite) throws Exception {
        Object viiteUusi = nykyinen.hae(osat[2]);
        if(viiteUusi == null) {
            //Tehdään oliosta Tiedosto-muotoinen viite
            Tiedosto viiteTiedosto = (Tiedosto)viite;
            //Syväkopioidaan kutsumalla Tiedosto-luokan kopiorakentajaa
            Tiedosto uusiT = new Tiedosto(viiteTiedosto);
            vaihdaNimi(osat, viite);
            nykyinen.lisaa(uusiT);
        }
        else
            throw new Exception();
    }
    
    /**
      * Rekursiivisen tulostuksen listausoperaatio
      * @param Hakemistoparametri, jonka avulla määritellään halutun hakemiston rekursiivinen listaus
      * @throws Exception virhe, kun annettu hakemistoa ei ole olemassa tai ilmaantuu muita ongelmia
      */
    public void puunTulostus(Hakemisto hakemisto) throws Exception {
        try {
            // Asetetaan apuviite hakemiston tiedot säilövään listaan.
            OmaLista lista = hakemisto.sisalto();
            Object viite;
            int i = 0;
            int j;
            // Käydään hakemiston sisältö läpi yksi tieto kerrallaan.
            while(i < lista.koko()) {
                // Tulostetaan tiedon merkkijonoesitys.
                viite = lista.alkio(i);
                //Tulostetaan hakemiston sijainti
                hakemisto.sijainti();
                System.out.println(viite);
                // Tulostetaan alihakemiston sisältö.
                if (viite instanceof Hakemisto) {
                    Hakemisto viiteH = (Hakemisto)viite;
                    puunTulostus(viiteH);
                    lista = hakemisto.sisalto();
                }
                
                i++;
            }
        }
        catch(Exception e) {
            throw new Exception();
        }
    } 
}