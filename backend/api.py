from flask import Flask, request, jsonify
import sqlite3
import openai
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for CORS

# Set your OpenAI API key from environment variables
openai.api_key = os.getenv('OPENAI_API_KEY')

# Function to query the database
def query_database(query):
    try:
        conn = sqlite3.connect('database/tami_me.db')
        cursor = conn.cursor()
        cursor.execute(query)
        results = cursor.fetchall()
        conn.close()
        return results
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        raise

# Function to get semantic search results from OpenAI
def get_semantic_search_results(search_term, prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": prompt[0]},
                {"role": "user", "content": search_term}
            ]
        )
        return response.choices[0].message['content'].strip()
    except Exception as e:
        print(f"Error fetching semantic search results: {e}")
        raise

# Define the prompt
prompt = [
    "You are an expert in finding information in a legal firm's employee database. "
    "The database has the following columns: ID, FirstName, LastName, Department, Expertise, Email. \n\n"
    "For example, \nExample 1 - Find employees related to 'law', the SQL command will be: SELECT * FROM Employees WHERE Expertise LIKE '%law%' \n"
    "Example 2 - Find employees in the 'Legal' department, the SQL command will be: SELECT * FROM Employees WHERE Department = 'Legal' \n"
    "Now, you can ask me any question related to the Employees table and I will convert it into SQL query for you."
]

@app.route('/')
def home():
    return "Welcome to the Semantic Search API. Use /search endpoint to query."

@app.route('/search', methods=['GET'])
def search():
    try:
        search_term = request.args.get('query')
        print(f"Received search term: {search_term}")

        # Get semantic search results from OpenAI
        semantic_results = get_semantic_search_results(search_term, prompt)

        # Combine semantic results with database query results
        combined_results = {
            "semantic_results": semantic_results,
            "database_results": []  # Placeholder for database results
        }

        return jsonify(combined_results)
    except Exception as e:
        print(f"Error in search endpoint: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
