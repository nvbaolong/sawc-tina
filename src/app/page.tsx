import HomeClient from "@/components/HomeClient";
import { client } from "../../tina/__generated__/client";

export const revalidate = 0;

export default async function Home() {
  // Fetch initial content using the Tina client for live Visual Editing capabilities
  const [heroRes, tvShowsRes, eventsRes] = await Promise.all([
    client.queries.hero({ relativePath: "index.json" }),
    client.queries.tvShowConnection(),
    client.queries.eventConnection(),
  ]);

  return (
    <HomeClient
      hero={{
        data: heroRes.data,
        query: heroRes.query,
        variables: heroRes.variables,
      }}
      tvShows={{
        data: tvShowsRes.data,
        query: tvShowsRes.query,
        variables: tvShowsRes.variables,
      }}
      events={{
        data: eventsRes.data,
        query: eventsRes.query,
        variables: eventsRes.variables,
      }}
    />
  );
}
