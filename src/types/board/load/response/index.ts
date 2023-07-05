export interface BoardLoadResponseType {
  boardId?: number;
  writer: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string[];
}
