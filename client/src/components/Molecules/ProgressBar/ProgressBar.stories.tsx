import { ComponentMeta, ComponentStory } from "@storybook/react";
import ProgressBar from "./ProgressBar";

export default {
  title: "MOLECULES/ProgressBar",
} as ComponentMeta<typeof ProgressBar>;

const mockPropsData = {
  title: "ProgressBar",
  players: [
    { value: Math.round(Math.random() * 10), champion: "" },
    { value: Math.round(Math.random() * 10), champion: "" },
  ],
};

const Template: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

const Default = Template.bind({});
Default.args = {
  ...mockPropsData,
};

export { Default };
