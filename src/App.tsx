import { Admin, Resource } from "react-admin";
import { People, Chat, School } from "@mui/icons-material";
import { Layout } from "./Layout";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";
import { Dashboard } from "./components/Dashboard";
import { UserList, UserShow, UserEdit } from "./resources/users";
import { ConversationList, ConversationShow } from "./resources/conversations";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard}
    title="Language Tutor Admin"
  >
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      edit={UserEdit}
      icon={People}
      options={{ label: "Users" }}
    />
    <Resource
      name="conversation_sessions"
      list={ConversationList}
      show={ConversationShow}
      icon={Chat}
      options={{ label: "Conversations" }}
    />
    <Resource
      name="learning_plans"
      list={() => <div>Learning Plans (Coming Soon)</div>}
      icon={School}
      options={{ label: "Learning Plans" }}
    />
  </Admin>
);
