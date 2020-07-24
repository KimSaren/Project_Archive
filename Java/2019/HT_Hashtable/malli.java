import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.Integer;

public class malli
{
private void readInput()
{
	String line;

	try
	{
		BufferedReader br = new BufferedReader( new FileReader("setA.txt"));
				
		while((line=br.readLine()) != null)
		{
		String[] values=line.split("\n");	  
		System.out.println(values[0]);
		}
	} 
		
	catch(IOException e)
	{
		System.out.println("File not found.");;
	}
}
private void writeOutput()
{
    int esim1=5;
    int	esim2=1;
    String outputrow = esim1+ " "+esim2;
    try {
		 BufferedWriter bw = new BufferedWriter(new FileWriter("outp.txt")); 		
         	 //bw.write(outputrow);
		 //bw.newLine();
		 bw.write(outputrow);
		 bw.close();
    } catch (IOException e) {
    System.err.format("IOException: %s%n", e);
}
  System.out.println("Writing file...");
}


public static void main(String[] args)
	{
	    malli ht=new malli();		      
		ht.readInput();
		ht.writeOutput();
	}

}