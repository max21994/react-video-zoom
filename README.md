# react-video-zoom

## Overview

React component for magnifying glass circle on a video when hovering.

## Demo

[Demo](https://react-video-zoom-github-io.vercel.app/)

## Install

```
npm install react-video-zoom --save
```

## Usage

```JSX
import {
  ReactVideoZoom,
  pauseReactVideoZoom,
  playReactVideoZoom,
} from "react-video-zoom";
import { useRef } from "react";
import VideoPath from "./test_video.mp4";

function App() {
    const mainVideoRef = useRef<HTMLVideoElement>(null);
    const zoomVideoRef = useRef<HTMLVideoElement>(null);

    const refs = { mainVideoRef, zoomVideoRef };

    return (
        <>
            <ReactVideoZoom
                src={VideoPath}
                zoom={zoom}
                refs={refs}
                width={1000}
                loop
                muted
            />
            <div onClick={() => playReactVideoZoom(refs)}>Play</div>
            <div onClick={() => pauseReactVideoZoom(refs)}>Pause</div>
        </>
    )
}
```

## Properties of `<ReactVideoZoom />` component

| Property | Type               | Is required | Description                        |
| -------- | ------------------ | ----------- | ---------------------------------- |
| src      | string             | Requred     | Source of the video                |
| zoom     | number             | Requred     | Magnification value                |
| refs     | ReactVideoZoomRefs | Requred     | Object of React ref objects        |
| width    | number             | Optional    | Width of the video in pixels       |
| loop     | boolean            | Optional    | When true, video will play on loop |
| muted    | boolean            | Optional    | When true, video will be muted     |

## `playReactVideoZoom(refs)` and `pauseReactVideoZoom(refs)` playback control functions

The package also exports 2 playback control functions for playing and pausing the videos in sync. Object `refs` of type `ReactVideoZoomRefs` must be passed as an argument to both of them.

## `ReactVideoZoomRefs` type

The `refs` object that is passed to `<ReactVideoZoom />` component and playback control functions must be of the following type:

```typescript
type ReactVideoZoomRefs = {
  mainVideoRef: React.RefObject<HTMLVideoElement>;
  zoomVideoRef: React.RefObject<HTMLVideoElement>;
};
```
