"use client";

import { Card, Divider, Subtitle, Text } from "@tremor/react";

import CityPicker from "@/components/CityPicker";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#437843] to-[#0f301d] p-10 flex flex-col justify-center">
      <Card className="max-w-4xl mx-auto">
        <Text className="text-6xl font-bold text-center mb-6">Weather App</Text>
        <Subtitle className="text-xl text-center">
          Powered by Next.js 13.4, Tailwind CSS, Tremor 2.0 & Typescript
        </Subtitle>

        <Divider className="my-10" />

        <Card className="bg-gradient-to-br from-[#437843] to-[#0f301d]">
          <CityPicker />
        </Card>
      </Card>
    </div>
  );
}

const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};
