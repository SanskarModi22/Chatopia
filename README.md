# Chatopia

This is a real-time chat application built using Socket.io, Node.js, Express, and TypeScript. It allows users to join chat rooms, send messages, and see messages from other connected users in real-time.
## Images
<img width="960" alt="Socket1" src="https://github.com/SanskarModi22/Chatopia/assets/80542560/f63379c6-72ae-484a-9e78-eaf435b303d4">
<img width="960" alt="Socket2" src="https://github.com/SanskarModi22/Chatopia/assets/80542560/d678580b-a0d8-4d09-ab76-7260b3e178da">
<img width="960" alt="Socket3" src="https://github.com/SanskarModi22/Chatopia/assets/80542560/35d557c9-876c-4300-bd2f-8afd7192986e">

## Features

- Real-time messaging: Messages are instantly sent and received without the need for page refresh.
- Multiple chat rooms: Users can join different chat rooms to have separate conversations.
- User typing indicator: Shows when a user is typing a message.
- User join/leave notifications: Notifies users when someone joins or leaves the chat room.

## Technologies Used

- [Socket.io](https://socket.io/): Enables real-time bidirectional event-based communication between the server and clients.
- [Node.js](https://nodejs.org/): A JavaScript runtime environment that allows running JavaScript code on the server.
- [Express](https://expressjs.com/): A web application framework for Node.js that simplifies building web applications and APIs.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript for better development experience and code maintainability.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/SanskarModi22/Chatopia.git
   ```

2. Navigate to the project directory:

   ```shell
   cd chat-application
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Build the TypeScript code:

   ```shell
   npm run build
   ```

5. Start the server:

   ```shell
   npm start
   ```

6. Access the chat application in your web browser at `http://localhost:3000`.

## Configuration

- The default port for the server is `3000`. You can change it by modifying the `PORT` variable in the `.env` file.

## Usage

1. Open the chat application in your web browser.
2. Enter your desired username and choose a chat room.
3. Start sending messages in the chat room.
4. You can see other users' messages in real-time and receive notifications when someone joins or leaves the chat room.

## Code Overview

The main functionalities of the chat application are implemented as follows:

- **Server**:
  - The server code is written in Node.js using Express and TypeScript.
  - The server handles incoming client connections and manages the chat rooms and messages.
  - The server uses Socket.io to enable real-time communication between the clients and the server.
  - The server listens for events such as "send chat message," "start," "set nick," "typing," and "not typing" to handle different user actions and emit corresponding events to all connected clients.

- **Client**:
  - The client-side code is responsible for rendering the chat interface and interacting with the server.
  - The client-side code connects to the server using Socket.io and listens for events such as "chat message," "users list," "typing signal," and "info" to update the chat interface in real-time.
  - The client-side code sends events such as "send chat message," "start," "set nick," "typing," and "not typing" to the server based on user actions.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to submit a pull request or open an issue in the repository.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to customize and expand upon this README file to provide more specific instructions or additional information about your chat application based on your specific implementation.
