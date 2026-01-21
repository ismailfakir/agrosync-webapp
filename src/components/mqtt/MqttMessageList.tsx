import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import { type MqttMessage } from "../../types";
import { SensorDataViewer } from "../SensorDataViewer";

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

  const sensoreData = function processJson(msg:string){
    return JSON.parse(msg)
  }

  return (
    <List dense sx={{ maxHeight: 250, overflow: "auto" }}>
      {messages.map((msg, index) => (
        <ListItem key={index} divider>
          <ListItemIcon>
            <MessageIcon color="primary" />
          </ListItemIcon>
          <SensorDataViewer data={sensoreData(msg.payload)}/>
        </ListItem>
      ))}
    </List>
  );
};

export default MqttMessageList;
