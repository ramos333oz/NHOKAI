import assert from "node:assert/strict";
import {
  advancePingPongVideoTime,
  advanceReverseFrameIndex,
} from "./pingPongVideo";

assert.deepEqual(
  advancePingPongVideoTime({
    currentTime: 4.8,
    duration: 5,
    deltaSeconds: 0.4,
    direction: "forward",
  }),
  {
    currentTime: 5,
    direction: "reverse",
  },
);

assert.deepEqual(
  advancePingPongVideoTime({
    currentTime: 0.2,
    duration: 5,
    deltaSeconds: 0.4,
    direction: "reverse",
  }),
  {
    currentTime: 0,
    direction: "forward",
  },
);

assert.deepEqual(
  advancePingPongVideoTime({
    currentTime: 2,
    duration: 5,
    deltaSeconds: 0.5,
    direction: "reverse",
  }),
  {
    currentTime: 1.5,
    direction: "reverse",
  },
);

assert.deepEqual(
  advanceReverseFrameIndex({
    currentIndex: 3,
    frameCount: 5,
  }),
  {
    frameIndex: 2,
    phase: "reverse",
  },
);

assert.deepEqual(
  advanceReverseFrameIndex({
    currentIndex: 0,
    frameCount: 5,
  }),
  {
    frameIndex: 0,
    phase: "forward",
  },
);

console.log("ping-pong video timing tests passed");
