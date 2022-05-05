import { ComponentMeta, ComponentStory } from "@storybook/react";
import Button from "./Button";
import { IProps } from "./interface/Button.interface";

export default {
  title: "ATOMS/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const commonArgs: IProps = {
  label: "Button",
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

const Small = Template.bind({});
Small.args = {
  ...commonArgs,
  size: "sm",
};

const Medium = Template.bind({});
Medium.args = {
  ...commonArgs,
  size: "md",
};

const Large = Template.bind({});
Large.args = {
  ...commonArgs,
  size: "lg",
};

const Disabled = Template.bind({});
Disabled.args = {
  ...commonArgs,
  disabled: true,
  size: "sm",
};

export { Small, Medium, Large, Disabled };
