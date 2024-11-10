# Seoul Robotics - Frontend Engineer Coding Assignment

## Overview
This project was created for the Frontend Engineer assignment at Seoul Robotics. The task was to set up a 3D scene in a React app and build an interface to interact with it.

## Demo
You can see a running version of the project [here](https://seoul-robotics-benjamin.netlify.app/).

## Features
### 3D Scene Setup
- **3D Scene**: Built using `Three.js`.
- **Camera Controls**: `OrbitControls` for panning and zooming with the mouse and keyboard.
- **Lighting**: Added directional and hemisphere lighting for a realistic effect.
- **Model**: Imported a 3D model with shadow support. The model used can be found [here](https://poly.pizza/m/dVLJ5CjB0h).
- **Grid**: A helper grid for better orientation in the scene.

### User Interface
- **Position Controls**: Input fields to adjust the `x`, `y`, and `z` coordinates of the model.
- **Rotation Controls**: Fields to modify the `roll`, `pitch`, and `yaw` of the model.
- **Real-Time Updates**: Instant feedback in the 3D scene when values are changed.

## Technologies Used
- **React**
- **TypeScript**
- **Three.js**
- **Jotai** for state management
- **Tailwind CSS** for styling

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/benvasseur/seoul-robotics-benjamin.git
   cd seoul-robotics-frontend-assignment
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm start
   ```

## How to Use
- **Interact with the Scene**: Use the `W`, `A`, `S`, `D` keys to pan the camera and the `Space` bar to reset it.
- **Adjust Position and Rotation**: Use the input controls to change the model’s position and rotation in real time.

