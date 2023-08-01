import requests

# input your location here
lat, lon = 62.471669679469365,6.15082915125114

### staticmap API har ikke mulighet for rotasjon, i tillegg er bildene gamle ###
# Define the map configurations
map_configurations = [
    {
        'name': f"{lat}-{lon}",
        'center': f'{lat},{lon}',
        'zoom': 19,
        'maptype': 'satellite',
    },
]

# Define the API key
import API
api_key = API.get_key()

# Define the folder name to save images within your project
folder_name = r"prototyping\google_staticmap\satellite_images"

# Function to obtain and save the map image
def save_map_image(configuration):
    name = configuration['name']
    center = configuration['center']
    zoom = configuration['zoom']
    maptype = configuration['maptype']
    image_url = f"https://maps.googleapis.com/maps/api/staticmap?center={center}&zoom={zoom}&size=400x400&maptype={maptype}&key={api_key}"
    response = requests.get(image_url)
    image_path = f"{folder_name}/{name}.png"
    with open(image_path, 'wb') as image_file:
        image_file.write(response.content)
    print(f"Saved {name} image as {image_path}")

# Save the map images
for configuration in map_configurations:
    save_map_image(configuration)
print("All map images have been saved.")
