import java.util.Scanner;

public class HashTable
{
    /* RAKENTAJA JA MUUTTUJAT */
    /* Tarvittavat muuttujat */
    private int size = 0, maxSize;
    private HTNode[] table;

    /* Rakentaja hajautustaululle */
    public HashTable(int s)
    {
        maxSize = s;
        table = new HTNode[s];
    }


    /* TEHTÄVÄKOHTAISET METODIT */
    /* Käytetään moduloa koon suhteen hajautusfunktiona, kun avain m on annettu kokonaislukumuodossa */
    public int HashFunction(int m)
    {
        return (m % (maxSize));
    }


    /* Metodi, joka tarkistaa löytyykö haettu avain jo taulukosta. Paluuarvo true, jos vastinkappale löytyi. */
    public boolean hasKey(int k)
    {
        for(int i = 0; i < maxSize; i++)
        {
            if(table[i] != null)
            {
                if(table[i].getKey() == k)
                {
                    return true;
                }
            }
        }
        return false;
    }

    /* Lisäyfunktio, joka käyttää lineaarista hajautusta törmäysten käsittelyyn */
    public void insert(HTNode n)
    {
        if(size < maxSize)
        {
            int pos = HashFunction(n.getKey());

            if(table[pos] == null)
            {
                table[pos] = n;
                size++;
                // n = table[pos];
                // System.out.println("Lisäyspaikka " + pos + " alkio: " + n.getElement());
            }

            else
            {
                boolean flag = true;
                while(flag)
                {
                    if(table[pos] != null)
                    {
                        pos = HashFunction(pos+1);
                    }

                    else
                    {
                        table[pos] = n;
                        size++;
                        flag = false;
                        // n = table[pos];
                        // System.out.println("Lisäyspaikka + " + pos + " alkio: " + n.getElement());
                    }
                }
            }
        }
    }


    /* Poistetaan ja palautetaan alkio taulukosta */
    public HTNode delete(int i)
    {
        if((0 <= i) && (i < maxSize))
        {
            HTNode tmp = table[i];
            if(tmp != null)
            {
                table[i] = null;
                size--;
            }
            return tmp;
        }
        return null;
    }


    /* Metodi, joka kysyy käyttäjältä tiedoston poistoa */
    public void askDelete()
    {
        String input = "asd";
        HTNode check = null;

        Scanner myObj = new Scanner(System.in);
		while(input.compareTo("N") != 0)
		{
            System.out.println("There are currently " + getSize() + " objects in the HashTable.");
			System.out.println("Delete an object from the Hashtable? Y/N");
			input = myObj.nextLine();
			if(input.compareTo("Y") == 0)
			{
				System.out.println("Give the integer index key for a deletable object. Hash operation will be performed on the key.");
				input = myObj.nextLine();
				int i = Integer.parseInt(input.trim());
                check = delete(i);
			}

            if(check != null)
            {
                System.out.println("Succesfully deleted an element with the key " + check.getKey() + " from the table.");
            }
		}
    }


    /* Pienin rivinumero ensimmäisessä tiedostossa haetulle alkiolle s */
    public int lowestRow(String s)
    {
        int lowest = -1, row;
        for(int i = 0; i < maxSize; i++)
        {
            if(table[i] != null)
            {
                row = table[i].getRow();

                /* Arvoa ei vielä asetettu */
                if((lowest == -1) && ((table[i].getElement().compareTo(s) == 0)) && (table[i].getDoc() == 1))
                {
                    lowest = row;
                }

                else if((table[i].getElement().compareTo(s) == 0) && (table[i].getDoc() == 1))
                {
                    if(row < lowest)
                    {
                        lowest = row;
                    }
                }
            }
        }
        return lowest;
    }
    

    /* AKSESSORIT */
    public HTNode[] getTable()
    {
        return table;
    }
    public int getSize()
    {
        return size;
    }
    public int getmaxSize()
    {
        return maxSize;
    }


    /* Tulostuskomento lähinnä testailua varten, alustusarvoina kaikissa paikoissa pitäisi olla null */
    public void print()
    {
        String line;
        int key, doc, row;

        System.out.println("\nHashtable:");
        System.out.print("Elements: ");
        for(int i = 0; i < maxSize; i++)
        {
            if(table[i] != null)
            {
                line = table[i].getElement();
                System.out.print(line + " ");
            }
            else
            {
                System.out.print("NULL ");
            }
        }
        System.out.println("");

        System.out.print("Document #s: ");
        for(int i = 0; i < maxSize; i++)
        {
            if(table[i] != null)
            {
                doc = table[i].getDoc();
                System.out.print(doc + " ");
            }
            else
            {
                System.out.print("NULL ");
            }
        }
        System.out.println("");

        System.out.print("Row numbers: ");
        for(int i = 0; i < maxSize; i++)
        {
            if(table[i] != null)
            {
                row = table[i].getRow();
                System.out.print(row + " ");
            }
            else
            {
                System.out.print("NULL ");
            }
        }
        System.out.println("");

        System.out.print("Keys: ");
        for(int i = 0; i < maxSize; i++)
        {
            if(table[i] != null)
            {
                key = table[i].getKey();
                System.out.print(key + " ");
            }
            else
            {
                System.out.print("NULL ");
            }
        }
        System.out.println("\n");
    }

}