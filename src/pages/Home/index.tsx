import { Pause, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./style";
import { NewCicleForm } from "./components/NewCycleForm";
import * as zod from "zod";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CycleContext } from "../../contexts/CyclesContext";
import { useContext } from "react";

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

export function Home() {
  const { createNewCycle, activeCycle, interruptCurrentCycle } = useContext(CycleContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: "",
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch("task");
  const minutesAmount = watch("minutesAmount");

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCicleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={() => interruptCurrentCycle()}>
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
