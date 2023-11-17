# Movie Explorer App

Explore the world of movies with the Movie Explorer App, a React Native project that draws inspiration from the sleek design of popular movie platforms like Fmovies. Dive into a visually appealing and user-friendly interface, combining the aesthetic charm of Fmovies with the rich movie data provided by iTunes.

## Features
Discover Movies: Explore a vast collection of movies with an intuitive and immersive user interface.
Search Functionality: Find your favorite movies effortlessly using the powerful search feature.
Detailed Information: Access comprehensive details about each movie, including synopsis, genre, and pricing.
Artwork Showcase: Enjoy high-quality movie artwork, creating a visually captivating experience.
Favorite Movies: Build a personalized list of your favorite movies to keep track of the ones you love.

## Features

- **Discover Movies:** Explore a vast collection of movies with an intuitive and immersive user interface.
- **Search Functionality:** Find your favorite movies effortlessly using the powerful search feature.
- **Detailed Information:** Access comprehensive details about each movie, including synopsis, genre, and pricing.
- **Artwork Showcase:** Enjoy high-quality movie artwork, creating a visually captivating experience.
- **Favorite Movies:** Build a personalized list of your favorite movies to keep track of the ones you love.

## Technology Stack

- **React Native:** Utilizing the power of React Native for cross-platform app development.
- **NativeWind:** Leveraging NativeWind for styling, providing a utility-first approach to design.
- **Redux Toolkit:** Managing state efficiently with Redux Toolkit for predictable state management.
- **Redux Persist:** Persisting and rehydrating the Redux store for improved data persistence.
- **Shopify Flashlist:** Incorporating the Shopify Flashlist library for enhanced list functionalities.
- **Axios:** Making HTTP requests with Axios for efficient data fetching.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (Recommended version: v18.x.x)
- [npm](https://www.npmjs.com/) (Comes with Node.js, recommended version 9.x.x)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) (Command-line interface for React Native recommended version 0.72.x)
- Xcode 14.x.x


### Installing Dependencies

```bash
# Install project dependencies
npm install
or
# Install project dependencies using yarn
yarn install
```
### Run the Project
```
# Run the project locally
npm start or yarn start -> then select a platform to run
# Running directly by platform
npx react-native run-android or npx react-native run-ios
```

# Creating a Standalone APK for testing

```
cd android && ./gradlew assembleRelease
go to the build directory android/app/build/outputs/apk/release/**
use the -release.apk to install in android devices.
```

# Generate Debug IPA
```
if you already run npx react-native run-ios, it will already create a debug ipa if not run it again to generate debug ipa

This will build the IPA file located at: ios/build/Build/Products/Debug-iphonesimulator/YourAppName.app.
```

## Generate Release IPA
```
#To generate a release IPA for iOS, follow these steps:
1. Open the Xcode project located in `ios/YourAppName.xcworkspace`.
2. Select your target and set the build configuration to Release.
3. Archive the project.
4. Distribute the archive and export it as an IPA file.
```