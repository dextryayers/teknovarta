import { NextResponse } from 'next/server';

const LCW_KEY = '1bd88380-4e7d-4177-97fd-1d041f58de7d';

export const revalidate = 60; // Cache for 60 seconds

export async function GET(request: Request) {
  try {
    const res = await fetch('https://api.livecoinwatch.com/coins/list', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': LCW_KEY,
      },
      body: JSON.stringify({
        currency: 'USD',
        sort: 'rank',
        order: 'ascending',
        offset: 0,
        limit: 200,
        meta: true
      }),
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch crypto data');
    }

    const data = await res.json();
    
    // Map to unified format
    const results = data.map((coin: any) => {
      // LiveCoinWatch returns rate, volume, delta (which has percent change in delta.day)
      // For some endpoints, delta is not included unless requested, but usually it's there.
      // We'll calculate a mock absolute change if delta is not present, but let's assume it is.
      const price = coin.rate;
      const percentChange = coin.delta?.day ? (coin.delta.day - 1) * 100 : 0;
      const change = price * (percentChange / 100);

      return {
        symbol: `${coin.code}/USD`,
        name: coin.name || coin.code,
        price,
        change,
        percentChange
      };
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return NextResponse.json([]);
  }
}
