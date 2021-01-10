export interface Meeting {
  _id: string;
  firstname: string;
  lastname: string;
  date: number;
}

export function createMeeting(params: Partial<Meeting>) {
  return {

  } as Meeting;
}
