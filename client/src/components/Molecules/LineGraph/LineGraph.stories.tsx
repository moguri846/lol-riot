import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IProps } from "./interface/LineGraph.interface";
import LineGraph from "./LineGraph";

export default {
  title: "MOLECULES/LineGraph",
  component: LineGraph,
  decorators: [(story) => <div style={{ width: "380px" }}>{story()}</div>],
} as ComponentMeta<typeof LineGraph>;

const mockPropsData: any = [...Array(Math.round(Math.random() * 30) + 15)].map((arg, idx) => {
  const appendValues = {
    player: {
      totalGold: Math.round(Math.random() * 1000) + idx * 500,
      totalCs: Math.round(Math.random() * 3) + idx * 5,
      xp: Math.round(Math.random() * 1000) + idx * 500,
    },
    enemy: {
      totalGold: Math.round(Math.random() * 1000) + idx * 400,
      totalCs: Math.round(Math.random() * 3) + idx * 4,
      xp: Math.round(Math.random() * 1000) + idx * 400,
    },
  };
  return appendValues;
});

const commonArgs: IProps = {
  loading: false,
  timeline: mockPropsData,
  option: "totalGold",
};

const Template: ComponentStory<typeof LineGraph> = (args) => <LineGraph {...args} />;

const Default = Template.bind({});
Default.args = {
  ...commonArgs,
};

const Loading = Template.bind({});
Loading.args = {
  ...commonArgs,
  loading: true,
};

export { Default, Loading };
