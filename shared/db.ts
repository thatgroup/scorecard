// Libraries
import { createClient, RedisClientType } from "redis";

import crypto from "crypto";

// Shared
import { log } from "./log";

const { REDIS_URL, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env || {};

const redisUrl =
  REDIS_URL || `redis://${REDIS_HOST}:${REDIS_PORT}?password=${REDIS_PASSWORD}`;

declare global {
  // eslint-disable-next-line no-var
  var __redis: RedisClientType | undefined;
}

export async function getRedisClient(): Promise<RedisClientType> {
  if (!global.__redis) {
    const client: RedisClientType = createClient({ url: redisUrl });
    global.__redis = client;
    client.on("error", (err) => console.log("Redis Client Error", err));
    client.on("ready", () => console.log("Redis conected"));
    process.on("SIGTERM", () => {
      console.log("SIGTERM received - closing Redis connection");
      client.quit();
    });
    await client.connect();
  }

  return global.__redis;
}

async function set(id: string, game: Game): Promise<"OK"> {
  const client = await getRedisClient();
  await client.set(`game-${id}`, JSON.stringify(game));
  return "OK";
}

async function get(id: string): Promise<Game | null> {
  const client = await getRedisClient();
  const reply = await client.get(`game-${id}`);
  return reply ? JSON.parse(reply) : null;
}

async function has(id: string): Promise<boolean> {
  const client = await getRedisClient();
  const reply = await client.exists(`game-${id}`);
  return reply === 1;
}

export async function getGame(id: string): Promise<Game | null> {
  return get(id);
}

export async function createGame(): Promise<string> {
  // Get a unique ID
  let id = crypto.randomUUID();
  while (await has(id)) {
    id = crypto.randomUUID();
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
