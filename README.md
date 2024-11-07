
# CatalogCart

CatalogCart is a React Native mobile application built using Expo. The app serves as a catalog and shopping cart application with offline support, location services.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Building the Application](#building-the-application)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (LTS version recommended, e.g., Node 16.x)
- npm or yarn
- Expo CLI
- Watchman (for macOS users)

### Install Expo CLI

```bash
npm install -g expo-cli
```

### Install Watchman (macOS Only)

```bash
brew install watchman
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sudipta065/CatalogCart.git
   cd catalogcart
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

## Running the Application

1. **Start the development server:**

   ```bash
   npx expo start 
   ```
   or
    ```bash
   expo start 
   ```

2. **Run on your device or simulator:**

   - Scan the QR code with **Expo Go** on your mobile device.
   - Press `a` to open the app in an Android emulator.
   - Press `i` to open the app in an iOS simulator (macOS only).

3. **Clear the cache** (if needed):

   ```bash
   npx expo start -c
   ```
   or
    ```bash
   expo start -c
   ```

## Building the Application

Use **EAS Build** to create production-ready APKs or IPAs.

### Prerequisites for EAS Build

Ensure you have the **EAS CLI** installed:

```bash
npm install -g eas-cli
```

### Configure EAS for Your Project

Run the following command to configure EAS:

```bash
eas build:configure
```

### Build for Android

```bash
eas build --platform android
```

### Build for iOS

```bash
eas build --platform ios
```

After the build is complete, download the built APK/IPA and install it on your device.

## Project Structure

```
catalogcart/
├── assets/             # Image and other asset files
├── src/                # Main application source code
│   ├── components/     # Reusable components
│   ├── screens/        # Screen components
│   ├── store/          # Redux store and slices
│   ├── hooks/          # Custom hooks
│   └── utils/          # Utility functions
├── App.js              # Main entry point
├── app.json            # Configuration file
└── package.json        # Project metadata and dependencies
```

## Dependencies

- **React Native**: Core framework
- **Expo**: Managed workflow support
- **Redux Toolkit**: State management
- **RTK Query**: Data fetching and caching
- **expo-location**: Location services
- **expo-asset**: Asset management

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
