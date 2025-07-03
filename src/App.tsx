import { Admin, Resource } from "react-admin";
import { 
  People, 
  Chat, 
  School, 
  BarChart, 
  EmojiEvents, 
  Assessment,
  Notifications
} from "@mui/icons-material";
import { Layout } from "./Layout";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";
import { Dashboard } from "./components/Dashboard";
import { UserList, UserShow, UserEdit, UserCreate } from "./resources/users";
import { ConversationList, ConversationShow } from "./resources/conversations";
import { UserStatsList } from "./resources/user-stats";
import { BadgesList } from "./resources/badges";
import { AssessmentHistoryList } from "./resources/assessment-history";
import { LearningPlansList } from "./resources/learning-plans";
import { NotificationList, NotificationCreate, NotificationShow } from "./resources/notifications";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard}
    title="My Taco AI Admin Panel - v3.1"
  >
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      edit={UserEdit}
      create={UserCreate}
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
      name="user_stats"
      list={UserStatsList}
      icon={BarChart}
      options={{ label: "User Statistics" }}
    />
    <Resource
      name="badges"
      list={BadgesList}
      icon={EmojiEvents}
      options={{ label: "Badge System" }}
    />
    <Resource
      name="assessment_history"
      list={AssessmentHistoryList}
      icon={Assessment}
      options={{ label: "Assessment History" }}
    />
    <Resource
      name="learning_plans"
      list={LearningPlansList}
      icon={School}
      options={{ label: "Learning Plans" }}
    />
    <Resource
      name="notifications"
      list={NotificationList}
      create={NotificationCreate}
      show={NotificationShow}
      icon={Notifications}
      options={{ label: "Notification Center" }}
    />
  </Admin>
);
// Force rebuild - Notification Center deployment - Fri Jan 3 15:32:52 CET 2025
// Added notification resource with proper imports and configuration
