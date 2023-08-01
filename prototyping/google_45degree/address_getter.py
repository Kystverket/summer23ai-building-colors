import requests
import csv
import json

filepath = "prototyping\google_45degree"

def get_all_addresses():
    base_url = "https://ws.geonorge.no/adresser/v1/sok"

    # Postal codes to filter on
    postnummer_list = ["6008"]

    all_addresses = []

    for postnummer in postnummer_list:
        # Parameters for the API request
        params = {
            "postnummer": postnummer,
            "treffPerSide": 1000,  # Set a higher number to get all results in one request
            "side": 0,  # Start from the first page
        }

        while True:
            # Send the API request
            response = requests.get(base_url, params=params)

            # Check if the request was successful
            if response.status_code == 200:
                data = response.json()

                # Extract the list of addresses
                addresses = data["adresser"]

                # Add the addresses to the overall list
                all_addresses.extend(addresses)

                # Check if there are more pages of results
                if not addresses:
                    break

                # Move to the next page
                params["side"] += 1
            else:
                print(f"Error: {response.status_code} - {response.text}")
                break

    return all_addresses

def sort_key(address):
    return address["adressetekst"]

def save_to_csv(addresses, filename):
    # Sort addresses alphabetically by "adressetekst"
    sorted_addresses = sorted(addresses, key=sort_key)

    # Specify the CSV file path
    csv_file = rf"{filepath}\{filename}.csv"

    # Write the addresses to the CSV file
    with open(csv_file, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["Adresse", "Postnummer", "Poststed","Lat","Lon"])

        for address in sorted_addresses:
            writer.writerow([
                address["adressetekst"],
                address["postnummer"],
                address["poststed"],
                address["representasjonspunkt"]["lat"],
                address["representasjonspunkt"]["lon"]
            ])

    print(f"Addresses saved to {csv_file}")
    
def save_to_json(addresses, filename):
    # Sort addresses alphabetically by "adressetekst"
    sorted_addresses = sorted(addresses, key=sort_key)

    # Specify the JSON file path
    json_file = rf"{filepath}\{filename}.json"

    # Extract the required variables from each address
    simplified_addresses = []
    for address in sorted_addresses:
        simplified_address = {
            "Adresse": address["adressetekst"],
            "Postnummer": address["postnummer"],
            "Poststed": address["poststed"],
            "Lat": address["representasjonspunkt"]["lat"],
            "Lon": address["representasjonspunkt"]["lon"]
        }
        simplified_addresses.append(simplified_address)

    # Write the addresses to the JSON file
    with open(json_file, "w", encoding="utf-8") as file:
        json.dump(simplified_addresses, file, ensure_ascii=False)

    print(f"Addresses saved to {json_file}")

# Retrieve all addresses in Ålesund with the specified postal codes
all_addresses = get_all_addresses()

# Save addresses to a CSV file
save_to_csv(all_addresses, "addresses_filtered")
save_to_json(all_addresses, "addresses_filtered")
