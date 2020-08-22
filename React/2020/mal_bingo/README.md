# MyAnimeList Bingo

![Filling mode](https://imgur.com/xGUwVXl.png)
![Play mode](https://imgur.com/NUmG96O.png)

## Basic 101

This is a React-based bingo application that utilizes the JIKAN web API.
The application has two major functions: first is filling the bingo sheet
with appropriate series using a list of options provided by JIKAN. The second is
to function as a bingo game. In this mode the player gets to cross the series
by clicking the table cells. Consistent horizontal, vertical and diagonal lines
count as bingos.

The application is something of a hobby of mine. I got the idea to do this by listening
to some anisong index streams in the spring of 2020. We would often tailor handmade
bingo sheets with friends while listening to songs and ticking of all the correctly anticipated
ones we would hear in the span of the evening.

## Modes

### Filling the bingo sheet

This is the initial mode of the application. The basic functionalities are as follows:
* Selecting active cells in the bingo table by clicking them once
* Adding series to active cells via searchbar: the search will prompt a datalist the user
can use to select an appropriate series.
* Replacing added series by overwriting them with new series. The free zone in the middle cannot
be replaced.
* Using the buttons provided under the bingo: play, randomize and clear.

The functionalities of the buttons are as follows:
* Play button traverses between the play mode and the bingo filling mode. Clicking this one
gives the user a prompt asking whether they are ready to start playing. Upon confirmation,
the state of the application changes to represent the play mode. The active states of cells will
be reset upon doing so, as the clicking functionality will change.
* The randomize button randomizes the selected series in the bingo. This means only the series
you have selected through the search bar! Hence it will **not** fill your list with random series,
if you have empty slots. The free space in the middle will never be randomized.
* The clear button simply clears all the selected series in the bingo. Use this if you want
a quick reset and to start over.

### Playing the bingo
While in the game state, the search bar is no longer visible and the buttons are changed.
In this mode, there is also a separate bingo line calculator in the bottom. The main functionalities are as follows:
* Marking a table cell as crossed by clicking them once. Undo by clicking another time.
* Aiming for consistent vertical, horizontal and diagonal lines, which will count as bingos.
These will be striked through in the bingo line list as appropriate.
* If the user wants to go back to filling the bingo sheet, they can use the "go back to sheet"
button in the bottom. This will prompt the user to confirm the mode change. Crosses will be
resetted upon doing so.

## Closing words
This application might see some changes in the future. Bugs will be fixed if found,
but I might be inclined to do some changes to both visual and technical functionalities
along the line if I feel like it. This application was made with [Javascript](https://www.javascript.com/) and in
particular using the [React](https://reactjs.org/) library. The styling was done using Cascading Stylesheets.