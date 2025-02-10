import { DrugDetails } from "@/utils/data_interface";
import { useDrugDetails } from "@/utils/DrugDetailsContext";
import { View } from "react-native";
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
  const detail = useDrugDetails();
  // TODO: show skeleton for whole page while deatail is null
  // via useQuery return values
  return (
    <View className="flex flex-1 p-2">
      <Content
        item={
          detail ?? {
            NAME: "<UNK>",
            OVERVIEW: "Loading...",
            CHARACTERSTICS: "Loading...",
          }
        }
      />
    </View>
  );
}

function Content({ item }: { item: DrugDetails | null }) {
  return <View>dosage</View>;
}
