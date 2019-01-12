import json
import os
import re
import shutil


def purge(dir, pattern):
    for f in os.listdir(dir):
        if not re.search(pattern, f):
            s = os.path.join(dir, f)
            if os.path.isdir(s):
                shutil.rmtree(s)
            else:
                os.remove(s)


with open("./zite_config.json") as f:
    config = json.load(f)
    path = os.path.join(config["zeronetPath"], "data",
                        config["siteAddr"])
    print("Site: "+path)
    purge(path, "^(data|data-default)$")
