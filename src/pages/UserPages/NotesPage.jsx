import Button from '../../components/UI/Button';
import Heading from '../../components/UI/Heading';
import Menu from '../../components/UI/Menu';
import Notes from '../../features/Notes/Notes';
import { PiExportBold } from 'react-icons/pi';

const NotesPage = () => {
  return (
    <div className="full-height bg-white px-6 lg:ml-8">
      <div className="flex flex-wrap items-center gap-3 py-8">
        <Heading>Notes</Heading>
        <div className="relative ml-auto">
          <Menu>
            <Menu.Toggle>
              <Button
                variant="outlined"
                className="flex items-center gap-3 text-primary-400"
              >
                <PiExportBold />
                <span>Export </span>
              </Button>
            </Menu.Toggle>
            <Menu.List>
              <li>
                <button className="w-full px-2 py-3 hover:bg-primary-100">
                  Export to spread sheet
                </button>
              </li>
              <li>
                <button className="w-full px-2 py-3 hover:bg-primary-100">
                  Export to document
                </button>
              </li>
            </Menu.List>
          </Menu>
        </div>
      </div>
      <Notes />
    </div>
  );
};

export default NotesPage;
