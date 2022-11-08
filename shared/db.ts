// Libraries
import { v4 } from "uuid";
import { createClient } from "redis";

// Shared
import { log } from "./log";

const { REDIS_URL, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env || {};

const redisUrl =
  REDIS_URL || `redis://${REDIS_HOST}:${REDIS_PORT}?password=${REDIS_PASSWORD}`;

const client = createClient({ url: redisUrl });

client.on("error", (error) => {
  console.error(error);
});

client.on("ready", () => {
  console.log("Redis conected");
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received - closing Redis connection");
  client.quit();
});

async function set(id: string, game: Game): Promise<"OK"> {
  await client.set(`game-${id}`, JSON.stringify(game));
  return "OK";
}

async function get(id: string): Promise<Game | null> {
  const reply = await client.get(`game-${id}`);
  return reply ? JSON.parse(reply) : null;
}

async function has(id: string): Promise<boolean> {
  const reply = await client.exists(`game-${id}`);
  return reply === 1;
}

export async function getGame(id: string): Promise<Game | null> {
  const game = await get(id);
  return game;
}

export async function createGame(): Promise<string> {
  // Get a unique ID
  let id = v4();
  while (await has(id)) {
    id = v4();
  }
  // Create the game and return the id
  log(`Creating Game ${id}`);
  await set(id, {
    players: [],
    scores: [],
  });

  return id;
}

export async function updateGame(id: string, updatedGame: Game): Promise<void> {
  if (await has(id)) {
    await set(id, updatedGame);
  } else {
    log(`Game not found: ${id}`);
  }
}
