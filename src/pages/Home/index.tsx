import { useState } from "react";
import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./style";

const newCicleFormValidationSchema = zod.object({
  task: zod
    .string()
    .min(3, "A tarefa deve ter no mínimo 3 caracteres!")
    .max(20, "A tarefa deve ter no máximo 20 caracteres!"),
  minutesAmount: zod
    .number()
    .min(5, "O intervalo precisa ser de no mínimo 5 minutos")
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

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
    };

    setCycles((state) => [...state, newCycle]); // Adiciona o novo ciclo no estado, estou usando a palavra state para representar o estado anterior
    setActiveCycleId(newCycle.id);

    reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); // Encontra o ciclo ativo

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // Calcula o total de segundos do ciclo ativo
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // Calcula os segundos atuais

  const minutes = Math.floor(currentSeconds / 60); // Calcula os minutos atuais, usamos o Math.floor para arredondar para baixo, pois não faz sentido exibir valores decimais
  const seconds = currentSeconds % 60; // Calcula os segundos atuais
  const minutesLeft = String(minutes).padStart(2, "0"); // Calcula os minutos restantes, usamos o padStart para preencher com 0 a esquerda caso o valor seja menor que 10
  const secondsLeft = String(seconds).padStart(2, "0"); // Calcula os segundos restantes, usamos o padStart para preencher com 0 a esquerda caso o valor seja menor que 10

  

  const task = watch("task");
  const minutesAmount = watch("minutesAmount");

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register("task", { required: true })}
          />

          <datalist id="task-suggestions">
            <option value="Estudar" />
            <option value="Trabalhar" />
            <option value="Ler" />
            <option value="Fazer exercícios" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", {
              valueAsNumber: true,
              required: true,
            })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutesLeft[0]}</span> {/* Pega o primeiro caractere dos minutos */}
          <span>{minutesLeft[1]}</span> {/* Pega o segundo caractere dos minutos */}
          <Separator>:</Separator>
          <span>{secondsLeft[0]}</span> {/* Pega o primeiro caractere dos segundos */}
          <span>{secondsLeft[1]}</span> {/* Pega o segundo caractere dos segundos */}
        </CountdownContainer>

        <StartCountdownButton disabled={!task || !minutesAmount} type="submit">
          <Play />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
