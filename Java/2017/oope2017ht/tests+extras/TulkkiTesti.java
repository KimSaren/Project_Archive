import oope2017ht.*;
import oope2017ht.tiedot.*;
import oope2017ht.omalista.OmaLista;
import fi.uta.csjola.oope.lista.*;
import apulaiset.*;

public class TulkkiTesti {
    public static void main(String[] args) {
        //Muuttuja
        boolean totuus;
        //Luodaan uusi Tulkki-olio
        Tulkki tulkki = new Tulkki();
        
        //Kokeillaan exit-komentoa
        System.out.println("Toimiiko exit? Paluuarvon pitäisi olla false.");
        totuus = tulkki.tulkitse("exit");
        System.out.println(totuus);
        
        System.out.println("");
        
        //Luodaan uusi hakemisto tulkin kautta
        System.out.println("Onnistuuko hakemiston luonti?");
        totuus = tulkki.tulkitse("md hakemisto");
        System.out.println(totuus);
		
		totuus = tulkki.tulkitse("ls");
        
        System.out.println("");
        
        //Vaihdetaan tiedostoa
        System.out.println("Vaihdetaan hakemisto uuteen: ");
        totuus = tulkki.tulkitse("cd hakemisto");
        System.out.println(totuus);
        
        System.out.println("");
        
        //Sitten tiedosto
        System.out.println("Entäpä tiedoston luonti?");
        totuus = tulkki.tulkitse("mf atiedosto 500");
        System.out.println("totuus");
        
        System.out.println("");
        
        //Kokeillaan nopeasti tulostaa esitys näytölle
        System.out.println("Mitä on lisätty?");
        totuus = tulkki.tulkitse("ls");
        System.out.println(totuus);
        
        System.out.println("");
        
        //Mennään edelliseen hakemistoon
        System.out.println("Palataan alkuperäiseen hakemistoon ja tulostetaan se: ");
        totuus = tulkki.tulkitse("cd ..");
        totuus = tulkki.tulkitse("ls");
        
        System.out.println("");
        
        //Koitetaan palata null-hakemistoon
        System.out.println("Voidaanko liikkua juuresta ylihakemistoon?");
        totuus = tulkki.tulkitse("cd ..");
        
        System.out.println("");
        
        //Koitetaan kopioida ensin atiedosto
        totuus = tulkki.tulkitse("cd hakemisto");
        System.out.println("Onnistuuko kopiointi?");
        totuus = tulkki.tulkitse("cp atiedosto btiedosto");
        System.out.println(totuus);
        totuus = tulkki.tulkitse("ls");
        
        System.out.println("");
        
        //Koitetaan vaihtaa atiedoston nimi
        System.out.println("Voimmeko vaihtaa atiedoston nimen tiedostoksi?");
        totuus = tulkki.tulkitse("mv atiedosto tiedosto");
        System.out.println(totuus);
        totuus = tulkki.tulkitse("ls");
        
        System.out.println("");
        
        //Poistetaan tiedosto
        System.out.println("Voimmeko poistaa tiedoston?");
        totuus = tulkki.tulkitse("rm tiedosto");
        System.out.println(totuus);
        totuus = tulkki.tulkitse("ls");
        
        System.out.println("");
        
        //Onnistuuko nykyisen hakemistopolun listaus?
        //Luodaan uusi hakemisto tulkin kautta
        System.out.println("Onnistuuko hakemiston luonti?");
        totuus = tulkki.tulkitse("md hakemisto2");
        totuus = tulkki.tulkitse("cd hakemisto2");
        System.out.println("Koitetaan tulostaa hakemistopolku: ");
        tulkki.hakemistoPolku();
        
        System.out.println("");
        
        //Kokeillaan rekursiivista listausta juuresta lähtien
        totuus = tulkki.tulkitse("cd ..");
        totuus = tulkki.tulkitse("cd ..");
        totuus = tulkki.tulkitse("mf testi 100");
        System.out.println("Sisältö: ");
        totuus = tulkki.tulkitse("ls");
        System.out.println("");
        System.out.println("Rekursiivinen listaus: ");
        totuus = tulkki.tulkitse("find");
        System.out.println(totuus);
    }
}