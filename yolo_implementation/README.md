# About

This part of the repo makes use of the models we have trained and aims to show some of the functionalities.
By utilizing YOLOv8 we can detect buildings in images and videos. We have used automatic scripts in order to collect images of houses. The primary use of the model is to decide the color of the house based on images from the four cardinal directions.
This is done by choosing the most centered house from all four directions and adding up the models probabilities for each color. The color with the highest certainty is chosen. This method can be improved, but we wanted to use a simple method, in order to reduce the complexity. 
We have done some tests on postal codes 6005 and 6006 in Ålesund. Note that the model is not very good at the moment, with an [mAP50](https://www.youtube.com/watch?v=oqXDdxF_Wuw&t=256s&ab_channel=Roboflow) of around 0.6. Also some of the buildings in this area are already in the training set, which should be avoided. The results we found are located at in `data/json`, with the postal code in the filename. 

## Setup

Assuming you have already cloned the repo and that you have python installed.
If you don't have python you must download it first.
[python download](https://www.python.org/downloads/)

Open a terminal and navigate to your cloned repository's location. Then run:

```bash
pip install -r requirements.txt
```


## Usage

 You should run through `demo.ipynb` to get a grasp on practical use of the YOLO models. `detection_local.ipynb` is the current main program. It walks you trough the process of creating a `.json` file with addresses and color predictions from a bunch of images. For large datasets it is recommended to use Google Colab to reduce the runtime. Our final models are  `v12_larger.pt` and `v12_smaller.pt`.

## Structure

This part of the repository is structured as python notebook files which use data from the data folder.

### Scripts

We used the html tool to download images from google maps. Then we used a version similar to `detection_local.ipynb` to detect and classify the buildings. For training the model see the latex guide.

- `detection_local.ipynb`: An example script showing the model working on a folder with images. We used a colab in order to speed it up.
- `load_json.ipynb`: Using the json files with the data we have collected automatically. This was from postcode 6005 (430) Aspøya and 6006 Hessa (1366). We don't have the images used to create the json files included in the repo, because there are so many of them.
- `standard_test.ipynb`: Testing the model on a standard dataset. Automatically. These images are not used for training. And the solutions are hard coded.
- `demo.ipynb`: Basic examples of how one can use Yolo and the model we have trained. Useful to run through it.
- `requirements.txt`: The requirements for the project. This is used to install the necessary packages. See [setup](#setup).

### data

- `buildings/`: Images of buildings. The four first are images from neighbourhoods around Ålesund.
  - `aspoey/`: Some images from Aspøya
  - `bjoekavaagdalen/`: Some images from Bjørkåsdalen
  - `borgundvegen1/`: Some images from Borgundvegen
  - `borgundvegen2/`: Some more images from Borgundvegen
  - `examples/`: Some images used in the notebooks
  - `four_directions_1:/` Some images from four different directions
  - `four_directions_2/`: Some more images from four different directions
  - `standardized_test/`: Some images forming a standardized test set TODO: Add Link
- `json/`: Json files with the data we have collected
  - `6005`: 430 addresses from four directions from 6005 (Aspøya)
  - `6006`: 1366 addresses from four directions from 6006 (Hessa)
- `models/`: Building color detection models
  - `building_detection.pt`: A model detecting only the building, where all classes are merged into one. This is to show the possibility of using another method for classification.
  - `v12_larger.pt`: One of the newest big models. From yolov8l.pt
  - `v12_smaller.pt`: One of the newest middle sized models. From yolov8m.pt
- `video/`: Example video
  - `demo_drone.mp4`: Only to show how the model also works on a drone video

