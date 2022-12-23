import { useContext } from "react";
import { CycleContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"
import { HistoryContainer, HistoryList, Status } from "./style";

export function History() {
  const { cycles } = useContext(CycleContext);

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>{formatDistanceToNow(cycle.startDate, {
                  addSuffix: true, locale: ptBR
                })}</td>
                <td>
                  {(cycle.finishedDate && (
                    <Status statusColor="green">Concluído</Status>
                  )) ||
                    (cycle.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )) || <Status statusColor="yellow">Em andamento</Status>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
