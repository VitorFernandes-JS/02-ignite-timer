import { CountdownContainer, Separator } from "./styles";

export function Countdown() {
  return (
    <CountdownContainer>
      <span>{minutesLeft[0]}</span>{" "}
      {/* Pega o primeiro caractere dos minutos */}
      <span>{minutesLeft[1]}</span> {/* Pega o segundo caractere dos minutos */}
      <Separator>:</Separator>
      <span>{secondsLeft[0]}</span>{" "}
      {/* Pega o primeiro caractere dos segundos */}
      <span>{secondsLeft[1]}</span>{" "}
      {/* Pega o segundo caractere dos segundos */}
    </CountdownContainer>
  );
}
