"""
This generator uses the list hosted at https://unpkg.com/unicode-emoji-json@0.6.0/data-by-group.json.
The purpose of this generator is to remove data that is unnecessary for Meower clients to use in their emoji pickers.


The list that this generator uses has the following license:

The MIT License (MIT)

Copyright (c) 2019 Mu-An Chiou

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

import requests, json

DATA_BY_GROUP_URL = "https://unpkg.com/unicode-emoji-json@0.6.0/data-by-group.json"

resp = requests.get(DATA_BY_GROUP_URL)
if not resp.ok:
    print(f"Response code ({resp.status_code}) was not OK: {resp.text}")
    exit(1)

resp_json = resp.json()

# Combine 'smileys_emotion' and 'people_body' into one 'people_emotion' category
resp_json[0].update({
    "name": "People & Emotion",
    "slug": "people_emotion",
    "emojis": resp_json[0]["emojis"] + resp_json[1]["emojis"]
})
del resp_json[1]

for category in resp_json:
    # Add icon emoji to category
    # These are taken from meo, sorry mr. roarer
    category["icon_emoji"] = {
        "people_emotion": "😀",
        "animals_nature": "😺",
        "food_drink": "🍎",
        "travel_places": "🏠",
        "activities": "⚽",
        "objects": "📃",
        "symbols": "❤️",
        "flags": "🏳️‍🌈"
    }.get(category["slug"])

    for emoji in category["emojis"]:
        # Replace name with slug
        emoji["name"] = emoji.pop("slug")
        
        # Delete versioning
        del emoji["unicode_version"]
        del emoji["emoji_version"]

f = open("unicode.json", "w")
json.dump(resp_json, f, separators=(',', ':'))
f.close()
