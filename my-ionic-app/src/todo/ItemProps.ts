export interface ItemProps {
  _id?: string;
  name: string;
  bakingTimeMinutes: number;
  lastPreparedDate: string;
  isSuccess: boolean;
  ingredients?: string;
}
