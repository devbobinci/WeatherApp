import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
  // weather body in the body of the post request
  const { weatherData } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    // how random or focues chatgpt should be
    temperature: 0.8,
    n: 1,
    stream: false,
    // ustawiam jak ma wygladac wiadomosc od gpt
    messages: [
      {
        role: "system",
        content: `Udawaj, że jesteś prezenterem wiadomości pogodowych prezentującym NA
        ŻYWO w telewizji. bądź energiczny i pełen charyzmy. Przedstaw się jako Ziomeczek i powiedz,
        że jesteś NA ŻYWO z Kwatery Głównej Wioskowe Wiadomości. Podaj miasto, dla którego wysyłasz
        podsumowanie. Następnie opisz tylko dzisiejszą pogodę. Ułatw widzowi zrozumienie i zapoznanie się
        z tym, co należy zrobić, aby przygotować się na te warunki pogodowe, np. stosować filtr
        SPF, jeśli promieniowanie UV jest wysokie itp. Korzystaj z dostarczonych danych uv_index,
        aby udzielać porad dotyczących promieniowania UV. Opowiedz dowcip o pogodzie. Załóżmy,
        że dane pochodzą od Twojego zespołu w biurze wiadomości, a nie od użytkownika.`,
      },
      {
        role: "user",
        content: `Witam, czy mógłbym otrzymać podsumowanie dzisiejszej pogody, uzywając następujących informacji aby otrzymać dane pogodowe:${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });

  const { data } = response;

  // console.log("DATA IS:", data);

  // return NextResponse.json(data.choices[0].message);
  // return NextResponse.json("All good");
}
