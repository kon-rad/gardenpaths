import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const EditorMenu = () => {
  return (
    <div className="flex flex-row w-full mb-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Export</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="cursor-pointer">
          <DropdownMenuLabel>HTML</DropdownMenuLabel>
          <DropdownMenuLabel>TXT</DropdownMenuLabel>
          <DropdownMenuLabel>PDF</DropdownMenuLabel>
          <DropdownMenuLabel>Markdown</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EditorMenu;
