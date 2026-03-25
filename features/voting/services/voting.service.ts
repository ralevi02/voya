import { supabase } from '@/lib/supabase';
import type { VoteSession, VoteOption, Vote } from '../types/voting.types';
import type { CreateVoteSessionInput, CastVoteInput } from '../types/schemas';

export async function getVoteSessions(
  tripId: string
): Promise<VoteSession[]> {
  const { data, error } = await supabase
    .from('vote_sessions')
    .select('*')
    .eq('trip_id', tripId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as VoteSession[];
}

export async function createVoteSession(
  input: CreateVoteSessionInput,
  userId: string
): Promise<VoteSession> {
  const { options, ...sessionData } = input;
  const { data, error } = await supabase
    .from('vote_sessions')
    .insert({ ...sessionData, created_by: userId })
    .select()
    .single();
  if (error) throw error;

  const session = data as VoteSession;
  const optionRows = options.map((o) => ({
    session_id: session.id,
    ...o,
  }));
  const { error: optError } = await supabase
    .from('vote_options')
    .insert(optionRows);
  if (optError) throw optError;

  return session;
}

export async function getVoteOptions(
  sessionId: string
): Promise<VoteOption[]> {
  const { data, error } = await supabase
    .from('vote_options')
    .select('*')
    .eq('session_id', sessionId);
  if (error) throw error;
  return (data ?? []) as VoteOption[];
}

export async function castVote(
  input: CastVoteInput,
  userId: string
): Promise<Vote> {
  const { data, error } = await supabase
    .from('votes')
    .insert({ ...input, user_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data as Vote;
}
