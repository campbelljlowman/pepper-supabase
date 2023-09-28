// import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
// import { Database } from '../database.types.ts'

interface MLBGame {
  title: string
  homeTeamID: string
  awayteamID: string
  date: string
  streamlink: string
}

interface ESPNMLBScheduleResponse {
  schedule: {
    [index: string]: {
      games: {
        name: string,
        date: string,
        competitions: {
          [index: number]: {
            competitors: {
              homeAway: string
              id: string
            } []
          }
        }
      } []
    }
  }
}

const getMLBSchedule = async function (date: Date): Promise<MLBGame[]> {
  // https://github.com/sportsdataverse/sportsdataverse-js/blob/main/app/services/mlb.service.js#L149

  // year + month with leading 0 + day with leading 0
  const espnDateString = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`
  const baseUrl = `http://cdn.espn.com/core/mlb/schedule`;
  const params = {
    xhr: 1,
    render: false,
    device: "desktop",
    userab: 18,
    dates: espnDateString
  };

  const response = await axiod.get(baseUrl, {
    params
  });

  const espnGamesScheduledToday: ESPNMLBScheduleResponse = response.data.content
  const mlbGamesToday: MLBGame[] = []

  espnGamesScheduledToday.schedule[espnDateString].games.forEach((game) => {
    let homeTeamID = "" 
    let awayTeamID = ""

    game.competitions[0].competitors.forEach((team) => {
      if (team.homeAway == "home") {
        homeTeamID = team.id
      }
      if (team.homeAway == "away") {
        awayTeamID = team.id
      }
    });

    const mlbGame: MLBGame = {
      title: game.name,
      homeTeamID: homeTeamID,
      awayteamID: awayTeamID,
      date: game.date,
      streamlink: ""
    }

    mlbGamesToday.push(mlbGame)
  });

  return mlbGamesToday
};


const mlbGames = await getMLBSchedule(new Date())
console.log(mlbGames);

// serve(async (req) => {
//   const result = await sdv.mlb.getSchedule(2016, 4, 15)

//   const { name } = await req.json()
//   const data = {
//     message: `Hello ${name}!`,
//   }

//   return new Response(
//     JSON.stringify(result),
//     { headers: { "Content-Type": "application/json" } },
//   )
// })

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/hello-world' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
