import { ComponentMeta, ComponentStory } from "@storybook/react";
import Input from "./Input";

export default {
  title: "ATOMS/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

const Default = Template.bind({});

Default.args = {};

export { Default };
