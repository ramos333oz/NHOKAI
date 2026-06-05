import React from "react";
import { advanceReverseFrameIndex } from "../lib/pingPongVideo";

interface PingPongBackgroundVideoProps {
  src: string;
  className?: string;
}

const CAPTURE_FPS = 10;
const MAX_CAPTURE_WIDTH = 960;
const CAPTURE_INTERVAL_MS = 1000 / CAPTURE_FPS;

export default function PingPongBackgroundVideo({
  src,
  className,
}: PingPongBackgroundVideoProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const captureCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const capturedFramesRef = React.useRef<ImageBitmap[]>([]);
  const captureAnimationRef = React.useRef<number | null>(null);
  const reverseAnimationRef = React.useRef<number | null>(null);
  const reverseFrameIndexRef = React.useRef(0);
  const lastCaptureTickRef = React.useRef(0);
  const lastReverseTickRef = React.useRef(0);
  const captureRunRef = React.useRef(0);
  const [isReversing, setIsReversing] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  const clearCapturedFrames = React.useCallback(() => {
    capturedFramesRef.current.forEach((frame) => frame.close());
    capturedFramesRef.current = [];
  }, []);

  const stopCapture = React.useCallback(() => {
    if (captureAnimationRef.current !== null) {
      window.cancelAnimationFrame(captureAnimationRef.current);
      captureAnimationRef.current = null;
    }
  }, []);

  const stopReverse = React.useCallback(() => {
    if (reverseAnimationRef.current !== null) {
      window.cancelAnimationFrame(reverseAnimationRef.current);
      reverseAnimationRef.current = null;
    }

    lastReverseTickRef.current = null;
  }, []);

  const sizeCaptureCanvas = React.useCallback((video: HTMLVideoElement) => {
    const sourceWidth = video.videoWidth || MAX_CAPTURE_WIDTH;
    const sourceHeight = video.videoHeight || Math.round(MAX_CAPTURE_WIDTH * 9 / 16);
    const scale = Math.min(1, MAX_CAPTURE_WIDTH / sourceWidth);
    const width = Math.max(1, Math.round(sourceWidth * scale));
    const height = Math.max(1, Math.round(sourceHeight * scale));
    const captureCanvas = captureCanvasRef.current ?? document.createElement("canvas");

    if (captureCanvas.width !== width || captureCanvas.height !== height) {
      captureCanvas.width = width;
      captureCanvas.height = height;
    }

    captureCanvasRef.current = captureCanvas;

    const displayCanvas = canvasRef.current;
    if (displayCanvas && (displayCanvas.width !== width || displayCanvas.height !== height)) {
      displayCanvas.width = width;
      displayCanvas.height = height;
    }

    return captureCanvas;
  }, []);

  const captureFrame = React.useCallback(
    async (video: HTMLVideoElement, runId: number) => {
      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || video.videoWidth <= 0) {
        return;
      }

      const captureCanvas = sizeCaptureCanvas(video);
      const context = captureCanvas.getContext("2d");
      if (!context) return;

      context.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
      const frame = await createImageBitmap(captureCanvas);

      if (captureRunRef.current !== runId || video.ended) {
        frame.close();
        return;
      }

      capturedFramesRef.current.push(frame);
    },
    [sizeCaptureCanvas],
  );

  const captureForwardFrameStrip = React.useCallback(
    (timestamp: number, runId: number) => {
      const video = videoRef.current;

      if (!video || video.paused || video.ended || captureRunRef.current !== runId) {
        captureAnimationRef.current = null;
        return;
      }

      if (timestamp - lastCaptureTickRef.current >= CAPTURE_INTERVAL_MS) {
        lastCaptureTickRef.current = timestamp;
        void captureFrame(video, runId);
      }

      captureAnimationRef.current = window.requestAnimationFrame((nextTimestamp) => {
        captureForwardFrameStrip(nextTimestamp, runId);
      });
    },
    [captureFrame],
  );

  const playForward = React.useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    stopReverse();
    stopCapture();
    clearCapturedFrames();
    captureRunRef.current += 1;
    lastCaptureTickRef.current = 0;
    setIsReversing(false);
    video.playbackRate = 1;
    video.currentTime = 0;
    void video.play().catch(() => {
      // The video is muted, but browsers may still defer autoplay until interaction.
    });

    const runId = captureRunRef.current;
    captureAnimationRef.current = window.requestAnimationFrame((timestamp) => {
      captureForwardFrameStrip(timestamp, runId);
    });
  }, [captureForwardFrameStrip, clearCapturedFrames, stopCapture, stopReverse]);

  const stopPlayback = React.useCallback(() => {
    videoRef.current?.pause();
    setIsReversing(false);
    stopCapture();
    stopReverse();
    clearCapturedFrames();
    captureRunRef.current += 1;
  }, [clearCapturedFrames, stopCapture, stopReverse]);

  const reverseToStart = React.useCallback(
    (timestamp: number) => {
      const frames = capturedFramesRef.current;
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !context || frames.length === 0) {
        playForward();
        return;
      }

      if (timestamp - lastReverseTickRef.current >= CAPTURE_INTERVAL_MS) {
        lastReverseTickRef.current = timestamp;
        const frame = frames[reverseFrameIndexRef.current];

        if (frame) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(frame, 0, 0, canvas.width, canvas.height);
        }

        const next = advanceReverseFrameIndex({
          currentIndex: reverseFrameIndexRef.current,
          frameCount: frames.length,
        });

        reverseFrameIndexRef.current = next.frameIndex;

        if (next.phase === "forward") {
          playForward();
          return;
        }
      }

      reverseAnimationRef.current = window.requestAnimationFrame(reverseToStart);
    },
    [playForward],
  );

  const startReverse = React.useCallback(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    stopCapture();

    if (capturedFramesRef.current.length < 2) {
      playForward();
      return;
    }

    video.pause();
    setIsReversing(true);
    reverseFrameIndexRef.current = capturedFramesRef.current.length - 1;
    lastReverseTickRef.current = 0;
    stopReverse();
    reverseAnimationRef.current = window.requestAnimationFrame(reverseToStart);
  }, [isVisible, playForward, reverseToStart, stopCapture, stopReverse]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateVisibility = () => {
      const rect = container.getBoundingClientRect();
      setIsVisible(rect.bottom > 0 && rect.top < window.innerHeight);
    };

    updateVisibility();

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (isVisible) {
      playForward();
    } else {
      stopPlayback();
    }

    return stopPlayback;
  }, [isVisible, playForward, src, stopPlayback]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className ?? ""}`}>
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-opacity duration-150 ${
          isReversing ? "opacity-0" : "opacity-100"
        }`}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={startReverse}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-opacity duration-150 ${
          isReversing ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
