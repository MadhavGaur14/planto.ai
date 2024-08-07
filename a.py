import requests

api_key = 'AIzaSyAgJp_oQGKyo3BZ0ZVa-KYUyCW-qEQa-hQ'
endpoint = 'https://api.gemini.com/v1/completions'

def get_code_completion(prompt):
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json',
    }
    data = {
        'prompt': prompt,
        'max_tokens': 100,
        'temperature': 0.5,
    }
    response = requests.post(endpoint, headers=headers, json=data)
    return response.json().get('choices')[0].get('text').strip()

prompt = "def hello_world():\n"
print(get_code_completion(prompt))
