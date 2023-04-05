import "./index.css";

import { useRef, useState } from "react";

type ReactVideoZoomProps = {
  src: string;
  zoom: number;
  refs: ReactVideoZoomRefs;
  width?: number;
  loop?: boolean;
  muted?: boolean;
};

type ReactVideoZoomRefs = {
  mainVideoRef: React.RefObject<HTMLVideoElement>;
  zoomVideoRef: React.RefObject<HTMLVideoElement>;
};

export const playReactVideoZoom = ({
  mainVideoRef,
  zoomVideoRef,
}: ReactVideoZoomRefs) => {
  mainVideoRef.current?.play();
  zoomVideoRef.current?.play();
  if (zoomVideoRef.current && mainVideoRef.current)
    zoomVideoRef.current.currentTime = mainVideoRef.current.currentTime;
};

export const pauseReactVideoZoom = ({
  mainVideoRef,
  zoomVideoRef,
}: ReactVideoZoomRefs) => {
  mainVideoRef.current?.pause();
  zoomVideoRef.current?.pause();
  if (zoomVideoRef.current && mainVideoRef.current) {
    zoomVideoRef.current.currentTime = mainVideoRef.current.currentTime;
    // eslint-disable-next-line no-self-assign
    mainVideoRef.current.currentTime = mainVideoRef.current.currentTime;
  }
};

export const ReactVideoZoom = ({
  src,
  zoom,
  refs,
  width,
  loop = false,
  muted = false,
}: ReactVideoZoomProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ left: 0, top: 0 });
  const [containerRect, setContainerRect] = useState({
    width: 0,
    height: 0,
  });
  const [isZoomOn, setZoomOn] = useState(false);

  const { mainVideoRef, zoomVideoRef } = refs;

  const onPointerMove = ({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        left: clientX - containerRect.left,
        top: clientY - containerRect.top,
      });
      setContainerRect({
        width: containerRect.width,
        height: containerRect.height,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="video-container"
      onMouseMove={(e) =>
        onPointerMove({
          clientX: e.clientX,
          clientY: e.clientY,
        })
      }
      onMouseEnter={() => setZoomOn(true)}
      onMouseLeave={() => setZoomOn(false)}
      onTouchMove={(e) =>
        onPointerMove({
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
        })
      }
      onTouchStart={() => setZoomOn(true)}
      onTouchEnd={() => setZoomOn(false)}
    >
      <video
        src={src}
        ref={mainVideoRef}
        width={width ? width : "100%"}
        loop={loop}
        muted={muted}
      />
      <div
        className="zoom-container"
        style={{
          left: mousePosition.left,
          top: mousePosition.top,
          display: isZoomOn ? "block" : "none",
        }}
      >
        <video
          style={{
            transform: `translate(calc(-${
              mousePosition.left * zoom
            }px + 75px), calc(-${mousePosition.top * zoom}px + 75px))`,
          }}
          src={src}
          width={containerRect.width * zoom}
          height={containerRect.height * zoom}
          ref={zoomVideoRef}
          muted
          loop={loop}
        />
      </div>
    </div>
  );
};
