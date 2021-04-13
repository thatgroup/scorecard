// Libraries
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";

// Shared
import { MAX_PLAYER_NAME_LENGTH } from "../shared/constants";

interface Props {
  player: string;
  number: number;
  disabled: boolean;
  invalid?: boolean;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}
export function NameInput({
  player,
  number,
  disabled,
  invalid = false,
  onChange,
}: Props): JSX.Element {
  const theme = useTheme();

  const textInput = css`
    display: block;

    width: 100%;

    font-size: 2em;
    font-family: proxima-nova;
    background: transparent;
    border: none;

    color: ${invalid ? theme.colours.pink : theme.colours.foreground};
    transition: color 300ms;

    ::placeholder {
      color: ${theme.colours.muted};
      opacity: 1; /* Firefox */
    }
  `;

  return (
    <input
      type="text"
      autoComplete="off"
      autoCapitalize="words"
      id={`player-${number}-name-input`}
      aria-label={`Player ${number} name`}
      placeholder={`Player ${number}`}
      value={player}
      disabled={disabled}
      className={textInput}
      maxLength={MAX_PLAYER_NAME_LENGTH}
      onChange={onChange}
    />
  );
}
