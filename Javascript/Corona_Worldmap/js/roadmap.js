let roadmap = document.getElementById("todo");

//let first = document.getElementById("first").textContent;
//addListItem(first);

/**
 * @param {} text - the text content of the list item
 */
function addListItem(text) {
  // create a new li element
  let listItem = document.createElement("li");
  listItem.innerText = text;

  // append text to the element
  roadmap.append(listItem);
};

(() => {
  console.log("Hello from roadmap.js!");
})();
