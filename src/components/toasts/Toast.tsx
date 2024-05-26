import Close from "@mui/icons-material/Close";
import {
  Alert,
  AlertColor,
  AlertTitle,
  IconButton,
  Slide,
  SlideProps,
  Snackbar,
} from "@mui/material";

interface ToastProps {
  open: boolean;
  onClose: () => void;
  severity: AlertColor;
  message: string;
  title?: string;
  autoHideDuration?: number;
}

const SlideDown = (props: SlideProps) => {
  return <Slide {...props} direction="down" />;
};

const Toast = (props: ToastProps) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={props.autoHideDuration ? props.autoHideDuration : null}
      TransitionComponent={SlideDown}
      onClose={props.onClose}
      transitionDuration={{ exit: 200, enter: 200}}
    >
      <Alert
        severity={props.severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={props.onClose}
          >
            <Close />
          </IconButton>
        }
        sx={{
          mb: 2,
          position: "fixed",
          top: 40,
          left: 10,
          right: 10,
          zIndex: 999,
        }}
      >
        {
          props.title &&
          <AlertTitle>
            {props.title}
          </AlertTitle>
        }
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
