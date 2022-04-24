import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ILineWinLoseRate } from "../../../_actions/riot/interface/lineWinOrLose.interface";
import BarGraph from "./BarGraph";

export default {
  title: "MOLECULES/BarGraph",
  component: BarGraph,
  decorators: [(story) => <div style={{ width: "380px" }}>{story()}</div>],
} as ComponentMeta<typeof BarGraph>;

const lines = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];

const mockPropsData: ILineWinLoseRate[] = [...Array(5)].map((arg, idx) => {
  const appendValues = {
    line: lines[idx],
    win: Math.round(Math.random() * 10),
    lose: Math.round(Math.random() * 10),
  };

  return appendValues;
});

const Template: ComponentStory<typeof BarGraph> = (args) => <BarGraph {...args} />;

const Default = Template.bind({});
Default.args = {
  lineWinOrLose: mockPropsData,
};

export { Default };
