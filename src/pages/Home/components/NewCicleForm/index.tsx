import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewCicleForm() {
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
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
        min={1}
        max={60}
        disabled={!task}
        {...register("minutesAmount", {
          valueAsNumber: true,
          required: true,
        })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
