# Konami Code Script

This is a simple script that adds the Konami Code functionality to your website. The script is written in Typescript and transpiled to JavaScript.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/konami-code.git`
2. Navigate to the project directory: `cd konami-code`
3. Install the dependencies: `npm install`

## Usage

1. Import the script into your HTML file:
    ```html
    <script src="path/to/konami-code.js"></script>
    ```

2. Initialize the script by creating a new instance of the `KonamiCode` class:
    ```javascript
    new KonamiCode(callback, config);
    ```

3. That's it! The Konami Code functionality is now added to your website. When users input the Konami Code (up, up, down, down, left, right, left, right, B, A), a special action will be triggered.

## Customization

You can customize the action that is triggered when the Konami Code is entered. Simply modify the `KonamiCode.action()` function in the `konami-code.js` file.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
