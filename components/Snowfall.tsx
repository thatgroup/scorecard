// Libraries
import { useCallback, useEffect, useState } from "react";

// Components
import { Props as SnowflakeProps, Snowflake } from "./Snowflake";

const defaultTtl = 10000;
const creationRate = 1000;
const varySnowflakeSpeed = true;

let counter = 0;

export function Snowfall(): JSX.Element {
  const [flakes, setFlakes] = useState<SnowflakeProps[]>([]);

  // Add a snowflake to the end of the array and return the props used
  const addSnowflake = useCallback(() => {
    const id = (counter++).toString();

    // e.g. given a ttl of 10s, it will vary anywhere between 5s and 15s
    const ttl = varySnowflakeSpeed
      ? defaultTtl + (Math.random() - 0.5) * (defaultTtl / 2)
      : defaultTtl;

    const newSnowflake: SnowflakeProps = {
      id,
      x: Math.random() * 100,
      ttl,
    };
    setFlakes((flakes) => [...flakes, newSnowflake]);
    return newSnowflake;
  }, []);

  // Remove a snowflake from the list
  const removeSnowflake = useCallback((id: string) => {
    setFlakes((flakes) => flakes.filter((flake) => flake.id !== id));
  }, []);

  useEffect(() => {
    // Store timeouts which remove the snow flakes
    const timeouts: number[] = [];

    // Every Xms, add a new snowflake and set a timeout which removes it
    const interval = window.setInterval(() => {
      const { id, ttl } = addSnowflake();
      timeouts.push(
        window.setTimeout(() => {
          removeSnowflake(id);
        }, ttl)
      );
    }, creationRate);

    //  Clean everything up
    return () => {
      window.clearInterval(interval);
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [addSnowflake, removeSnowflake]);

  return (
    <>
      {flakes.map((flake) => (
        <Snowflake key={flake.id} {...flake} />
      ))}
    </>
  );
}
