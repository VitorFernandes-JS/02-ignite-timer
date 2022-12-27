import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CycleContext } from "../../../../contexts/CyclesContext";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CycleContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // Calcula o total de segundos do ciclo ativo

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000); // Executa a função a cada 1 segundo
    }
    return () => clearInterval(interval); // Limpa o intervalo quando o ciclo ativo for alterado
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished]);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // Calcula os segundos atuais
  const minutes = Math.floor(currentSeconds / 60); // Calcula os minutos atuais, usamos o Math.floor para arredondar para baixo, pois não faz sentido exibir valores decimais
  const seconds = currentSeconds % 60; // Calcula os segundos atuais
  const minutesLeft = String(minutes).padStart(2, "0"); // Calcula os minutos restantes, usamos o padStart para preencher com 0 a esquerda caso o valor seja menor que 10
  const secondsLeft = String(seconds).padStart(2, "0"); // Calcula os segundos restantes, usamos o padStart para preencher com 0 a esquerda caso o valor seja menor que 10

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesLeft}:${secondsLeft} - ${activeCycle.task}`;
    }
  }, [minutes, seconds, activeCycle]);

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
