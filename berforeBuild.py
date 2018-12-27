from json import load
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
    config = load(f)
    with open("./afterBuild.bat", "w") as b:  # generate the script
        # b.write("@echo off\n")
        b.write("call \"{}\"\n".format(
            config["zeronetPath"] + config["virtualEnvActivateScript"]))
        b.write("python \"{0}\core\zeronet.py\" siteSign {1}\n".format(
            config["zeronetPath"], config["siteAddr"]))
        # b.write("python \"{0}\core\zeronet.py\" siteSign --inner_path \"{2}\" {1} \n".format(
        #     config["zeronetPath"], config["siteAddr"], "data\\users\\content.json"))
        b.write("echo Build completed\n")
    # Delete other files/dirs except 'data' and 'data-default' etc.
    purge(config["zeronetPath"] + "data\\" +
          config["siteAddr"], "^(data|data-default)$")
