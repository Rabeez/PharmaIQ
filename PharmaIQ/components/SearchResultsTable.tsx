import { Link } from "expo-router";
import { Text, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";

const CustomDivider = () => <Divider className="my-0.5" />;
const SearchHeader = () => <Heading className="my-1">Search results</Heading>;

export function SearchResultsTable({ results }: { results: string[] }) {
  // TODO: "scroll-to-top" button visible automatically for long lists etc
  // https://youtu.be/pZgjlh5ezd4?si=pypM7_5kkBwy6Q2Z&t=683
  return (
    <FlashList
      data={results}
      renderItem={({ item, index }) => (
        <Link
          className="w-full"
          key={index}
          href={`/drug/${encodeURIComponent(item)}/info`}
          asChild
        >
          <Pressable>
            <Text>{item}</Text>
          </Pressable>
        </Link>
      )}
      ItemSeparatorComponent={CustomDivider}
      ListHeaderComponent={SearchHeader}
    />
  );
}
