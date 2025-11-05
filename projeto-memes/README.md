# Meme do Dia

"Meme do Dia" is a fun and interactive mobile game where you guess the name of a new meme every day. Test your meme knowledge and see how quickly you can guess the daily meme!

## Features

- **Daily Meme Challenge:** A new meme is featured every day.
- **Guessing Game:** Type in your guess for the meme's name.
- **Progressive Hints:**
  - The meme image starts zoomed in and gets clearer with each attempt.
  - A text hint is revealed after 3 incorrect guesses.
  - The meme's sound is available after 5 incorrect guesses.
- **Ranking System:** Track your progress and see how many attempts it took you to guess each meme.
- **Haptic Feedback:** Feel the app's response with haptic feedback on your device.

## Technologies Used

- **React Native:** A framework for building native mobile apps using JavaScript and React.
- **Expo:** A platform for making universal React applications.
- **Firebase:** Used for the backend to store and retrieve the daily memes.
- **React Navigation:** For handling navigation between screens.
- **AsyncStorage:** For storing user progress locally on the device.

## How to Play

1.  **Open the app:** You'll be greeted with the "Meme do Dia" home screen.
2.  **Start the game:** Tap the "Jogar Agora" button to start the guessing game.
3.  **Guess the meme:** You'll see a zoomed-in image of the meme. Type your guess in the text box and press "Enviar resposta".
4.  **Use the hints:** If you're stuck, you'll get more hints as you make more attempts.
5.  **Check your rank:** Go to the "Ver Ranking" screen to see your progress and history.

## Project Structure

```
/
├── assets/
│   ├── meme_songs/       # Audio files for the memes
├── components/
│   └── MemeCard.js       # Component to display the meme
├── config/
│   └── firebaseConfig.js # Firebase configuration
├── data/
│   ├── localSounds.js    # Local sound data
│   └── memes.js          # Meme data
├── screens/
│   ├── HomeScreen.js     # The main screen of the app
│   ├── MemeScreen.js     # The screen where the game is played
│   ├── RankingScreen.js  # The screen to display user's progress
│   └── ResultScreen.js   # The screen to show the result of a guess
├── App.js                # The main component of the app
└── AppNavigator.js       # The app's navigation structure
```

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/projeto-memes.git
    ```
2.  **Install the dependencies:**
    ```bash
    cd projeto-memes
    npm install
    ```
3.  **Run the app:**
    ```bash
    npm start
    ```

---

> This project was created with the assistance of Gemini.