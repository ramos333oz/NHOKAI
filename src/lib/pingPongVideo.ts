export type PingPongVideoDirection = "forward" | "reverse";

interface AdvancePingPongVideoTimeOptions {
  currentTime: number;
  duration: number;
  deltaSeconds: number;
  direction: PingPongVideoDirection;
}

interface PingPongVideoTime {
  currentTime: number;
  direction: PingPongVideoDirection;
}

interface AdvanceReverseFrameIndexOptions {
  currentIndex: number;
  frameCount: number;
}

interface ReverseFrameState {
  frameIndex: number;
  phase: PingPongVideoDirection;
}

export function advancePingPongVideoTime({
  currentTime,
  duration,
  deltaSeconds,
  direction,
}: AdvancePingPongVideoTimeOptions): PingPongVideoTime {
  if (direction === "forward") {
    const nextTime = Math.min(duration, currentTime + deltaSeconds);

    return {
      currentTime: nextTime,
      direction: nextTime >= duration ? "reverse" : "forward",
    };
  }

  const nextTime = Math.max(0, currentTime - deltaSeconds);

  return {
    currentTime: nextTime,
    direction: nextTime <= 0 ? "forward" : "reverse",
  };
}

export function advanceReverseFrameIndex({
  currentIndex,
  frameCount,
}: AdvanceReverseFrameIndexOptions): ReverseFrameState {
  if (frameCount <= 0 || currentIndex <= 0) {
    return {
      frameIndex: 0,
      phase: "forward",
    };
  }

  return {
    frameIndex: Math.min(frameCount - 1, currentIndex - 1),
    phase: "reverse",
  };
}
