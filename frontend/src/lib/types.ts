export type Player = {
  id: number;
  name: string;
  rating?: number | null;
  age?: number | null;
  position?: string | null;
  height?: number | null; // cm
  createdAt?: string;
  active?: boolean;
};
