import { useContext } from "react";
import { CycleContext } from "../../contexts/CyclesContext";
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
            <tr>
              <td>Estudar React</td>
              <td>2 horas</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="yellow">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar React</td>
              <td>2 horas</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="red">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar React</td>
              <td>2 horas</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar React</td>
              <td>2 horas</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            
            

          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
