export type User = {
  id: number;
  name: string;
  email: string;
};

export type Sport = {
  id: number;
  name: string;
}

export type Team = {
  id: number;
  name: string;
};

export type MatchPreview = {
  id: number;
  endsAt: string;
  isRunning: boolean;
  location: string;
  name: string;
  sportName: string;
  teams: Team[];
};

export type MatchDetails = {
  id: number;
  startsAt: string;
  endsAt: string;
  isRunning: boolean;
  location: string;
  name: string;
  sportName: string;
  teams: Team[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  score: any;
  playingTeam: number;
  story: string;
};


export type ArticlePreview = {
  id: number;
  title: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  summary: string;
  teams: Team[];
};

export type ArticleDetails = {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  content: string;
  teams: Team[];
}