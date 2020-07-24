import oope2017ht.*;
import oope2017ht.tiedot.*;
import oope2017ht.omalista.OmaLista;
import fi.uta.csjola.oope.lista.*;
import apulaiset.*;

public class Testi {
	public static void main(String[] args) {
		//Muuttujat
		boolean onnistuuko;
		
		//Luodaan ensin uusi tiedosto
		StringBuilder nimi = new StringBuilder(20);
		nimi.append("file");
		Tiedosto file = new Tiedosto(nimi,500);
		System.out.println("Uusi tiedosto: ");
		System.out.println(file);
		
		//Sitten hakemisto
		nimi = new StringBuilder(20);
		nimi.append("");
		Hakemisto tyhja = null;
		Hakemisto dir = new Hakemisto(nimi,tyhja);
		System.out.println("Hakemisto: ");
		System.out.println(dir);
		
		//Toinen tiedosto
		nimi = new StringBuilder(20);
		nimi.append("tiedosto");
		Tiedosto filu = new Tiedosto(nimi,299);
		System.out.println("Uusi tiedosto: ");
		System.out.println(filu);
		
		//Toinen hakemisto
		nimi = new StringBuilder(20);
		nimi.append("alihakemisto");
		Hakemisto ali = new Hakemisto(nimi,dir);
		System.out.println("");
		System.out.println("Toinen hakemisto: ");
		System.out.println(ali);
		
		
		System.out.println("");
		
		
		//Kokeillaan toteutettuja operaatioita
		//Lisäys-operaatio
		onnistuuko = dir.lisaa(ali);
		System.out.println("Lisäys: " + onnistuuko);
		onnistuuko = dir.lisaa(file);
		System.out.println("Lisäys: " + onnistuuko);
		onnistuuko = dir.lisaa(filu);
		System.out.println("Lisäys: " + onnistuuko);
		System.out.println(dir);
		
		//Tulostetaan listan sisältö
		System.out.println("Tulostetaan listan sisalto: ");
		OmaLista lista = new OmaLista();
		lista = dir.sisalto();
		if(lista.koko() != 0) {
			for(int i = 0; i < lista.koko(); i++) {
				System.out.println(lista.alkio(i));
			}
		}
		else
			System.out.println("Lista on tyhja!");
		
		System.out.println("");
		
		//Hakuoperaatio
		Object viite = dir.hae("alihakemisto");
		System.out.println("Alihakemiston viite on: " + viite);
		
		System.out.println("");
		
		//Kokeillaan poistaa ensimmäinen alkio
		System.out.println("Poistetaan alihakemisto: ");
		Object poistettava = dir.poista("alihakemisto");
		
		//Tulostetaan uusi lista
		if(lista.koko() != 0) {
			for(int i = 0; i < lista.koko(); i++) {
				System.out.println(lista.alkio(i));
			}
		}
		else
			System.out.println("Lista on tyhja!");
		
		//Hakuoperaatio
		viite = dir.hae("tiedosto");
		System.out.println("Tiedoston viite on: " + viite);
		
		System.out.println("");
		
		//Kokeillaan poistaa ensimmäinen alkio
		System.out.println("Poistetaan tiedosto: ");
		poistettava = dir.poista("tiedosto");
		
		//Tulostetaan uusi lista
		if(lista.koko() != 0) {
			for(int i = 0; i < lista.koko(); i++) {
				System.out.println(lista.alkio(i));
			}
		}
		else
			System.out.println("Lista on tyhja!");
		
		poistettava = dir.poista("virhe");
		System.out.println("Kun yritetään poistaa olematon muuttuja: " + poistettava);
	}
}