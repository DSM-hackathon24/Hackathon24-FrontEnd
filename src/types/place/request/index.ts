export interface PlaceRequestType {
  type: "지상식" | "지하식" | "옥내";
  available?: boolean;
  year?: number;
  x?: number;
  y?: number;
}
