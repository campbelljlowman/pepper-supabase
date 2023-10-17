# // RLS policy for stream_link table
# // (EXISTS ( SELECT 1
# //     FROM "user"
# //    WHERE (("user".id = auth.uid()) AND (stream_link.id = ANY ("user".ids_of_game_streams_user_can_view)))))

start-sb:
	supabase start

stop-sb:
	supabase stop

serve-functions:
	supabase functions serve

regen-types:
	supabase gen types typescript --local pepper-supabase  > database.types.ts

connect-to-postgres:
	psql postgresql://postgres:postgres@localhost:54322/postgres


update-all-schedules: update-mlb-schedules update-nhl-schedules update-nfl-schedules

update-mlb-schedules:
	curl -i --location --request POST 'http://localhost:54321/functions/v1/update-mlb-schedule' \
	--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
	--header 'Content-Type: application/json' \

update-nhl-schedules:
	curl -i --location --request POST 'http://localhost:54321/functions/v1/update-nhl-schedule' \
	--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
	--header 'Content-Type: application/json' \

update-nfl-schedules:
	curl -i --location --request POST 'http://localhost:54321/functions/v1/update-nfl-schedule' \
	--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
	--header 'Content-Type: application/json' \