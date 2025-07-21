import { streamUI, getMutableAIState, openai } from '@ai-sdk/rsc';
import { z } from 'zod';
import { Flights } from '../components/flights';
import { ClientMessage } from '../lib/ai/types';

const searchFlights = async (
  source: string,
  destination: string,
  date: string,
) => {
  return [
    {
      id: '1',
      flightNumber: 'AA123',
    },
    {
      id: '2', 
      flightNumber: 'AA456',
    },
  ];
};

const lookupFlight = async (flightNumber: string) => {
  return {
    flightNumber: flightNumber,
    departureTime: '10:00 AM',
    arrivalTime: '12:00 PM',
  };
};

export async function submitUserMessage(input: string): Promise<ClientMessage> {
  'use server';

  const aiState = getMutableAIState();
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content: input,
      id: Date.now().toString()
    }
  ]);

  const model = openai('gpt-3.5-turbo-instruct');

  const ui = await streamUI({
    model: model,
    system: 'you are a flight booking assistant', 
    prompt: input,
    text: async ({ content }) => <div>{content}</div>,
    tools: {
      searchFlights: {
        description: 'search for flights',
        parameters: z.object({
          source: z.string().describe('The origin of the flight'),
          destination: z.string().describe('The destination of the flight'),
          date: z.string().describe('The date of the flight'),
        }),
        generate: async function* ({ source, destination, date }) {
          yield `Searching for flights from ${source} to ${destination} on ${date}...`;
          const results = await searchFlights(source, destination, date);
          
          return (<Flights flights={results} />);
        },
      },
      lookupFlight: {
        description: 'lookup details for a flight',
        parameters: z.object({
          flightNumber: z.string().describe('The flight number'),
        }),
        generate: async function* ({ flightNumber }) {
          yield `Looking up details for flight ${flightNumber}...`;
          const details = await lookupFlight(flightNumber);

          return (
            <div>
              <div>Flight Number: {details.flightNumber}</div>
              <div>Departure Time: {details.departureTime}</div>
              <div>Arrival Time: {details.arrivalTime}</div>
            </div>
          );
        },
      },
    },
  });

  aiState.done([
    ...aiState.get(),
    {
      role: 'assistant',
      content: 'Responded to user message',
      id: Date.now().toString()
    }
  ]);

  return {
    id: Date.now().toString(),
    role: 'assistant',
    display: ui.value
  };
}
