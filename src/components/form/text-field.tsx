import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, type InputProps } from "@/components/ui/input";
import { type FieldValues, type Control, type FieldPath, ControllerRenderProps } from "react-hook-form";

type BasicInputProps = Omit<InputProps, keyof ControllerRenderProps>;

interface TextFieldProps<T extends FieldValues, U extends FieldPath<T> = FieldPath<T>> extends BasicInputProps {
   control: Control<T>;
   name: U;
   label?: React.ReactNode;
   containerProps?: React.HTMLAttributes<HTMLDivElement>
}

export default function TextField<T extends FieldValues>(props: TextFieldProps<T>) {
   const { label, control, name, containerProps = {}, ...inputProps } = props;

   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => (
            <FormItem {...containerProps}>
               {label && <FormLabel>{label}</FormLabel>}
               <FormControl>
                  <Input {...inputProps} {...field} />
               </FormControl>

               <FormMessage />
            </FormItem>
         )}
      />
   );
}
