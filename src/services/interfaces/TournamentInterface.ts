import { Participation } from "./ParticipationInterface" 

export interface Tournament {
  id: number,
  title: string,
  description: string,
  start_date: string,
  end_date: string,
  location: string,
  max_participant: number,
  userId: number,
  createdAt: string,
  updatedAt?: string,
  participations: Participation[]
}