import { mapCategory } from "@/utils/categoryMapper";
import { Icon } from "./ui/icon";
import {
  Tablets,
  Pill,
  Milk,
  SprayCan,
  Droplet,
  Syringe,
  PillBottle,
  CircleSmall,
} from "lucide-react-native";

const componentsMap: Record<string, JSX.Element> = {
  tablets: <Icon as={Tablets} size="md" />,
  capsules: <Icon as={Pill} size="md" />,
  syrup: <Icon as={Milk} size="md" />,
  spray: <Icon as={SprayCan} size="md" />,
  drops: <Icon as={Droplet} size="md" />,
  injection: <Icon as={Syringe} size="md" />,
  tube: <Icon as={PillBottle} size="md" />,
  other: <Icon as={CircleSmall} size="md" />,
};

export function categoryIcon(originalCategory: string): JSX.Element {
  const mapped_category = mapCategory(originalCategory);
  return componentsMap[mapped_category];
}
