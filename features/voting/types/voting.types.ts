export type VoteSessionStatus = 'active' | 'completed' | 'cancelled';
export type VoteChoice = 'yes' | 'no';

export interface VoteSession {
  id: string;
  trip_id: string;
  title: string;
  status: VoteSessionStatus;
  created_by: string;
  created_at: string;
  expires_at: string | null;
}

export interface VoteOption {
  id: string;
  session_id: string;
  title: string;
  description: string;
  image_url: string | null;
  metadata: Record<string, unknown>;
}

export interface Vote {
  id: string;
  session_id: string;
  option_id: string;
  user_id: string;
  choice: VoteChoice;
  voted_at: string;
}

export interface VoteResult {
  option: VoteOption;
  yes_count: number;
  total_votes: number;
}

export interface CreateVoteSessionInput {
  trip_id: string;
  title: string;
  options: { title: string; description: string; image_url?: string | null }[];
  expires_at?: string | null;
}
