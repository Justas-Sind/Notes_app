import { useState, useMemo, Fragment } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  deleteTag: (id: string) => void;
  updateTag: (id: string, label: string) => void;
};

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  availableTags: Tag[];
  deleteTag: (id: string) => void;
  updateTag: (id: string, label: string) => void;
};

function NoteList({
  availableTags,
  notes,
  deleteTag,
  updateTag,
}: NoteListProps) {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  let [modalIsOpen, setModalIsOpen] = useState(false);

  function closeModal() {
    setModalIsOpen(false);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-slate-900">Notes</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/new")}
            className="rounded-full bg-purple-400 py-2 px-5 text-sm font-semibold leading-5 text-white transition-all duration-300 hover:bg-purple-500 focus:outline-none focus:ring focus:ring-purple-300 active:bg-purple-600"
          >
            Create
          </button>
          <button
            onClick={() => openModal()}
            className="rounded-full bg-purple-400 py-2 px-5 text-sm font-semibold leading-5 text-white transition-all duration-300 hover:bg-purple-500 focus:outline-none focus:ring focus:ring-purple-300 active:bg-purple-600"
          >
            Edit Tags
          </button>
        </div>
      </div>
      <form className="mt-2">
        <div>
          <div>
            <label className="flex flex-col">
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-60 rounded focus:outline-none focus:ring focus:ring-violet-300"
              />
            </label>
          </div>
          <div>
            <label>
              Tags{" "}
              <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
                styles={{
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    color: state.isSelected ? "#0f172a" : "#0f172a",
                    backgroundColor: state.isSelected ? "#fff" : "#fff",
                    ':hover': {
                      backgroundColor: "#f3e8ff",
                    }
                  }),

                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "#fff",
                    padding: "0",
                    border: "none",
                    boxShadow: "none",
                    borderRadius: "0.25rem",
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "#fff",
                  }),
                }}
              />
            </label>
          </div>
        </div>
      </form>
      <div>
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            tags={note.tags}
          />
        ))}
      </div>
      <EditTagsModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        availableTags={availableTags}
        deleteTag={deleteTag}
        updateTag={updateTag}
      />
    </>
  );
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <div>
      <Link to={`/${id}`}>
        <div>
          <div>
            <p>{title} </p>
          </div>
          <div>
            {tags.length > 0 &&
              tags.map((tag) => (
                <div key={tag.id}>
                  <p>{tag.label}</p>
                </div>
              ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

function EditTagsModal({
  modalIsOpen,
  closeModal,
  availableTags,
  deleteTag,
  updateTag,
}: ModalProps) {
  return (
    <Transition show={modalIsOpen} as={Fragment}>
      <Dialog className="relative z-10" onClose={() => closeModal()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Edit Tags
              </Dialog.Title>

              <form>
                <div>
                  {availableTags.map((tag) => (
                    <div key={tag.id}>
                      <div>
                        <input
                          type="text"
                          value={tag.label}
                          onChange={(e) => updateTag(tag.id, e.target.value)}
                        />
                      </div>
                      <div>
                        <button onClick={() => deleteTag(tag.id)}>
                          &times;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </form>

              <button
                onClick={() => closeModal()}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Close
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default NoteList;
