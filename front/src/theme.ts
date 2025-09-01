import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    delete: true;
  }
}

export const theme = createTheme({
  palette: {
    background: {
      default: "#f0f2f5",   
      paper: "#fff",       
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          transition: theme.transitions.create(
            ["background-color", "background", "box-shadow", "transform", "color"],
            { duration: theme.transitions.duration.short, easing: theme.transitions.easing.easeInOut }
          ),
          willChange: "transform, box-shadow",
          "&.Mui-disabled": {
            transform: "none",
            boxShadow: "none",
          },
          "@media (prefers-reduced-motion: reduce)": {
            transition: "none",
          },
        }),
      },
      variants: [
        {
          props: { variant: "primary" },
          style: {
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(135deg, #1d4ed8, #1e40af)",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 10px rgba(37, 99, 235, 0.4)",
            },
            "&.Mui-disabled": {
              background: "linear-gradient(135deg, #93c5fd, #60a5fa)",
              color: "#e5e7eb",
              opacity: 0.7,
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            background: "linear-gradient(135deg, #6b7280, #4b5563)",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(135deg, #4b5563, #374151)",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 10px rgba(107, 114, 128, 0.4)",
            },
            "&.Mui-disabled": {
              background: "linear-gradient(135deg, #d1d5db, #9ca3af)",
              color: "#f3f4f6",
              opacity: 0.8,
            },
          },
        },
        {
          props: { variant: "delete" },
          style: {
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(135deg, #dc2626, #b91c1c)",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 10px rgba(239, 68, 68, 0.4)",
            },
            "&.Mui-disabled": {
              background: "linear-gradient(135deg, #f87171, #ef4444)",
              color: "#f3f4f6",
              opacity: 0.8,
            },
          },
        },
      ],
    },
  },
});