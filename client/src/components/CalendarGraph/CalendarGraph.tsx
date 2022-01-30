import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import { RootReducer } from "../../reducers";
import { Jandi } from "../../actions/interface/jandi.interface";
import moment from "moment";
import "./style.css";

const CalendarGraph = () => {
  const jandi = useSelector((state: RootReducer) => state.jandiReducer);

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
      return "color-github-0-30";
    } else if (winLose <= 50 && winLose > 30) {
      return "color-github-30-50";
    } else {
      return "color-github-50-100";
    }
  };

  const makeDate = (subtract: number) => {
    return moment().subtract(subtract, "days").format("YYYY-MM-DD");
  };

  return (
    <div style={{ height: "200px" }}>
      <div>
        <span>최근 19일 (CLASSIC게임만 적용)</span>
      </div>
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
