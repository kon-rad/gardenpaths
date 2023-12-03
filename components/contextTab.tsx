import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "tailwindcss/tailwind.css";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useGlobalState } from "@/lib/contexts/GlobalState";

const ContextTab = () => {
  const { context, setContext, style, setStyle } = useGlobalState();
  return (
    <Card className=" h-full">
      <CardHeader>
        <CardTitle>Context</CardTitle>
        <CardDescription>Configure your writing assistant</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label className="my-4" htmlFor="context">
          Context
        </Label>
        <Textarea
          className="mb-4"
          placeholder="Context for the text"
          id="context"
          value={context}
          onChange={(e: any) => setContext(e.target.value)}
        />
        <Label className="my-4" htmlFor="style">
          Style
        </Label>
        <Textarea
          className="mb-4"
          placeholder="Type your style here."
          id="style"
          value={style}
          onChange={(e: any) => setStyle(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
};

export default ContextTab;
