import { useEffect, useState } from "react";
import { Pause, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { differenceInSeconds } from "date-fns";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./style";
import { NewCicleForm } from "./components/NewCicleForm";
import { Countdown } from "./components/Countdown";

const newCicleFormValidationSchema = zod.object({
  task: zod
    .string()
    .min(3, "A tarefa deve ter no mínimo 3 caracteres!")
    .max(20, "A tarefa deve ter no máximo 20 caracteres!"),
  minutesAmount: zod
    .number()
    .min(1, "O intervalo precisa ser de no mínimo 5 minutos")
    .max(60, "O intervalo precisa ser de no máximo 60 minutos"),
});

interface NewCycleFormData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null); // colocamos que ele pode ser string ou null pois quando não tiver nenhum ciclo ativo, ele não vai ter nenhum id
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0); // Contador de segundos passados

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); // Encontra o ciclo ativo

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // Calcula o total de segundos do ciclo ativo
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // Calcula os segundos atuais

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );
          setAmountSecondsPassed(totalSeconds);

          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000); // Executa a função a cada 1 segundo
    }
    return () => clearInterval(interval); // Limpa o intervalo quando o ciclo ativo for alterado
  }, [activeCycle, totalSeconds, activeCycleId]);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]); // Adiciona o novo ciclo no estado, estou usando a palavra state para representar o estado anterior
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);

    reset();
  }

  function handleStopCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  const minutes = Math.floor(currentSeconds / 60); // Calcula os minutos atuais, usamos o Math.floor para arredondar para baixo, pois não faz sentido exibir valores decimais
  const seconds = currentSeconds % 60; // Calcula os segundos atuais
  const minutesLeft = String(minutes).padStart(2, "0"); // Calcula os minutos restantes, usamos o padStart para preencher com 0 a esquerda caso o valor seja menor que 10
  const secondsLeft = String(seconds).padStart(2, "0"); // Calcula os segundos restantes, usamos o padStart para preencher com 0 a esquerda caso o valor seja menor que 10

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesLeft}:${secondsLeft} - ${activeCycle.task}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch("task");
  const minutesAmount = watch("minutesAmount");

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCicleForm />
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={() => handleStopCycle()}>
            <Pause />
            Finalizar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            type="submit"
            disabled={!task || !minutesAmount}
          >
            <Play />
            Iniciar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
