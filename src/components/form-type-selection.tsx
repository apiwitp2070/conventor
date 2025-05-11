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
import { FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { ComponentPropsWithoutRef } from "react";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";

interface NamingTypeSelectionProps {
  value: NamingType;
  disabledValue: NamingType;
  items: { value: NamingType; text: string }[];
  onChange: (value: NamingType) => void;
}

type SelectProps = Omit<ComponentPropsWithoutRef<typeof Select>, "form">;

interface FormTypeSelectionProps<T extends FieldValues> extends SelectProps {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  disabledValue: NamingType;
  items: { value: NamingType; text: string }[];
}
export default function FormTypeSelection<T extends FieldValues>({
  form,
  name,
  label,
  disabledValue,
  items,
}: FormTypeSelectionProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mt-2">
          <FormLabel className="mb-2 font-bold">{label}</FormLabel>
          <FormControl>
            <NamingTypeSelection
              value={field.value}
              disabledValue={disabledValue}
              items={items}
              onChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
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
