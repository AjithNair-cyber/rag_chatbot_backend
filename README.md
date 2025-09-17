# RAG Chatbot Backend - Express TypeScript

A robust backend service for a Retrieval-Augmented Generation (RAG) chatbot built with Express.js and TypeScript. This application leverages Google Gemini as the Large Language Model, Redis for caching and session management, Jina Embeddings for text vectorization, and Qdrant as the vector database for semantic search capabilities

## Architecture Overview

This backend implements a modern RAG architecture that combines retrieval-based methods with generative AI to provide accurate, context-aware responses

### Tech Stack

- **Framework**: Express.js with TypeScript
- **LLM**: Google Gemini for natural language generation
- **Vector Database**: Qdrant for storing and searching embeddings
- **Embeddings**: Jina Embeddings for text vectorization
- **Cache/Session**: Redis for in-memory data storage
- **CI/CD**: GitHub Actions workflow integration

## Project Structure

├── .github/workflows/
│ └── main_rag-chatbot-backend.yml # GitHub Actions CI/CD pipeline
├── node_modules/
├── src/
│ ├── config/
│ │ └── envConfigs.ts # Environment configuration
│ ├── controllers/ # Request handlers
│ ├── data/ # News Data (Temporary Database)
│ ├── functions/ # Business logic functions
│ ├── middlewares/ # Custom middleware
│ ├── routes/ # API route definitions
│ ├── service/ # External service integrations
│ ├── setup/ # Application setup and initialization
│ ├── types/
│ │ └── types.ts # TypeScript type definitions
│ ├── app.ts # Express app configuration
│ └── server.ts # Server entry point
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── package-lock.json # NPM lock file
├── package.json # Dependencies and scripts
├── README.md # Project documentation
└── tsconfig.json # TypeScript configuration

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Redis server
- Qdrant vector database
- Google Gemini API key
- Jina API key for embeddings

## Installation

1. Clone the repository:

git clone https://github.com/AjithNair-cyber/rag_chatbot_backend.git
cd rag-chatbot-backend

2. Install dependencies:

npm install

3. Set up environment variables by creating a `.env` file:

PORT=5000
NODE_ENV=development
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
Qdrant Configuration
QDRANT_URL=http://localhost:6333 OR Hosted QDRANT_KEY
QDRANT_API_KEY=your_qdrant_api_key
GEMINI_API_KEY=your_gemini_api_key
JINA_API_KEY=your_jina_api_key
JINA_MODEL=jina-embeddings-v2-base-en

## Development

### Running the Development Server

Start the server with hot reload:

npm run dev

text

The server will be available at `http://localhost:5000`.

### Building for Production

Compile TypeScript to JavaScript:

npm run build

### Running Production Build

Start the production server:

npm start

## API Endpoints

### Chat Endpoints

- `POST /vector/query` - Send a message to the RAG chatbot
- `GET /session/history` - Retrieve chat history
- `DELETE /session/clear` - Clear chat session

RAG Pipeline Flow

1.  Document Processing:
    An RSS news feed is scraped every 12 hours at midnight using a cron job scheduler. The raw news data retrieved from the feed is cleaned and chunked as needed before being converted into numerical embeddings using Jina Embeddings.

2.  Vector Storage:
    The generated embeddings of the news data chunks are stored in the Qdrant vector database. Qdrant performs fast similarity searches using cosine similarity on these stored vectors.

3.  Query Processing:
    When a user sends a query, it is converted into an embedding vector using the same embedding model. This query embedding is used to perform a similarity search against the Qdrant store to retrieve the most relevant document chunks.

4.  Context Generation:
    The retrieved document chunks act as contextual information for the Google Gemini LLM. To maintain conversational relevance, the last two messages from the user's session are also fetched and included as part of the context.

5.  Response Generation:
    Google Gemini processes the combined context (retrieved chunks plus recent messages) along with the user query to generate a structured, accurate, and contextually rich response.

6.  Session and Message Storage:
    Each user session is tracked and stored in Redis for quick access. All chat messages in the session are cached in Redis, enabling fast retrieval and seamless conversation flow for the user.

## Deployment

This application is configured for deployment with GitHub Actions CI/CD pipeline. The workflow file is located at `.github/workflows/main_rag-chatbot-backend.yml`.

### Environment Setup

Ensure the following environment variables are set in your deployment environment:

- All variables from the `.env` file
- Production database URLs
- API keys for external services

## Performance Considerations

- **Redis Caching**: Chat sessions and frequently accessed data are cached in Redis for improved response times
- **Vector Search Optimization**: Qdrant provides efficient similarity search with configurable indexing strategies

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using Express.js, TypeScript, Google Gemini, Qdrant, and Redis.
