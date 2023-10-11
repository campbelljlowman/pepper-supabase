import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0"
import { Database } from '../database.types.ts'

const supabase = createClient<Database>(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

interface MLBGame {
  title: string
  homeTeamID: string
  awayteamID: string
  date: string
  // streamlink: string
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

const getMLBGamesForDateFromESPN = async function (date: Date): Promise<MLBGame[]> {
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

  const espnGamesScheduled: ESPNMLBScheduleResponse = response.data.content
  const mlbGames: MLBGame[] = []

  if (espnGamesScheduled.schedule[espnDateString].games.length === 0) {
    return mlbGames
  }

  espnGamesScheduled.schedule[espnDateString].games.forEach((game) => {
    try {
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
        date: game.date
        // streamlink: ""
      }
      mlbGames.push(mlbGame)
    }
    catch(error) {
      console.log(`Error parsing game info: ${error}`)
    }

  });

  return mlbGames
};

const overwriteMLBSchedule = async function(mlbGames: MLBGame[]) {
  const { error } = await supabase.from('mlb_game_today').delete().neq("title", "delete_everything")
  if (error) console.log(`Error erasing existing mlb games: ${JSON.stringify(error)}`)

  mlbGames.forEach(async game => {
    const { error } = await supabase.from('mlb_game_today').insert({
      title: game.title,
      home_team: +game.homeTeamID,
      away_team: +game.awayteamID,
      start_time: game.date
      // stream_link: game.streamlink
    })
    if (error) console.log(`Error writing mlb game: ${JSON.stringify(error)}`)
  });
}

const updateMLBSchedules = async function(_req: Request) {
  // Serves any HTTP verb
  const mlbGamesToday = await getMLBGamesForDateFromESPN(new Date())
  
  await overwriteMLBSchedule(mlbGamesToday)
  
  return new Response(
    JSON.stringify("Successfully updated MLB schedules"),
  )
}

// updateMLBSchedules()
serve(updateMLBSchedules)

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/update-mlb-schedule' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'

// To schedule in database (psql)
// https://supabase.com/docs/guides/functions/schedule-functions

// select
//   cron.schedule(
//     'update-mlb-schedule-every-day',
//     '30 4 * * *', -- every day at 4:30 AM
//     $$
//     select
//       net.http_post(
//           url:='http://host.docker.internal:54321/functions/v1/update-mlb-schedule',
//           headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"}'::jsonb
//       ) as request_id;
//     $$
//   );

// To unschedule

// select cron.unschedule('update-mlb-schedule-every-day');