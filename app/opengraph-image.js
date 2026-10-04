import { ImageResponse } from "next/og";
import GeneralPreview from "../components/GeneralPreview";
import { PREVIEW_SIZE } from "../lib/scenarioImage";

// The preview image shown when the site itself is shared on WhatsApp, X or Facebook.
export const alt = "electionmap.ng: predict Nigeria's 2027 presidential election";
export const size = PREVIEW_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(<GeneralPreview />, { ...PREVIEW_SIZE });
}
