import { useState, useMemo, Fragment } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";
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
      <div className="flex flex-wrap justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-semibold text-slate-900 dark:text-slate-50">
            Notes
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/new")}
            className="rounded-full bg-purple-400 py-2 px-5 text-sm font-semibold leading-none text-white outline-2 outline-purple-300 transition-colors duration-300 hover:bg-purple-500 focus:bg-purple-500 focus:outline active:bg-purple-600 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:bg-purple-600 dark:active:bg-purple-700"
          >
            Create
          </button>
          <button
            onClick={() => openModal()}
            className="rounded-full bg-purple-400 py-2 px-5 text-sm font-semibold leading-none text-white outline-2 outline-purple-300 transition-colors duration-300 hover:bg-purple-500 focus:bg-purple-500 focus:outline active:bg-purple-600 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:bg-purple-600 dark:active:bg-purple-700"
          >
            Edit Tags
          </button>
        </div>
      </div>
      <form className="flex flex-col gap-2">
        <div className="flex flex-col">
          <p>Title</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="max-w-xs rounded py-1 px-2 shadow outline-2 outline-purple-300 transition-colors duration-300 focus:outline dark:bg-slate-600"
          />
        </div>
        <div>
          <p>Tags</p>
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
            className="my-react-select-container"
            classNamePrefix="my-react-select"
          />
        </div>
      </form>
      <div className="mt-8 grid auto-rows-fr grid-cols-fill-200min gap-4">
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
    <div className="rounded bg-white shadow transition-all duration-300  hover:bg-purple-100 focus:bg-purple-100 active:bg-purple-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-600">
      <Link to={`/${id}`} className="outline-2 outline-purple-300">
        <div className="h-full p-2">
          <div className="mb-2">
            <p className="text-lg">{title}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {tags.length > 0 &&
              tags.map((tag) => (
                <div key={tag.id} className="rounded bg-purple-400 py-1.5 px-2">
                  <p className="leading-none text-slate-50">{tag.label}</p>
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
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-slate-100 p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-800">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-50"
              >
                Edit Tags
              </Dialog.Title>

              <form className="my-2 flex flex-col gap-2">
                {availableTags.map((tag) => (
                  <div key={tag.id} className="flex gap-1">
                    <div className="flex-grow">
                      <input
                        type="text"
                        value={tag.label}
                        onChange={(e) => updateTag(tag.id, e.target.value)}
                        className="w-full rounded py-1 px-2 shadow outline-2 outline-purple-300 focus:outline dark:bg-slate-600 dark:text-slate-50"
                      />
                    </div>
                    <div>
                      <button
                        onClick={() => deleteTag(tag.id)}
                        className="flex h-full rounded bg-red-400 px-2 text-xl font-semibold text-white outline-2 outline-purple-300 transition-colors duration-300 hover:bg-red-500 focus:bg-red-500 focus:outline active:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:bg-red-600 dark:active:bg-red-700"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))}
              </form>
              <button
                onClick={() => closeModal()}
                className="rounded-full bg-purple-400 py-2 px-5 text-sm font-semibold leading-none text-white outline-2 outline-purple-300 transition-colors duration-300 hover:bg-purple-500 focus:bg-purple-500 focus:outline active:bg-purple-600 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:bg-purple-600 dark:active:bg-purple-700"
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
