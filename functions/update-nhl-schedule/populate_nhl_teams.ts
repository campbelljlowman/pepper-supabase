import { nhlTeamData } from "./nhl_team_data.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0"
import { Database } from '../database.types.ts'

const supabase = createClient<Database>('http://localhost:54321', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU')

nhlTeamData.sports[0].leagues[0].teams.forEach(async element => {
    console.log(element.team.id)
    console.log(element.team.shortDisplayName)
    console.log(element.team.displayName)
    const logo = element.team.logos.filter((logo) => {if(logo.rel.includes('default')) return logo })
    console.log(logo[0].href)
    console.log(element.team.abbreviation)

    const { error } = await supabase.from("nhl_team").insert({
        id: +element.team.id,
        short_display_name: element.team.shortDisplayName,
        display_name: element.team.displayName,
        logo: logo[0].href,
        abbreviation: element.team.abbreviation,
        // division: 'Central',
        // league: 'American League'
    })

    if (error) console.log(`Error writing mlb team data: ${error}`)
});

// CREATE TYPE nhl_conference AS ENUM ('Eastern', 'Western');
// CREATE TYPE nhl_division AS ENUM ('Atlantic', 'Metropolitan', 'Central', 'Pacific');
// ALTER TABLE "nhl_team" ADD COLUMN division nhl_division;
// ALTER TABLE "nhl_team" ADD COLUMN conference nhl_conference;
// UPDATE nhl_team SET division = 'Eastern', conference = 'Atlantic' WHERE abbreviation = 'OAK';