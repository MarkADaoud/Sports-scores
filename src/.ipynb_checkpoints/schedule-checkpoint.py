import json
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_week_data(week_number):
  print(f"Fetching data for week {week_number}")
  try:
    with open("weeks_data.json", "r") as file:
      data = json.load(file)

      print(f"Loaded data: {data}")

    week_key = f"week{week_number}"
    if week_key not in data:
      return {"error": f"Week {week_number} data not found."}
    
    format_data = [
      {"Game": game[0], "Spread": game[1], "Total": game[2]}
      for game in data[week_key]
    ]
    print(f"Formatted data for week {week_number}: {format_data}") 
    return {"games": format_data}
  
  except FileNotFoundError:
    print("weeks_data.json file not found.")
    return {"error": "The weeks_data.json file is missing. "}
  except Exception as e:
    print(f"Error: {e}")
    return {"error": f"An error occurred: {e}"}
  
@app.route("/get_games", methods=["GET"])
def get_games():
  print("Received GET request for /get_games")
  week_number = request.args.get('week', type=int)
  print(f"Week number received: {week_number}")
  if not week_number:
    print("Week number missing from request")
    return jsonify({"error": "Week number is required. "}), 400
  
  data = get_week_data(week_number)
  print(f"Data fetched for week {week_number}: {data}")
  return jsonify(data)

if __name__ == "__main__":
  app.run(debug=True)
