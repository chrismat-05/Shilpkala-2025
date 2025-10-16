import showcase from "@/assets/media/showcase.png";
import chain from "@/assets/media/chain.png";
import doodle from "@/assets/media/doodle.png";
import echoes from "@/assets/media/echoes.png";
import facesplash from "@/assets/media/facesplash.png";
import flames from "@/assets/media/flames.png";
import henna from "@/assets/media/henna.png";
import mosaic from "@/assets/media/mosaic.png";
import paper from "@/assets/media/paper.png";
import scrapbook from "@/assets/media/scrapbook.png";
import toon from "@/assets/media/toon.png";
import veil from "@/assets/media/veil.png";

const images: Record<string, string> = {
  "festlogo.png": "/festlogo.png",
  "showcase.png": showcase,
  "chain.png": chain,
  "doodle.png": doodle,
  "echoes.png": echoes,
  "facesplash.png": facesplash,
  "flames.png": flames,
  "henna.png": henna,
  "mosaic.png": mosaic,
  "paper.png": paper,
  "scrapbook.png": scrapbook,
  "toon.png": toon,
  "veil.png": veil,
};

export function resolveImage(imgPath?: string) {
  if (!imgPath) return "";
  if (imgPath.startsWith("http") || imgPath.startsWith("/")) return imgPath;
  try {
    const parts = imgPath.split("/");
    const file = parts[parts.length - 1];
    return images[file] ?? imgPath;
  } catch {
    return imgPath;
  }
}

export default images;