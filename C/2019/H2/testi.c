// An example program to demonstrate working 
// of enum in C 
#include<stdio.h> 
 #include <ctype.h>
  
int main() 
{ 
	char *merkki1 = "helmikuu";
	char *merkki2 = "helmi kuu";
	int i;
	
	printf("merkki1 %c\n", *merkki1);
	printf("merkki2 %c\n", *merkki2);
	printf("merkki1 == merkki2: %d\n", (*merkki1 == *merkki2));
	for(i = 0; i < 8; i++)
	{
		printf("%c\n", merkki1[i]);
	}
}  