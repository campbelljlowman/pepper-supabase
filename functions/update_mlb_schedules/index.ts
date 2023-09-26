// import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

interface Game {
  homeTeamID: string
  awayteamID: string
  date: string
  streamlink: string
}

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

const getSchedule = async function (date: Date): Game[] {
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

  const gamesScheduledToday = response.data.content.schedule[espnDateString].games
  console.log(gamesScheduledToday)
  gamesScheduledToday.forEach((element: { competitions: any; }) => {
    console.log(element.competitions)
  });

  return gamesScheduledToday
};

const data = await getSchedule(new Date())
// console.log(data);

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
