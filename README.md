# ArUco Square Sheet Generator (https://knoncto.github.io/aruco-square-gen/)

A web tool for generating printable sheets with ArUco markers at the corners, useful for computer vision and augmented reality applications.

![App preview](docs/preview.png)

## How it works

Configure the sheet type and analysis area dimensions using the sliders on the right panel. The preview updates in real time. Once happy with the result, hit **Imprimir** to open the print dialog — from there you can print physically or save as PDF.

- Zoom in/out on the preview using the controls at the bottom right
- Markers use the `DICT_4X4_50` ArUco dictionary (IDs 0–3)
- Supported sheet sizes: A3, A4, A5, A6, Carta, Legal

## Tech

- React + Vite
- Tailwind CSS
- SVG rendering (no canvas, no external CV libraries)

## Run locally

```bash
npm install
npm run dev
```
