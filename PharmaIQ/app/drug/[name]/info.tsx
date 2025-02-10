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
  return (
    <View>
      <Accordion
        size="md"
        variant="unfilled"
        type="single"
        isCollapsible={false}
        isDisabled={false}
        defaultValue={["a"]}
        className="border border-outline-200"
      >
        <AccordionItem value="a">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>Overview</AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText>{item?.OVERVIEW}</AccordionContentText>
          </AccordionContent>
        </AccordionItem>
        <Divider className="bg-slate-500" />
        <AccordionItem value="b">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>Characteristics</AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText>{item?.CHARACTERSTICS}</AccordionContentText>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}
