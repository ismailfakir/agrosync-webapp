import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import { type MqttMessage } from "../../types";

interface Props {
  messages: MqttMessage[];
}

const MqttMessageList: React.FC<Props> = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Waiting for messages...
      </Typography>
    );
  }

  return (
    <List dense sx={{ maxHeight: 250, overflow: "auto" }}>
      {messages.map((msg, index) => (
        <ListItem key={index} divider>
          <ListItemIcon>
            <MessageIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={msg.payload}
            secondary={`${msg.topic} • ${msg.time}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default MqttMessageList;
