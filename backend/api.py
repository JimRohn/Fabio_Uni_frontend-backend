from flask import Flask, request, jsonify
import sqlite3
import openai
from flask_cors import CORS
import os
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for CORS

# Set your OpenAI API key from environment variables
openai.api_key = os.getenv('OPENAI_API_KEY')

# Path to the existing SQLite3 database file
DATABASE_PATH = './database/tami_me.db'

# Function to query the database
def query_database(query):
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        cursor.execute(query)
        columns = [description[0] for description in cursor.description]
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return results
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return [{"error": f"Database error: {e}"}]

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
        sql_query = response.choices[0].message['content'].strip()
        sql_query = re.sub(r'```sql\n|```', '', sql_query)  # Remove Markdown formatting
        return sql_query
    except Exception as e:
        print(f"Error fetching semantic search results: {e}")
        return f"Error in semantic search: {e}"

# Define the prompt
prompt = [
    "You are an AI trained to assist with database queries in a legal firm. You convert natural language queries into SQL commands. The database has the following columns in the 'Employees' table: ID, FirstName, LastName, Department, Expertise, Email, Location. Handle a variety of queries by generating appropriate SQL syntax to accurately retrieve data based on the conditions provided in natural language. Ensure your responses are precise and adhere to SQL standards.",
    "\nExamples:",
    "Query: Show me all employees",
    "SQL: SELECT * FROM Employees",
    "Query: Show me all the employees based in London",
    "SQL: SELECT * FROM Employees WHERE Location = 'London'",
    "Query: List all employees who are lawyers",
    "SQL: SELECT * FROM Employees WHERE Expertise LIKE '%lawyer%'",
    "Query: Find all employees in the Legal department",
    "SQL: SELECT * FROM Employees WHERE Department = 'Legal'",
    "Query: Get contact details for employees named 'John Smith'",
    "SQL: SELECT Email FROM Employees WHERE FirstName = 'John' AND LastName = 'Smith'",
    "Query: Show me all the employees specialised in criminal law and based in London",
    "SQL: SELECT * FROM Employees WHERE Expertise LIKE '%criminal law%' AND Location = 'London'",
    "Query: List employees in the HR department and based in Paris",
    "SQL: SELECT * FROM Employees WHERE Department = 'HR' AND Location = 'Paris'",
    "Query: Find all employees who are recruiters and located in Rome",
    "SQL: SELECT * FROM Employees WHERE Expertise LIKE '%recruiter%' AND Location = 'Rome'",
    "Query: Show all lawyers in the Legal department",
    "SQL: SELECT * FROM Employees WHERE Expertise LIKE '%lawyer%' AND Department = 'Legal'",
    "Query: List employees named Jane Doe who work in New York",
    "SQL: SELECT * FROM Employees WHERE FirstName = 'Jane' AND LastName = 'Doe' AND Location = 'New York'",
    "\nYour task is to translate similar natural language queries into SQL queries, considering variations and providing exact matches as demonstrated."
]

@app.route('/')
def home():
    return "Welcome to the Semantic Search API. Use /search endpoint to query."

@app.route('/initialize_db', methods=['POST'])
def initialize_db():
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        cursor.executescript('''
            DROP TABLE IF EXISTS Employees;
            CREATE TABLE IF NOT EXISTS Employees (
                ID INTEGER PRIMARY KEY,
                FirstName TEXT,
                LastName TEXT,
                Department TEXT,
                Expertise TEXT,
                Email TEXT,
                Location TEXT
            );

            INSERT INTO Employees (FirstName, LastName, Department, Expertise, Email, Location)
            VALUES
            ('John', 'Doe', 'Legal', 'Lawyer', 'john.doe@example.com', 'London'),
            ('Jane', 'Smith', 'HR', 'Recruiter', 'jane.smith@example.com', 'London');
        ''')
        conn.commit()
        conn.close()
        return jsonify({"message": "Database initialized and populated successfully"})
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return jsonify({"error": f"Database error: {e}"}), 500

@app.route('/search', methods=['GET'])
def search():
    try:
        search_term = request.args.get('query')
        print(f"Received search term: {search_term}")

        # Get semantic search results from OpenAI
        sql_query = get_semantic_search_results(search_term, prompt)
        print(f"Generated SQL Query: {sql_query}")

        if "Error" in sql_query:
            raise ValueError(sql_query)

        # Execute the SQL query
        database_results = query_database(sql_query)

        combined_results = {
            "semantic_results": sql_query,
            "database_results": database_results
        }

        return jsonify(combined_results)
    except Exception as e:
        print(f"Error in search endpoint: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
