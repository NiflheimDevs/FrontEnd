/* eslint-disable @typescript-eslint/no-explicit-any */
import { Team } from "../../Components/Biders/types";

export interface ApiTeamResponse {
  teams: Team[];
  onemanteamid: number;
  profile: string;
  userid: number;
  username: string;
  firstname: string;
  lastname: string;
}

export const mapApiData = (apiData: any): ApiTeamResponse => {
  return {
    ...apiData,
    teams: apiData.teams
      ? apiData.teams.map((team: any) => ({
          team_id: team.id,
          title: team.title,
          description: team.description,
          profile: team.profile,
          isValid: team.can_bid,
          position: team.position || "",
        }))
      : [],
  };
};
