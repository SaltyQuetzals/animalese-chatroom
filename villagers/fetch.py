import json
import urllib.request
f = open("images.txt", "r")

villagers = []

for x in f:
    url_name = x.split("/")[7].split("_poster")[0].replace("NH-", "")
    name = url_name.replace("_", " ")
    file = url_name.replace(".", "")
    print(name, file)
    urllib.request.urlretrieve(x, file+".png")
    villagers.append({
        "name": name,
        "file": file
    })

with open("villagers.json", "w") as out:
    json.dump(villagers, out)
