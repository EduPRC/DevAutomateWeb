import React from "react";
import frameIA from "../assets/img/frameIA.png";
import frameAut from "../assets/img/frameAut.png";

const RecentTutorials = () => {
  return (
    <div className="recentCustomers">
      <div className="cardHeader">
        <h2>Últimos Tutoriais Assistidos</h2>
      </div>

      <table>
        <tr>
          <td width="60px">
            <div className="imgBx">
              <img src={frameIA} alt="Tutorial IA" width={350} height={200}/>
            </div>
          </td>
          <td>
            <h4>
              Tutorial de IA <br /> <span>Assistido em 04/03/2025</span>
            </h4>
          </td>
        </tr>

        <tr>
          <td width="60px">
            <div className="imgBx">
              <img src={frameAut} alt="Tutorial Automação" width={350} height={200}/>
            </div>
          </td>
          <td>
            <h4>
              Tutorial de Automação <br /> <span>Assistido em 06/03/2025</span>
            </h4>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default RecentTutorials;