type UnixTimestamp = number;

type Completion = {
  star_index: number;
  get_star_ts: UnixTimestamp;
};

type Member = {
  id: number;
  completion_day_level: Record<string, Record<string, Completion>>;
  name: string;
  local_score: number;
  last_star_ts: UnixTimestamp;
  global_score: number;
  stars: number;
};

export interface APIResponse {
  day1_ts: UnixTimestamp;
  owrner_id: number;
  members: Record<string, Member>;
}
