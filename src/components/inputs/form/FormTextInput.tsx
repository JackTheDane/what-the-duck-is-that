import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";
import { TextInput, TextInputProps } from "../TextInput";

type FormTextInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T, any>;
} & Omit<TextInputProps, "onChange" | "value" | "ref">;

export const FormTextInput = <T extends FieldValues>({
  name,
  control,
  ...props
}: FormTextInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ...field } }) => <TextInput {...field} {...props} />}
    />
  );
};
