export type CardType = {
  id: number;
  name: string;
  isFlipped: boolean;
  matched: boolean;
  hinted?: boolean;
  greeting: string;
};
