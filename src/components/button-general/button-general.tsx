import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

export interface ButtonGeneralProps
    extends Omit<ButtonProps, "size" | "variant" | "onClick" | "color"> {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    size?: "small" | "medium" | "large";
    variant?: "text" | "contained" | "outlined";
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    sx?: ButtonProps["sx"];
    loading?: boolean;
    disabled?: boolean;
}

/**
 *
 * Botón de acción reutilizable para formularios y tablas.
 *
 * @example
 * <ButtonGeneral
 *   loading={true}
 *   size="small"
 *   variant="contained"
 *   color="primary"
 *   startIcon={<Save />}
 *   onClick={handleSave}
 *   sx={{ backgroundColor: "#1976d2" }}
 *   type="submit"
 *   form="my-form"
 * >
 *   Guardar
 * </ButtonGeneral>
 */
export const ButtonGeneral = ({
                                  startIcon,
                                  endIcon,
                                  size = "medium",
                                  variant = "contained",
                                  color = "primary",
                                  onClick,
                                  sx,
                                  loading = false,
                                  disabled = false,
                                  children,
                                  ...props
                              }: ButtonGeneralProps) => (
    <Button
        startIcon={startIcon}
        endIcon={endIcon}
        size={size}
        variant={variant}
        color={color}
        onClick={onClick}
        sx={sx}
        disabled={disabled}
        {...props}
    >
        {loading ? <CircularProgress size={18} /> : children}
    </Button>
);
