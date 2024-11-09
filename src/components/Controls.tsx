import React from "react";
import { useAtom } from "jotai";
import { modelPositionAtom, modelRotationAtom } from "../atoms/stateAtoms";

const Controls: React.FC = () => {
  const [position, setPosition] = useAtom(modelPositionAtom);
  const [rotation, setRotation] = useAtom(modelRotationAtom);

  const handleInputChange = (axis: "x" | "y" | "z", value: string) => {
    const numericValue = parseFloat(value) || 0;
    setPosition({ ...position, [axis]: numericValue });
  };

  const handleRotationChange = (
    axis: "roll" | "pitch" | "yaw",
    value: number,
  ) => {
    setRotation((prev) => ({ ...prev, [axis]: value }));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md w-52 absolute top-4 right-4 z-10">
      <h2 className="text-lg font-semibold mb-2">Model Position</h2>
      {["x", "y", "z"].map((axis) => (
        <div key={axis} className="mb-2">
          <label className="block text-gray-700">{axis}:</label>
          <input
            type="number"
            step="0.25"
            value={position[axis as "x" | "y" | "z"]}
            onChange={(e) =>
              handleInputChange(axis as "x" | "y" | "z", e.target.value)
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      ))}

      <h2 className="text-lg font-semibold mb-2 mt-4">
        Model Rotation (Degrees)
      </h2>
      {["roll", "pitch", "yaw"].map((axis) => (
        <div key={axis} className="mb-2">
          <label className="block text-gray-700">
            {axis.charAt(0).toUpperCase() + axis.slice(1)}:
          </label>
          <input
            type="number"
            step="1"
            value={rotation[axis as "roll" | "pitch" | "yaw"]}
            onChange={(e) =>
              handleRotationChange(
                axis as "roll" | "pitch" | "yaw",
                parseFloat(e.target.value),
              )
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
      ))}
    </div>
  );
};

export default Controls;
