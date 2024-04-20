# Google Meet Camera Tracker Extension

This Chrome extension is designed to enhance the functionality of Google Meet by tracking participants who activate their cameras during a meeting. _The unique aspect of this extension is its method of element selection on the webpage_. Instead of using traditional methods like class names or IDs, this extension employs a sophisticated algorithm that analyzes text and groups elements by their depth levels in the DOM. By using graph algorithms, it identifies a common parent for these groups and tracks each individual camera status from this reference point.

## Features

- **Camera Activation Tracking:** Automatically detects and logs all participants who turn on their cameras during a Google Meet session.
- **Advanced Element Selection:** Uses text-based, depth-level grouping and graph algorithms to identify elements, ensuring reliability and adaptability to changes in Google Meet's UI.
- **Data Reporting:** Sends real-time tracking information to a specified server for monitoring or analytical purposes.

## Usage

Once installed and configured, the extension will automatically start tracking camera statuses when you join a Google Meet call. Data will be sent to the configured server in real-time without any further interaction required.

![Screenshot 1](https://raw.githubusercontent.com/guinnod/meet-tracker/main/Screenshot_meet_tracker.png)
