import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0"
import { Database } from '../database.types.ts'

const supabase = createClient<Database>(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

interface NHLGame {
  title: string
  homeTeamID: string
  awayteamID: string
  date: string
  // streamlink: string
}

interface ESPNNHLScheduleResponse {
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

const getNHLGamesForDateFromESPN = async function (date: Date): Promise<NHLGame[]> {
  // https://github.com/sportsdataverse/sportsdataverse-js/blob/main/app/services/nhl.service.js#L149

  // year + month with leading 0 + day with leading 0
  const espnDateString = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`
  const baseUrl = `http://cdn.espn.com/core/nhl/schedule`;
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

  const espnGamesScheduled: ESPNNHLScheduleResponse = response.data.content
  const nhlGames: NHLGame[] = []

  if (typeof espnGamesScheduled.schedule[espnDateString] === 'undefined') {
    return nhlGames
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
  
      const nhlGame: NHLGame = {
        title: game.name,
        homeTeamID: homeTeamID,
        awayteamID: awayTeamID,
        date: game.date
        // streamlink: ""
      }
      nhlGames.push(nhlGame)
    }
    catch(error) {
      console.log(`Error parsing game info: ${error}`)
    }

  });

  return nhlGames
};

const overwriteNHLSchedule = async function(nhlGames: NHLGame[]) {
  const { error } = await supabase.from('nhl_game_today').delete().neq("title", "delete_everything")
  if (error) console.log(`Error erasing existing nhl games: ${JSON.stringify(error)}`)

  nhlGames.forEach(async game => {
    const { error } = await supabase.from('nhl_game_today').insert({
      title: game.title,
      home_team_id: +game.homeTeamID,
      away_team_id: +game.awayteamID,
      start_time: game.date,
      view_price_dollars: 1
      // stream_link: game.streamlink
    })
    if (error) console.log(`Error writing nhl game: ${JSON.stringify(error)}`)
  });
}

const updateNHLSchedules = async function(_req: Request) {
  // Serves any HTTP verb
  const nhlGamesToday = await getNHLGamesForDateFromESPN(new Date())
  
  await overwriteNHLSchedule(nhlGamesToday)
  
  return new Response(
    JSON.stringify("Successfully updated NHL schedules"),
  )
}

// updateNHLSchedules()
serve(updateNHLSchedules)

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/update-nhl-schedule' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'

// To schedule in database (psql)
// https://supabase.com/docs/guides/functions/schedule-functions

// select
//   cron.schedule(
//     'update-nhl-schedule-every-day',
//     '30 4 * * *', -- every day at 4:30 AM
//     $$
//     select
//       net.http_post(
//           url:='http://host.docker.internal:54321/functions/v1/update-nhl-schedule',
//           headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"}'::jsonb
//       ) as request_id;
//     $$
//   );

// To unschedule

// select cron.unschedule('update-nhl-schedule-every-day');