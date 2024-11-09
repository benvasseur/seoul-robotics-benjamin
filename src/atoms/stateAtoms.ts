import { atom } from "jotai";

export const modelPositionAtom = atom({ x: 0, y: 0.25, z: 0 });
export const modelRotationAtom = atom({ roll: 0, pitch: 0, yaw: 0 });
