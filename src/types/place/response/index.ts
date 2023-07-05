export interface PlaceResponseType {
  id: number;
  foundBy?: string;
  foundDate: string;
  type: "지상식" | "지하식" | "옥내";
  available?: boolean;
  year?: number;
  distance?: number;
  x: number;
  y: number;
}
