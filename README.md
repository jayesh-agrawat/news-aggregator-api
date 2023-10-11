# News Aggregator API

## Brief

**Objective:** Build a RESTful API that allows users to fetch news articles from multiple sources based on their preferences.

**Project Description:** In this project, we will create a RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to register, log in, and set their news preferences (e.g., categories). The API will then fetch news articles from [NewsAPI](https://newsapi.org/). The fetched articles should be processed and filtered asynchronously based on user preferences.


## Getting Started

To get started with this project, follow the steps below:

1. **Prerequisites**: Make sure you have Node.js and npm installed on your system.

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/jayesh-agrawat/news-aggregator-api.git
   cd news-aggregator-api
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Environment Variables**:
   Create a `.env` file in the project root and configure the following environment variables:

   - `PORT`: Port on which the server will run.
   - `JWT_SECRET`: Secret key for JWT token generation.
   -  `NEWS_API_URL`: URL for News API i.e. https://newsapi.org/v2/
   - `NEWS_API_KEY` : API Key to access News APIs

5. **Run the Application**:
   ```bash
   npm start
   ```

## API Endpoints

### User Registration

- **URL**: `/register`
- **Method**: `POST`
- **Request Body**: JSON
  ```json
  {
    "fullName":"Jayesh",
    "role":"user",
    "email":"test@gmail.com",
    "password":"1234"
  }
  ```
- **Response**: JSON
  ```json
  {
    "message": "User Saved Succesfully"
  }
  ```

### User Login

- **URL**: `/login`
- **Method**: `POST`
- **Request Body**: JSON
  ```json
  {
    "email": "example_user",
    "password": "your_password"
  }
  ```
- **Response**: JSON
  ```json
  {
    "email": "test@gmail.com",
    "password": "1234"
  }
  ```

### Retrieve User Preferences

- **URL**: `/preferences`
- **Method**: `GET`
- **Headers**: `Authorization: <jwt_token>`
- **Response**: JSON
  ```json
    ["technology", "sports"]
  ```

### Update User Preferences

- **URL**: `/preferences`
- **Method**: `PUT`
- **Headers**: `Authorization: <jwt_token>`
- **Request Body**: JSON
  ```json
  {
  ["technology", "business"]
  }
  ```
- **Response**: JSON
  ```json
  {
    "message": "Preferences updated successfully"
  }
  ```

### Fetch News

- **URL**: `/news`
- **Method**: `GET`
- **Headers**: `Authorization: <jwt_token>`
- **Response**: JSON array of news articles.


APIs using `POSTMAN`:

- Use this POSTMAN API [collection](./collections/News%20Aggregator%20API.postman_collection.json)

Feel free to modify this `README.md` to suit your project's specific requirements and structure. Good luck with your News Aggregator API project!