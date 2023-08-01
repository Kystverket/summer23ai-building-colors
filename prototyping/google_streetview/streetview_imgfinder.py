# For Python Versions 3+
# Tested V3.10 on 12/15/2021
import os
import urllib.parse
import urllib.request
import API

myloc = r"prototyping\google_streetview\streetview_images" 

key = "&key=" + API.get_key() #you need an actual key now!!

def GetStreet(Addr,SaveLoc):
  try:
    base = "https://maps.googleapis.com/maps/api/streetview?size=1200x800&location="
    MyUrl = base + urllib.parse.quote_plus(Addr) + key #added url encoding
    fi = Addr + ".jpg"
    urllib.request.urlretrieve(MyUrl, os.path.join(SaveLoc,fi))
    print(f"Image '{fi}' saved to {SaveLoc}")
  except Exception as error:
    print("An error occured:", error)

test = ["Stadsnesvegen 41, 6030, Langevåg", "Einavegen 4, 6037, Eidsnes"]
for addr in test:
  GetStreet(addr, myloc)
