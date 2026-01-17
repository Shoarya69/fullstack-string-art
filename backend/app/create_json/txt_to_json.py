import json
import requests
import uuid
# txt_file = "/home/shoarya/Desktop/art2/src/components/user_reportNone (1).txt"
# json_file = "/home/shoarya/Desktop/art2/src/components/connections.json"

# Read txt file
def create_json(txt_file,json_file):
    json_file = f"{json_file}/{uuid.uuid4()}.json"
    if txt_file.startswith("http"):
        resp = requests.get(txt_file)
        resp.raise_for_status()
        data = resp.text
    else:
        with open(txt_file, "r") as f:
            data = f.read()

    # Convert to numbers
    numbers = [int(x.strip()) for x in data.split(",") if x.strip()]

    # Convert to pairs [[0,124],[2,123],...]
    pairs = [[numbers[i], numbers[i + 1]] for i in range(0, len(numbers)-1)]

    # Save as JSON
    with open(json_file, "w") as f:
        json.dump(pairs, f)
    return json_file
    
