import UserSection from "./components/UserSection";
import HealthLogSection from "./components/HealthLogSection";
import FamilySection from "./components/FamilySection";
import ReminderSection from "./components/ReminderSection";

import "./App.css";

function App() {

  return (

    <div>

      <h1>HouseHealth</h1>

      <UserSection />

      <HealthLogSection />

      <FamilySection />

      <ReminderSection />

    </div>

  );

}

export default App;