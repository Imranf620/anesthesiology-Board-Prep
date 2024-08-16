import Heading from "../../components/UI/Heading";
import Settings from "../../features/Settings/Settings";

const SettingsPage = () => {
  return (
    <section className="p-10">
      <div>
        <Heading>Settings</Heading>
      </div>
      <Settings />
    </section>
  );
};

export default SettingsPage;
