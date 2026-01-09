
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface PredictionResult {
  text: string;
  sources: GroundingChunk[];
}

export interface MarketAnalysisRequest {
  query?: string;
  image?: string; // base64
}
