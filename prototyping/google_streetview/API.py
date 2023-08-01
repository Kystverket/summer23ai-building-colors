import json

def get_key():
    with open('config/config.js', 'r') as file:
        js_code = file.read()

    start_index = js_code.index('{')
    end_index = js_code.rindex('}') + 1
    json_data = js_code[start_index:end_index]
    api = json.loads(json_data)
    return api["API_KEY"]
