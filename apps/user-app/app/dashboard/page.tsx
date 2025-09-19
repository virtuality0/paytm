import AppSidebar from "@/components/AppSidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  SelectTrigger,
  Separator,
  Select,
  SelectValue,
  SelectItem,
  SelectContent,
  Button,
} from "@repo/ui";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <div className="flex flex-col px-4 py-2 grow">
        <h1 className="text-2xl font-bold text-white">Transfer</h1>
        <Card className="bg-gray-100 text-white">
          <CardHeader>
            <CardTitle>Add Money</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <label>Amount</label>
              <Input placeholder="amount" type="number" />
            </div>

            <div className="flex flex-col gap-2">
              <label>Bank</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HDFC">HDFC</SelectItem>
                  <SelectItem value="ICICI">ICICI</SelectItem>
                  <SelectItem value="Axis">Axis</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-100">Add Money</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
