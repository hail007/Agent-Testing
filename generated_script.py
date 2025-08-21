**app.py** (Flask backend)
```python
from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Set up your OpenAI API key
openai.api_key = 'your_openai_api_key'

@app.route('/analyze_symptoms', methods=['POST'])
def analyze_symptoms():
    user_input = request.json.get('symptoms')
    
    prompt = f"""
    You are a safe, helpful health guidance assistant. 
    The user has provided the following symptoms in plain English: "{user_input}". 
    Your job: do NOT provide a diagnosis. 
    Instead, return structured guidance:
    1. Identify if there are risk flags (duration, severity, worsening symptoms). 
    2. Provide 2–4 safe next steps (e.g., contact primary care, consider common screening, monitor, or seek urgent care if worsening). 
    Always finish with: “⚠️ This tool does not provide medical diagnoses. For emergencies, call 911.”
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": prompt}],
    )
    
    output = response['choices'][0]['message']['content']
    
    return jsonify({'output': output})

if __name__ == '__main__':
    app.run(debug=True)
```

**index.html** (Frontend)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Symptom Checker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
        }
        #container {
            text-align: center;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        #output {
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #fafafa;
        }
        input[type="text"] {
            width: 300px;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        button {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div id="container">
        <h1>Symptom Checker</h1>
        <input type="text" id="symptomInput" placeholder="Describe your symptoms..." />
        <button onclick="submitSymptoms()">Submit</button>
        <div id="output"></div>
    </div>

    <script>
        async function submitSymptoms() {
            const symptoms = document.getElementById('symptomInput').value;
            const response = await fetch('/analyze_symptoms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ symptoms })
            });
            const data = await response.json();
            document.getElementById('output').innerText = data.output;
        }
    </script>
</body>
</html>
```

**requirements.txt**
```
Flask
openai
```