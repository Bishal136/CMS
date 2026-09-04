export interface IPostingSlot {
  time: string;
  dayOfWeek: number; // 0-6
}

export function generateDefaultTimeSlots(): IPostingSlot[] {
  const defaultTimes = ['09:00', '13:00', '17:00'];
  const slots: IPostingSlot[] = [];
  for (let day = 0; day < 7; day++) {
    defaultTimes.forEach((time) => {
      slots.push({ dayOfWeek: day, time });
    });
  }
  return slots;
}
