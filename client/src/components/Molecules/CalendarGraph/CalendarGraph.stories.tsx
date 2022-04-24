import { ComponentMeta, ComponentStory } from "@storybook/react";
import moment from "moment";
import CalendarGraph from "./CalendarGraph";

export default {
  title: "MOLECULES/CalendarGraph",
  component: CalendarGraph,
  decorators: [(story) => <div style={{ width: "380px" }}>{story()}</div>],
} as ComponentMeta<typeof CalendarGraph>;

const mockPropsData = [...Array(20)].map(function (arg, idx) {
  const win = Math.round(Math.random() * 10);
  const lose = Math.round(Math.random() * 10);

  const appendValues = {
    date: moment().subtract(idx, "days").format("YYYY-MM-DD"),
    win,
    lose,
    count: win + lose,
  };

  return appendValues;
});

const Template: ComponentStory<typeof CalendarGraph> = (args) => <CalendarGraph {...args} />;

const Default = Template.bind({});
Default.args = {
  jandi: mockPropsData,
};

export { Default };
