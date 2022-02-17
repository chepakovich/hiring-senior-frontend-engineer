// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
});

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: String } | any>
) {
  try {
    const { data } = await client.query({
      query: gql`
        query GetLaunches {
          launchesPast {
            mission_name
            launch_date_local
            launch_site {
              site_name
            }
            rocket {
              rocket_name
              second_stage {
                payloads {
                  payload_mass_kg
                  nationality
                }
              }
            }
            mission_id
            launch_success
          }
        }
      `,
    });

    console.log('data:', data.launchesPast);
    const launches = [];
    const missions = [];
    for (const d of data.launchesPast) {
      const payloadKg = d.rocket?.second_stage?.payloads?.reduce(
        (s: any, a: any) => a.payload_mass_kg + s,
        0
      );
      const launch = {
        missionName: d.mission_name,
        date: d.launch_date_local,
        outcome: d.launch_success,
        rocket: d.rocket?.rocket_name,
        payloadKg,
        nationality: d.nationality,
        site: d.launch_site?.site_name,
        missionId: d.mission_id[0] ? d.mission_id[0] : '',
      };
      launches.push(launch);
      const mission = {
        missionName: d.mission_name,
        payloadKg,
      };
      missions.push(mission);
    }

    launches.sort((a, b) => b.date - a.date);
    missions.sort((a, b) => b.payloadKg - a.payloadKg);
    const topMissions = missions.slice(0, 5);

    res.status(200).json({ launches, topMissions });
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
