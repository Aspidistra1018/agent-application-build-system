export interface GradientPosition {
  left?: number;
  right?: number;
}

export interface CanvasPosition {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}

export interface BackgroundImageDetail {
  /** original image */
  origin_image_uri?: string;
  origin_image_url?: string;
  /** Actual use of pictures */
  image_uri?: string;
  image_url?: string;
  theme_color?: string;
  /** Gradual change of position */
  gradient_position?: GradientPosition;
  /** Crop canvas position */
  canvas_position?: CanvasPosition;
}

export interface BackgroundImageInfo {
  /** Web background cover */
  web_background_image?: BackgroundImageDetail;
  /** Mobile end background cover */
  mobile_background_image?: BackgroundImageDetail;
}
