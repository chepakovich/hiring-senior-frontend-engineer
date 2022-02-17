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
        query GetPayloads {
          payloads {
            customers
            payload_mass_kg
            nationality
          }
        }
      `,
    });

    console.log('payloads:', data.payloads);
    let totalPayloads = 0;
    let totalMass = 0;
    const customersAll = [];
    const nationalities = {};
    for (const p of data.payloads) {
      totalPayloads++;
      totalMass += p.payload_mass_kg;
      for (const c of p.customers) {
        customersAll.push(c);
      }
      if (p.nationality) {
        const nationality = p.nationality.replace(/[^a-z]/gi, '');
        // const nationality = p.nationality.replace("'", '');
        nationalities[nationality] =
          nationalities[nationality] + p.payload_mass_kg || p.payload_mass_kg;
      } else {
        nationalities['other'] =
          nationalities['other'] + p.payload_mass_kg || p.payload_mass_kg;
      }
    }

    const customers = customersAll.filter((a, i, arr) => arr.indexOf(a) === i);
    const nationalitiesArr = Object.entries(nationalities);
    customers.sort();
    nationalitiesArr.sort((a, b) => b[1] - a[1]);
    const averageMass = Math.round(totalMass / totalPayloads);
    const totalCustomers = customers.length - 1;

    const chartData = [];
    for (const n of nationalitiesArr.slice(0, 5)) {
      const obj = {
        label: n[0],
        value: n[1],
      };
      chartData.push(obj);
    }

    // console.log(
    //   'XXXXXXXXX nationalities:',
    //   nationalities,
    //   totalPayloads,
    //   totalMass,
    //   customers,
    //   nationalitiesArr
    // );

    res.status(200).json({
      totalPayloads,
      averageMass,
      totalCustomers,
      chartData,
    });
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
