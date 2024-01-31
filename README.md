# plyGround

## TODO

- [x] Create small hover `navbar` for website navigation.
- [x] Create `searchbar` at the top of the page, which is fixed.
- [x] Write a function called `getAllGames()` which requests the results from the **RAWG API**.

- [x] Populate `Home` page with games, as the api only return *40 results* and also their *order/sequence* in the array is always fixed.
- [x] Randomize the `Home` page search result array.
- [x] Create `card` component for the search results.


- [x] Create `SinglePageGame` or **[slug]** page for any games that are clicked upon; this page displays all the details regarding that game.
- [x] Create a function called `getTrailer()` which fetches **trailer** from the API.

- [x] Implement **Search** feature in the `searchbar`.
- [x] Display search results.
- [x] Create `game-search-card` to display search results
- [x] Utilize **React Context Hook** for passing props to all the components that requires them.

- [x]  Create `Trending` page.
- [x] Write a function called `getTrendingGames(number)` which requests the results from the **RAWG API**. The results are sorted based on the date they were *added* to the database of the API.

- [x] Create `Recommended` page.
- [x] Write a function called `getTopRatedGames(number)` which requests the results from the **RAWG API**. The results are sorted based on the *ratings*.

- [ ] Implement **localStorage** to store data in the browser's localStorage; so the web-app doesn't throw error regarding game(s) data upon refresh (it throws *value is undefined*)

| Future tasks:

- [ ] Uncomment **User** link in the `searchbar` component
- [ ] Implement **user** `Login` and `Register`
- [ ] Add functionality that enables user to visit their profile, which provides options to change *username, profile picture, and password* .
- [ ] Implement **tracking** of video games
- [ ] Store all the **tracked** games of a user optimally on the *mongodb* 
