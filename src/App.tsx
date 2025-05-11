import { useEffect } from "react";
import { convert } from "@/lib/core/convert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { NamingType } from "@/enums/naming-type.enum";
import { ControllerRenderProps, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { typeOptions } from "@/lib/master";
import { Separator } from "./components/ui/separator";
import { Checkbox } from "./components/ui/checkbox";
import { Button } from "./components/ui/button";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ArrowRightLeftIcon, CopyIcon } from "lucide-react";
import { autoFormatInput } from "./lib/core/input";
import FormTypeSelection from "./components/form-type-selection";
import FormTextarea from "./components/common/form/textarea";

function App() {
  const formSchema = z.object({
    inputType: z.nativeEnum(NamingType),
    outputType: z.nativeEnum(NamingType),
    inputText: z.string(),
    outputText: z.string(),
  });

  const typeSelectionFormSchema = z.object({
    selected: z.array(z.nativeEnum(NamingType)),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputType:
        (localStorage.getItem("input_type") as NamingType) || NamingType.KEBAB,
      outputType:
        (localStorage.getItem("output_type") as NamingType) || NamingType.CAMEL,
      inputText: "",
      outputText: "",
    },
  });

  const typeSelectForm = useForm<z.infer<typeof typeSelectionFormSchema>>({
    resolver: zodResolver(typeSelectionFormSchema),
    defaultValues: {
      selected: (JSON.parse(
        localStorage.getItem("selected_type") || "null"
      ) as NamingType[]) || [NamingType.KEBAB, NamingType.CAMEL],
    },
  });

  // variable and master data

  const inputType = useWatch({ name: "inputType", control: form.control });
  const outputType = useWatch({ name: "outputType", control: form.control });
  const inputText = useWatch({ name: "inputText", control: form.control });
  const outputText = useWatch({ name: "outputText", control: form.control });

  const selected = useWatch({
    name: "selected",
    control: typeSelectForm.control,
  });

  const selectedOptions = typeOptions.filter((option) =>
    selected.includes(option.value)
  );

  const inputOptions = [
    { value: NamingType.AUTO, text: "Auto" },
    ...selectedOptions,
  ];

  // main convert function

  useEffect(() => {
    const input = autoFormatInput(inputType, inputText);
    const output = convert(input, inputType, outputType);

    form.setValue("inputText", input);
    form.setValue("outputText", output);

    localStorage.setItem("input_type", inputType);
    localStorage.setItem("output_type", outputType);
  }, [inputType, outputType, inputText, form]);

  // handle function

  function handleSwapType() {
    const input_type = form.getValues("inputType");
    const input_text = form.getValues("inputText");
    const output_type = form.getValues("outputType");
    const output_text = form.getValues("outputText");

    form.setValue("inputType", output_type);
    form.setValue("inputText", output_text);
    form.setValue("outputType", input_type);
    form.setValue("outputText", input_text);
  }

  function handleSelectTypeCheckbox(
    checked: CheckedState,
    field: ControllerRenderProps<{ selected: NamingType[] }, "selected">,
    item: (typeof typeOptions)[0]
  ) {
    let value: NamingType[] | null = null;

    if (checked) {
      value = [...field.value, item.value];
      localStorage.setItem("selected_type", JSON.stringify(value));
      return field.onChange(value);
    }

    // if not checked

    const newButtonValue = selectedOptions.filter(
      (opt) => opt.value !== outputType && opt.value !== inputType
    );
    const newValue = field.value?.filter((value) => value !== item.value);

    if (inputType === item.value) {
      form.setValue("inputType", newButtonValue[0].value);
      value = newValue;
    } else if (outputType === item.value) {
      form.setValue("outputType", newButtonValue[0].value);
      value = newValue;
    } else {
      value = newValue;
    }

    localStorage.setItem("selected_type", JSON.stringify(value));
    return field.onChange(value || []);
  }

  function handleSelectAllType() {
    const selected = typeOptions.map((t) => t.value);
    typeSelectForm.setValue("selected", selected);
    localStorage.setItem("selected_type", JSON.stringify(selected));
  }

  function handleClearInput() {
    form.setValue("inputText", "");
    form.setValue("outputText", "");
  }

  function handleCopy() {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
    }
  }

  return (
    <div className="px-6 pt-24 pb-6 min-h-[calc(100vh-56px)]">
      <h1 className="text-xl font-bold text-center">
        Variable Convention Converter
      </h1>

      <div className="container mx-auto mt-6 lg:mt-12 flex gap-8 flex-col lg:flex-row">
        <div className="w-full">
          <Form {...form}>
            <form className="flex flex-col gap-6 lg:gap-12">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end gap-4">
                  <FormTypeSelection
                    form={form}
                    name="inputType"
                    label="Form"
                    disabledValue={outputType}
                    items={inputOptions}
                  />
                  <Button
                    disabled={inputType === NamingType.AUTO}
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSwapType();
                    }}
                  >
                    <ArrowRightLeftIcon />
                  </Button>
                </div>

                <FormTextarea
                  form={form}
                  name="inputText"
                  placeholder="Input Text (One line per name)"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end gap-4">
                  <FormTypeSelection
                    form={form}
                    name="outputType"
                    label="To"
                    disabledValue={inputType}
                    items={selectedOptions}
                  />
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopy();
                    }}
                  >
                    <CopyIcon />
                  </Button>
                </div>

                <FormTextarea
                  form={form}
                  name="outputText"
                  placeholder="Converted Text"
                />
              </div>
            </form>
          </Form>
        </div>

        <Separator
          orientation="vertical"
          className="hidden lg:block !h-[inherit]"
        />

        <div className="lg:w-1/5 min-w-48">
          <p className="text-center font-bold">Select Type</p>
          <Form {...typeSelectForm}>
            <form className="mt-6 lg:mt-12 flex flex-col lg:justify-center">
              <FormField
                control={typeSelectForm.control}
                name="selected"
                render={() => (
                  <FormItem className="grid grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-3">
                    {typeOptions.map((item) => (
                      <FormField
                        key={item.value}
                        control={typeSelectForm.control}
                        name="selected"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.value}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  disabled={
                                    selected.length < 3 &&
                                    selected.includes(item.value)
                                  }
                                  checked={field.value?.includes(item.value)}
                                  onCheckedChange={(checked) =>
                                    handleSelectTypeCheckbox(
                                      checked,
                                      field,
                                      item
                                    )
                                  }
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.text}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </FormItem>
                )}
              />
              <div className="mt-8">
                <Button
                  variant="outline"
                  className="w-full !border-foreground"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectAllType();
                  }}
                >
                  Select All
                </Button>
                <Button
                  variant="outline-destructive"
                  className="w-full mt-4"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClearInput();
                  }}
                >
                  Clear Input
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
