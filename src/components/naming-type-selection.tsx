import { NamingType } from "@/enums/naming-type.enum";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface NamingTypeSelectionProps {
  value: NamingType;
  disabledValue: NamingType;
  items: { value: NamingType; text: string }[];
  onChange: (value: NamingType) => void;
}

export function NamingTypeSelection({
  value,
  disabledValue,
  items,
  onChange,
}: NamingTypeSelectionProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const value = (e.target as HTMLButtonElement).value;

    onChange(value as NamingType);
  };

  return (
    <>
      <div className="block lg:hidden">
        <Select onValueChange={onChange} value={value}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                disabled={disabledValue === item.value}
              >
                {item.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden lg:flex flex-wrap gap-2">
        {items.map((item) => {
          return (
            <Button
              key={item.value}
              variant="outline"
              value={item.value}
              disabled={disabledValue === item.value}
              onClick={handleClick}
              className={cn(
                "min-w-30",
                value === item.value && "border-1 !border-foreground"
              )}
            >
              {item.text}
            </Button>
          );
        })}
      </div>
    </>
  );
}
