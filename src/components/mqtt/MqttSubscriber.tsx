import { Button, Stack, TextField, Typography } from "@mui/material";

interface Props {
  topic: string;
  onTopicChange: (value: string) => void;
  onSubscribe: () => void;
}

const MqttSubscriber: React.FC<Props> = ({
  topic,
  onTopicChange,
  onSubscribe,
}) => (
  <>
    <Typography variant="subtitle1">Subscriber</Typography>

    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Subscribe Topic"
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        fullWidth
      />
      <Button variant="outlined" onClick={onSubscribe}>
        Subscribe
      </Button>
    </Stack>
  </>
);

export default MqttSubscriber;
