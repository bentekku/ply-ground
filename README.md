# plyGround

## Overview

Welcome to the **plyGround** a video game catalog website, a showcase of gaming titles with a unique user interface. This project is developed using Next.js 14.1.0, TypeScript, Tailwind CSS, Axios, React-Icons, and React-hot-toast. The website features a distinctive navbar at the bottom, a search bar at the top, and showcases a variety of games on the home page. The home page displays 40 games retrieved from the API using the GET method, with the option to randomize their sequence.

## Features

- **Navbar**: A unique navigation bar at the bottom of the website for easy access to different pages.
- **Search Bar**: Located at the top of the website for quick game searches.
- **Home Page**: Displays 40 games in a card format with details like title, release date, and overall rating. Games can be randomized.
- **Trending Page (/trending)**: Shows trending games from the current date to a specified prior date using the `getTrendingGames()` function.
- **Recommended Page (/recommended)**: Suggests games based on user ratings with the option to provide a rating as an argument.
- **LocalStorage**: Stores the data of the currently open game in the *localStorage* to facilitate reaccess in case the user reloads the page.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bentekku/ply-ground.git
   cd ply-ground
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000` to view the application.

## Future Changes

- **Backend Integration**: Future plans include adding a backend to allow users to track games they have played, are playing, shelved, or want to play.
- **Authorization**: Implementation of user authentication with either Clerk Auth or Next Auth for secure access to personalized features.

## Dependencies

- **Next.js 14.1.0**
- **TypeScript**
- **Tailwind CSS**
- **Axios**
- **React-Icons**
- **React-hot-toast**

## Contributing

Feel free to contribute to the project. Create a pull request with your proposed changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

Special thanks to the developers of Next.js, TypeScript, Tailwind CSS, Axios, React-Icons, and React-hot-toast for their amazing tools and libraries.

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

- [x] Implement **localStorage** to store data in the browser's localStorage; so the web-app doesn't throw error regarding game(s) data upon refresh (it throws *value is undefined*)

| Future tasks:

- [ ] Implement FramerMotion for subtle animations
- [ ] Uncomment **User** link in the `searchbar` component
- [ ] Implement **user** `Login` and `Register`
- [ ] Add functionality that enables user to visit their profile, which provides options to change *username, profile picture, and password* .
- [ ] Implement **tracking** of video games
- [ ] Store all the **tracked** games of a user optimally on the *mongodb* 
