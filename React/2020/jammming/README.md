# Jammming

![Jamming](https://imgur.com/fltCBZA.png)

## Basic 101

This is a React-based application that interacts with the [Spotify web API](https://developer.spotify.com/documentation/web-api/). The main function of this application is to let the user search for songs and artists in the Spotify database and add them to a custom playlist. The user can also save this playlist to their personal Spotify user.

## How does it work

The application consists of a few key elements:

* The search bar, which allows the user to search through the Spotify database
* Results bar that shows the matches for current search
* Custom playlist containing the songs the user has added through the results

A song can be added to the playlist by clicking the "**+**" icon next to the song on the results and removed by clicking the "**-**" icon on the custom playlist. The playlist can be renamed using the name field above the list.

Since this application directly interacts with the users' Spotify profile, it needs proper [authentication](https://developer.spotify.com/documentation/general/guides/authorization-guide/) to function.

## Closing words

This application was done with guidance from [Codeacademy](https://www.codecademy.com/learn). The instruction were rather light at places, so I feel like this was good practice for me nevertheless. In particular this program really helped me see the value of using componential design and overall practice working with authorization-requiring APIs.
