import { ReactNode } from "react";
import {
    Controller,
    Control,
    FieldError,
    FieldValues,
    Path,
} from "react-hook-form";
import { TextField, InputAdornment, TextFieldProps } from "@mui/material";

export type TextFieldGeneralProps<T extends FieldValues = FieldValues> = Props<T>;

interface Props<T extends FieldValues = FieldValues> {
    control: Control<T>;
    name: string;
    label?: string;
    disabled?: boolean;
    error?: FieldError;
    helperText?: string;
    required?: boolean;
    type?: string;
    showEndAdornment?: boolean;
    endAdornmentIcon?: ReactNode;
    variant?: TextFieldProps["variant"];
    size?: TextFieldProps["size"];
    sx?: TextFieldProps["sx"];
}

export const TextFieldGeneral = <T extends FieldValues = FieldValues>({
                                                                          control,
                                                                          name,
                                                                          label = "",
                                                                          disabled = false,
                                                                          error,
                                                                          helperText,
                                                                          required = false,
                                                                          type = "text",
                                                                          showEndAdornment = false,
                                                                          endAdornmentIcon,
                                                                          variant = "outlined",
                                                                          size = "small",
                                                                          sx,
                                                                      }: Props<T>) => (
    <Controller
        name={name as Path<T>}
        control={control}
        render={({ field }) => (
            <TextField
                {...field}
                variant={variant}
                size={size}
                type={type}
                label={label}
                required={required}
                margin="dense"
                disabled={disabled}
                error={!!error}
                helperText={helperText}
                fullWidth
                sx={sx}
                InputProps={{
                    endAdornment: showEndAdornment && endAdornmentIcon ? (
                        <InputAdornment position="end">
                            {endAdornmentIcon}
                        </InputAdornment>
                    ) : null,
                }}
            />
        )}
    />
);
