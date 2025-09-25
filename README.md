Of course\! Based on the files you've provided for your backend, here is a comprehensive README file.

-----

# 🤖 Gemini AI Chatbot Backend

This is the backend server for the Gemini AI Chatbot application. It's built with **Spring Boot** and handles the core logic, including communicating with the Google Gemini API, managing conversations, and persisting chat history to a MySQL database.

## ✨ Features

  - **Gemini API Integration**: Securely communicates with the Google Gemini API to get intelligent responses.
  - **RESTful API**: Provides a clear and simple API for the frontend to consume.
  - **Chat History**: Automatically saves all conversations to a MySQL database.
  - **Robust Health Checks**: Includes a health check endpoint that also verifies the database connection.
  - **Scalable Architecture**: Built with a service-oriented architecture using controllers, services, and repositories.
  - **Easy Configuration**: Uses environment variables for sensitive information like API keys and database credentials.

## 🛠 Tech Stack

  - **Framework**: Spring Boot 3.5.6
  - **Language**: Java 17
  - **Database**: Spring Data JPA with Hibernate
  - **Database Driver**: MySQL Connector/J
  - **HTTP Client**: Spring WebFlux `WebClient`
  - **Build Tool**: Apache Maven

## 🔌 API Endpoints

All endpoints are prefixed with `/api/ai`.

### 1\. Ask a Question

  - **Endpoint**: `POST /question`
  - **Description**: Sends a user's question to the Gemini API and gets a response. Both the user's question and the AI's response are saved to the database.
  - **Request Body**:
    ```json
    {
      "question": "What is the capital of France?"
    }
    ```
  - **Success Response (200 OK)**:
    ```json
    {
      "id": 123,
      "message": "The capital of France is Paris.",
      "isUser": false,
      "timestamp": "2025-09-25T15:30:00.123Z"
    }
    ```

### 2\. Get Chat History

  - **Endpoint**: `GET /chat/history`
  - **Description**: Retrieves the entire chat history from the database.
  - **Success Response (200 OK)**:
    ```json
    [
      {
        "id": 1,
        "message": "Hello!",
        "isUser": true,
        "timestamp": "2025-09-25T15:29:00.123Z"
      },
      {
        "id": 2,
        "message": "Hi there! How can I help you today?",
        "isUser": false,
        "timestamp": "2025-09-25T15:29:01.456Z"
      }
    ]
    ```

### 3\. Health Check

  - **Endpoint**: `GET /health`
  - **Description**: Checks the status of the application and its database connection.
  - **Success Response (200 OK)**:
    ```json
    {
      "status": "UP",
      "database": "connected"
    }
    ```
  - **Error Response (503 Service Unavailable)**:
    ```json
    {
      "status": "DOWN",
      "database": "disconnected"
    }
    ```

## 🚀 Getting Started

### Prerequisites

  - Java 17 or higher
  - Apache Maven
  - A running MySQL database instance

### 1\. Database Setup

1.  Create a new database in MySQL:
    ```sql
    CREATE DATABASE chatstore;
    ```
2.  The application will automatically create the necessary `chat_message` table when it starts.

### 2\. Configuration

You need to set the following environment variables. You can do this in your operating system or by creating a `.env` file and using a tool to load it.

  - `GEMINI_API_URL`: The URL for the Google Gemini API.
  - `GEMINI_API_KEY`: Your API key for the Gemini API.
  - `DB_USERNAME`: Your MySQL database username.
  - `DB_PASSWORD`: Your MySQL database password.

These values are configured in the `src/main/resources/application.properties` file.

### 3\. Running the Application

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd Aidemo
    ```
2.  **Build the project using Maven**:
    ```bash
    ./mvnw clean install
    ```
3.  **Run the application**:
    ```bash
    java -jar target/Aidemo-0.0.1-SNAPSHOT.jar
    ```

The server will start on `http://localhost:8080`.

## 📁 Project Structure

```
src/main/java/org/example/aidemo/
├── config/
│   └── WebMvcConfig.java      # CORS configuration for the frontend
├── controller/
│   └── AiController.java      # Defines the RESTful API endpoints
├── model/
│   └── ChatMessage.java       # JPA entity for the chat_message table
├── repository/
│   └── ChatMessageRepository.java # Spring Data repository for database operations
└── service/
    └── ChatService.java       # Business logic for interacting with Gemini and the database
```
