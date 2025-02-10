import { BrandDetails } from "@/utils/data_interface";
import { useBrandDetails } from "@/utils/BrandDetailsContext";
import { View, Text, ScrollView } from "react-native";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContentText,
  AccordionIcon,
  AccordionContent,
} from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import { ChevronUpIcon, ChevronDownIcon } from "@/components/ui/icon";

export default function Page() {
  const detail = useBrandDetails();
  // TODO: show skeleton for whole page while deatail is null
  // via useQuery return values
  if (!detail || !detail.FORMS) {
    return (
      <View className="flex flex-1 p-2">
        <Text>MISSING FORMS</Text>
      </View>
    );
  }
  return (
    <View className="flex flex-1 p-2">
      <Content item={detail} />
    </View>
  );
}

function Content({ item }: { item: BrandDetails }) {
  return (
    <ScrollView>
      <Accordion
        size="md"
        variant="unfilled"
        type="multiple"
        isCollapsible={true}
        isDisabled={false}
        className="border border-outline-200"
      >
        {Object.entries(item.FORMS).map(([key, value]) => {
          return (
            <>
              <Text>{key}</Text>
              {Object.entries(value).map(([_, val]) => (
                <Text>{val}</Text>
              ))}
            </>
          );
        })}
      </Accordion>
    </ScrollView>
  );
}
