import { cfbTeamData } from "./cfb_team_data.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0"
import { Database } from '../database.types.ts'

const supabase = createClient<Database>('http://localhost:54321', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU')

cfbTeamData.sports[0].leagues[0].teams.forEach((element, i) => {
    setTimeout(async () => {
        try {
            console.log(element.team.id)
            console.log(element.team.shortDisplayName)
            console.log(element.team.displayName)
            const logo = element.team.logos.filter((logo) => {if(logo.rel.includes('default')) return logo })
            console.log(logo[0].href)
            console.log(element.team.abbreviation)
        
            const { error } = await supabase.from("cfb_team").insert({
                id: +element.team.id,
                short_display_name: element.team.shortDisplayName,
                display_name: element.team.displayName,
                logo: logo[0].href,
                abbreviation: element.team.abbreviation,
            })
        
            if (error) console.log(`Error writing cfb team data: ${JSON.stringify(error)}`)
        } catch (error) {
            console.log(`Error while processing cfb team: ${JSON.stringify(error)}`)
        }
    }, 1 * i)
});

// CREATE TYPE cfb_conference AS ENUM ('ACC', 'Mid-American', 'American', 'Mountain West', 'Pac-12', 'Big 12', 'SEC', 'Big Ten', 'Sun Belt', 'Conference USA', 'FBS Independents');
// ALTER TABLE "cfb_team" ADD COLUMN conference cfb_conference;
// UPDATE cfb_team SET conference = 'FBS Independents' WHERE abbreviation = 'MASS' RETURNING display_name;
// DELETE FROM cfb_team WHERE conference IS  NULL;