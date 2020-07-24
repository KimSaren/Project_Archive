import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.Integer;

public class Tira2019
{

/* Lasketaan ja palautetaan tiedostoissa olevien alkioiden lkm */
private int total_size(String a, String b)
{
    String line;
    int ts = 0;
    try
	{
		/* Ensimmäisen tiedoston lkm */
		BufferedReader br = new BufferedReader(new FileReader(a));
		while((line=br.readLine()) != null)
        {    
            ts++;
        }
        
		/* Toisen tiedoston lkm, voidaan käyttää alustettua lukijaa */
        br = new BufferedReader(new FileReader(b));
		while((line=br.readLine()) != null)
        {    
            ts++;
        }

		br.close();

        return ts;
	}
		
	catch(IOException e)
	{
		System.out.println("File not found.");;
	}

    return ts;
}


/* Metodi tiedoston lukemista varten */
private void readFile(String filename)
{
    try {
		String line;
		BufferedReader br = new BufferedReader(new FileReader(filename)); 		
  		while ((line = br.readLine()) != null)
		{
    		System.out.println(line);
		}
		br.close();
    } 
	
	catch (IOException e) 
	{
    	System.err.format("IOException: %s%n", e);
	}
}


/* Metodi syötteen lukua ja siirtoa hajautustauluun varten */
private void Hash(String filename, HashTable t)
{
	String line;
	int doc = 0, row = 1, key;

	try
	{
		BufferedReader br = new BufferedReader(new FileReader(filename));
				
		while((line=br.readLine()) != null)
		{
			String[] values=line.split("\n");
			if(values[0] != null)
			{
                key = Integer.parseInt(values[0]); // Alustava avain luetusta lukuarvosta

				/* Muutetaan avainta suhteessa koon moduloon, mikäli sellainen on jo taulussa */
                if(t.hasKey(key))
                {
                    while(t.hasKey(key))
                    {
                        key = key + t.getmaxSize();
                    }
                }

				if(filename == "setA.txt")
				{
					doc = 1;
				}
				else if(filename == "setB.txt")
				{
					doc = 2;
				}

				/* Lisäys hajautustauluun tässä */
				HTNode n = new HTNode(key, values[0], doc, row);
				t.insert(n);

				row++;
			}
		}
		br.close();
	} 
		
	catch(IOException e)
	{
		System.out.println("File not found.");
	}
}


/* or.txt:n kirjoitus hajautustaulusta t */
private void OR(HashTable t)
{
	try {
		BufferedWriter bw = new BufferedWriter(new FileWriter("or.txt"));

		int quantity, size = t.getmaxSize();
		String line, e1, e2;
		HTNode n;
		HTNode[] table = t.getTable();
		boolean flag = true;

		/* Mikäli käyttäjä haluaa poistaa taulukosta alkioita */
		t.askDelete();

		System.out.println("\nThe documents initially had " + t.getmaxSize() + " elements, of which " + t.getSize() + " remain in the HashTable.");
		System.out.println("Attempting to write the file 'or.txt'...");
		/* Käydään luupeittain jokainen alkio läpi */
		for(int i = 0; i < size; i++)
		{
			quantity = 0;
			n = table[i];
			if(n != null)
			{
				e1 = n.getElement();

				/* Esiintyykö alkio jo tiedostossa? */
				if(i != 0)
				{
					for(int j = i-1; j >= 0; j--)
					{
						n = table[j];
						if(n != null)
						{
							e2 = n.getElement();

							if(e1.compareTo(e2) == 0)
							{
								flag = false;
							}
						}
					}
				}

				/* Käydään läpi esiintymien lkm ja tehdään lisäys */
				if(flag == true)
				{
					if(i != size-1)
					{
						for(int j = i; j < size; j++)
						{
							n = table[j];
							if(n != null)
							{
								e2 = n.getElement();

								if(e1.compareTo(e2) == 0)
								{
									quantity++;
								}
							}
						}
					}
					else
					{
						quantity = 1;
					}
					line = e1 + " " + quantity;
					bw.write(line);
					bw.newLine();
				}
				flag = true;
			}
		}
		System.out.println("Successfully wrote a file by the name of 'or.txt'.");
		bw.close();
	}

	catch (IOException e) 
	{
    	System.err.format("IOException: %s%n", e);
	}
}


/* and.txt:n kirjoitus hajautustaulusta t */
private void AND(HashTable t)
{
	try {
		BufferedWriter bw = new BufferedWriter(new FileWriter("and.txt"));

		int size = t.getmaxSize(), d1, d2, r;
		String line, e1, e2;
		HTNode n;
		HTNode[] table = t.getTable();
		boolean flag = true;

		/* Mikäli käyttäjä haluaa poistaa taulukosta alkioita */
		t.askDelete();

		System.out.println("\nThe documents initially had " + t.getmaxSize() + " elements, of which " + t.getSize() + " remain in the HashTable.");
		System.out.println("Attempting to write the file 'and.txt'...");
		/* Käydään luupeittain jokainen alkio läpi */
		for(int i = 0; i < size-1; i++)
		{
			n = table[i];
			if(n != null)
			{
				e1 = table[i].getElement();
				d1 = table[i].getDoc();
				/* Onko taulukossa aiempia esiintymiä? */
				if(i != 0)
				{
					for(int j = i-1; j >= 0; j--)
					{
						n = table[j];
						
						if(n != null)
						{
							e2 = n.getElement();
							d2 = n.getDoc();

							if((e1.compareTo(e2) == 0))
							{
								flag = false;
							}
						}
					}
				}

				/* Mikäli aiempia esiintymiä ei ilmennyt, lisätään alkio tauluun mikäli sille löytyy vastinpari toisesta tiedostosta */
				if(flag == true)
				{
					for(int j = i+1; j < size; j++)
					{
						n = table[j];
						if(n != null)
						{
							e2 = n.getElement();
							d2 = n.getDoc();

							if((e1.compareTo(e2) == 0) && (d1 != d2))
							{
								r = t.lowestRow(e1);

								line = e1 + " " + r;
								bw.write(line);
								bw.newLine();
								break;
							}
						}
					}
				}
			}
			flag = true;
		}
		System.out.println("Successfully wrote a file by the name of 'and.txt'.");
		bw.close();
	}

	catch (IOException e) 
	{
    	System.err.format("IOException: %s%n", e);
	}
}


/* xor.txt:n kirjoitus hajautustaulusta t */
private void XOR(HashTable t)
{
	try {
		BufferedWriter bw = new BufferedWriter(new FileWriter("xor.txt"));

		int size = t.getmaxSize(), d1, d2;
		String line, e1, e2;
		HTNode n;
		HTNode[] table = t.getTable();
		boolean flag = true;

		/* Mikäli käyttäjä haluaa poistaa taulukosta alkioita */
		t.askDelete();

		System.out.println("\nThe documents initially had " + t.getmaxSize() + " elements, of which " + t.getSize() + " remain in the HashTable.");
		System.out.println("Attempting to write the file 'xor.txt'...");
		/* Käydään luupeittain jokainen alkio läpi */
		for(int i = 0; i < size; i++)
		{
			n = table[i];
			if(n != null)
			{
				e1 = table[i].getElement();
				d1 = table[i].getDoc();
				/* Onko taulukossa aiempia esiintymiä? */
				if(i != 0)
				{
					for(int j = i-1; j >= 0; j--)
					{
						n = table[j];
						
						if(n != null)
						{
							e2 = n.getElement();
							d2 = n.getDoc();

							if((e1.compareTo(e2) == 0))
							{
								flag = false;
							}
						}
					}
				}

				/* Mikäli aiempia esiintymiä ei ilmennyt, lisätään alkio tauluun mikäli sille ei löydy vastinparia toisesta tiedostosta */
				if(flag == true)
				{
					/* Ollaan viimeisessä alkiossa: lisätään alkio suoraan */
					if(i == size-1)
					{
						n = table[i];
							if(n != null)
							{
								line = e1 + " " + d1;
								bw.write(line);
								bw.newLine();
							}
					}

					/* Ei olla viimeisellä alkiossa: täytyy verrata seuraaviin */
					else
					{
						for(int j = i+1; j < size; j++)
						{
							n = table[j];
							if(n != null)
							{
								e2 = n.getElement();
								d2 = n.getDoc();

								if((e1.compareTo(e2) == 0) && (d1 != d2))
								{
									break;
								}
								else if(j == size-1)
								{
									line = e1 + " " + d1;
									bw.write(line);
									bw.newLine();
									break;
								}
							}
						}
					}
				}
			}
			flag = true;
		}
		System.out.println("Successfully wrote a file by the name of 'xor.txt'.");
		bw.close();
	}

	catch (IOException e) 
	{
    	System.err.format("IOException: %s%n", e);
	}
}


/* Main-metodi ohjelman suorittamiselle */
public static void main(String[] args)
{
	Tira2019 ht=new Tira2019();	
	int s = ht.total_size("setA.txt", "setB.txt");
	HashTable table = new HashTable(s);
	ht.Hash("setA.txt", table);
	ht.Hash("setB.txt", table);
	/* Taulukon tietojen tulostus
	table.print();
	*/

	/* Luodaan ja luetaan OR-tiedosto */
	System.out.println("\nor.txt:");
	ht.OR(table);
	/* Tiedoston luku ja tulostus
	ht.readFile("or.txt");
	*/

	/* Luodaan ja luetaan AND-tiedosto */
	System.out.println("\nand.txt:");
	ht.AND(table);
	/* Tiedoston luku ja tulostus
	ht.readFile("and.txt");
	*/
	System.out.println("");

	/* Luodaan ja luetaan XOR-tiedosto */
	System.out.println("\nxor.txt:");
	ht.XOR(table);
	/* Tiedoston luku ja tulostus
	ht.readFile("xor.txt");
	*/
}


}