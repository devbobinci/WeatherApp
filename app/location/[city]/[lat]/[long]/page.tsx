import { getClient } from "@/apollo-client";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";

import {
  CalloutCard,
  HumidityChart,
  InformationPanel,
  RainChart,
  StatCard,
  TempChart,
} from "@/components";

const greet = require("greet-by-time");

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

export const revalidate = 600;

export default async function WeatherPage({
  params: { city, lat, long },
}: Props) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      latitude: lat,
      longitude: long,
      timezone: "GMT",
    },
  });

  const results: Root = await data.myQuery;

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <InformationPanel lat={lat} long={long} results={results} city={city} />

      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at:{" "}
              {new Date().getHours() + ":" + new Date().getMinutes()}
            </p>
          </div>

          <div className="m-2 mb-10">
            <CalloutCard message={greet("human", new Date().getHours())} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`}
              color="yellow"
            />
            <StatCard
              title="Minimum Temperature"
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`}
              color="emerald"
            />

            <div>
              <StatCard
                title="UV Index"
                color="rose"
                metric={results.daily.uv_index_max[0].toFixed(1)}
              />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message="The UV is high today, be sure to wear SPF"
                  warning
                />
              )}
            </div>

            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                color="cyan"
                metric={`${results.current_weather.windspeed.toFixed(1)}m/s`}
              />
              <StatCard
                title="Wind Direction"
                color="violet"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
              />
            </div>
          </div>
        </div>

        <hr className="mb-5" />

        <div className="space-y-3">
          <TempChart results={results} />
          <RainChart results={results} />
          <HumidityChart results={results} />
        </div>
      </div>
    </div>
  );
}
