import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableData,
} from "@/components/ui/table";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export function SearchResultsTable({ results }: { results: string[] }) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Author</TableHead>
          <TableHead>Tags</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((obj, idx) => (
          <Link
            className="w-full"
            key={idx}
            href={`/item/${encodeURIComponent(obj)}`}
            asChild
          >
            <Pressable>
              <TableRow key={idx}>
                <TableData>{obj}</TableData>
                {/* <TableData>{obj.tags.join(", ")}</TableData> */}
              </TableRow>
            </Pressable>
          </Link>
        ))}
      </TableBody>
    </Table>
  );
}
