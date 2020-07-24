public class HTNode
{
	/* MUUTTUJAT */
    private int key, row, doc;
	private String element;
	private HTNode next, prev;


	/* RAKENTAJA */
    public HTNode(int k, String s, int d, int r)
    {
        key = k;
		element = s;
        row = r;
        doc = d;
    }


	/* AKSESSORIT */
    public int getKey() {
		return key;
	}
	public String getElement() {
		return element;
	}
    public int getRow() {
		return row;
	}
    public int getDoc() {
		return doc;
	}
	public void setKey(int k) {
		key = k;
	}
	public void setElement(String e) {
		element = e;
	}
    public void setRow(int r) {
		row = r;
	}
    public void setDoc(int d) {
		doc = d;
	}
}