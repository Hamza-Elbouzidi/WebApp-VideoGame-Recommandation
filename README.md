# Steam Game Analysis and Recommendation System

## Overview
This project focuses on analyzing data related to Steam games, leveraging natural language processing (NLP) techniques and machine learning (ML) to extract meaningful insights. By merging multiple datasets, generating embeddings, and measuring similarity between game descriptions, the project aims to help users discover games similar to those they already enjoy. 

Furthermore, a web application built with **FastAPI** and **Next.js** provides an interactive interface for users to search for games and receive personalized recommendations.

## Project Structure

1. **Data Collection and Preparation**:
   - The project utilizes three datasets:
     - **steam.csv**: Contains information about various Steam games, including titles, developers, genres, and ownership statistics.
     - **steam_media_data.csv**: Includes media-related information for the games.
     - **steam_description_data.csv**: Provides detailed descriptions of each game.
   - These datasets are merged into a comprehensive DataFrame, consolidating all relevant information for analysis.

2. **Data Processing**:
   - A formatted summary for each game is created, including the game name, developer, genres, and a brief summary.
   - The minimum number of owners is extracted from the ownership data, and the DataFrame is sorted to focus on the most popular games.

3. **Embedding Generation**:
   - The **AnglE** library is used to generate embeddings for the game descriptions. These embeddings are dense vector representations that capture the semantic meaning of the text.
   - Pretrained models, such as `UAE-Large-V1`, are employed to ensure high-quality embeddings, leveraging knowledge from extensive datasets.

4. **Similarity Analysis**:
   - Cosine distances are calculated between the embeddings of different games to measure similarity.
   - Given a specific game (e.g., "Factorio"), the project identifies and displays the top 8 most similar games based on their descriptions, providing a user-friendly visual representation.

5. **Web Application**:
   - A web interface is created using **Next.js**, featuring a search input where users can enter a game title.
   - The application employs the **textdistance** library to tolerate user input errors and find the three closest matches to the search term.
   - Once a game is selected, the app utilizes the ML logic to provide 10 personalized game recommendations based on the embeddings and cosine distance analysis.

6. **API Integration**:
   - **FastAPI** serves as the backend, linking the ML model and the Next.js front-end application. It handles requests from the web app, processes them through the ML model, and returns the relevant game recommendations.
   - This architecture facilitates seamless communication between the ML server and the front-end, ensuring a smooth user experience.

7. **Data Storage**:
   - The processed DataFrame containing game details and embeddings is saved as a Parquet file ("game_database.parquet") for efficient storage and future access.

## Key Technologies Used
- Python
- Pandas
- NumPy
- Scikit-learn
- AnglE (for pretrained embeddings)
- textdistance (for string similarity)
- FastAPI (for API development)
- Next.js (for the web application)

## Conclusion
This project demonstrates how data analysis and machine learning can be applied to the gaming industry, providing insights that can enhance user experience and facilitate game discovery. The combination of textual data processing, embedding generation, and an interactive web interface allows for effective comparisons and recommendations based on user preferences.
