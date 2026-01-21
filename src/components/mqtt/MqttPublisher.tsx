import {
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { type QoS } from "../../types";

interface Props {
  topic: string;
  payload: string;
  qos: QoS;
  disabled: boolean;
  onTopicChange: (v: string) => void;
  onPayloadChange: (v: string) => void;
  onQosChange: (v: QoS) => void;
  onPublish: () => void;
}

const MqttPublisher: React.FC<Props> = ({
  topic,
  payload,
  qos,
  disabled,
  onTopicChange,
  onPayloadChange,
  onQosChange,
  onPublish,
}) => (
  <>
    <Typography variant="subtitle1">Publisher</Typography>

    <Stack spacing={2}>
      <TextField
        label="Publish Topic"
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        fullWidth
      />

      <TextField
        label="Message Payload"
        value={payload}
        onChange={(e) => onPayloadChange(e.target.value)}
        multiline
        minRows={3}
        fullWidth
      />

      <Stack direction="row" spacing={2}>
        <TextField
          select
          label="QoS"
          value={qos}
          onChange={(e) => onQosChange(Number(e.target.value) as QoS)}
          sx={{ width: 120 }}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
        </TextField>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={onPublish}
          disabled={disabled}
        >
          Publish
        </Button>
      </Stack>
    </Stack>
  </>
);

export default MqttPublisher;
