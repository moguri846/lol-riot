import { ComponentMeta, ComponentStory } from "@storybook/react";
import SearchSummonerInputForm from "./SearchSummonerInputForm";

export default {
  title: "MOLECULES/SearchSummonerInputForm",
} as ComponentMeta<typeof SearchSummonerInputForm>;

const Template: ComponentStory<typeof SearchSummonerInputForm> = (args) => <SearchSummonerInputForm {...args} />;

const Default = Template.bind({});
Default.args = {};

export { Default };
