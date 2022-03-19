import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import { Jandi } from "../../../_actions/riot/interface/jandi.interface";
import moment from "moment";
import "./style.css";

interface IProps {
  jandi: Jandi[];
}

const CalendarGraph = ({ jandi }: IProps) => {
  const getTooltipDataAttrs = (value: any) => {
    if (value.date && value.count) {
      let winLose = (value.win / (value.win + value.lose)) * 100;
      return {
        "data-tip": `${value.date} 승: ${value.win} 패: ${value.lose} 승률: ${winLose.toFixed(0)}%`,
      };
    }
    return {
      "data-tip": ` ${value.date} `,
    };
  };

  const classForValue = (jandi: Jandi) => {
    if (jandi === null || jandi.count === 0) {
      return "color-empty";
    }

    let winLose = (jandi.win / (jandi.win + jandi.lose)) * 100;

    if (winLose <= 30) {
      return "win-rate-0-30";
    } else if (winLose <= 50 && winLose > 30) {
      return "win-rate-30-50";
    } else {
      return "win-rate-50-100";
    }
  };

  const makeDate = (subtract: number) => {
    return moment().subtract(subtract, "days").format("YYYY-MM-DD");
  };

  return (
    <div style={{ height: "200px" }}>
      <CalendarHeatmap
        startDate={makeDate(20)}
        endDate={makeDate(0)}
        values={jandi}
        classForValue={(jandi: Jandi) => classForValue(jandi)}
        tooltipDataAttrs={(value: any) => getTooltipDataAttrs(value)}
      />
      <ReactTooltip />
    </div>
  );
};

export default CalendarGraph;
