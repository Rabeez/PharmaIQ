import { Link } from "expo-router";
import { Text, Pressable, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { SearchRecord } from "@/utils/search";
import { Badge, BadgeText } from "./ui/badge";
import { HStack } from "./ui/hstack";

const CustomDivider = () => <Divider className="my-0.5" />;

function SearchHeader({ title }: { title: string }) {
  return <Heading className="my-1">{title}</Heading>;
}

function CustomListItem({ item }: { item: SearchRecord }) {
  return (
    <HStack className="w-full place-items-center align-middle">
      {item.type === "drug" ? (
        <Badge size="sm" variant="solid" className="bg-teal-300">
          <BadgeText>{item.type}</BadgeText>
        </Badge>
      ) : (
        <Badge size="sm" variant="solid" className="bg-orange-300">
          <BadgeText>{item.type}</BadgeText>
        </Badge>
      )}
      <Text className="text-lg">{item.name}</Text>
    </HStack>
  );
}

export function CustomList({
  results,
  title,
}: {
  results: SearchRecord[];
  title?: string;
}) {
  // TODO: "scroll-to-top" button visible automatically for long lists etc
  // https://youtu.be/pZgjlh5ezd4?si=pypM7_5kkBwy6Q2Z&t=683
  return (
    <FlashList
      data={results}
      estimatedItemSize={62}
      keyExtractor={(item, index) => `${item.type}-${item.name}-${index}`}
      renderItem={({ item, index }) => (
        <Link
          className="w-full"
          href={
            item.type === "drug"
              ? `/drug/${encodeURIComponent(item.name)}/info`
              : `/brand/${encodeURIComponent(item.name)}/forms`
          }
          asChild
        >
          <Pressable>
            <CustomListItem item={item} />
          </Pressable>
        </Link>
      )}
      ItemSeparatorComponent={CustomDivider}
      ListHeaderComponent={
        title ? () => <SearchHeader title={title} /> : undefined
      }
    />
  );
}
