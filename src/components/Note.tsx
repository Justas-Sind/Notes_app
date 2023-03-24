import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";

type NoteProps = {
  onDelete: (id: string) => void;
};

function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <>
      <div className="mb-3 flex flex-wrap items-start justify-between gap-1">
        <div>
          <div>
            <h1 className="mb-2 text-2xl font-normal text-slate-900 dark:text-slate-50 sm:text-3xl">
              {note.title}
            </h1>
          </div>
          <div className="flex flex-wrap gap-1">
            {note.tags.length > 0 &&
              note.tags.map((tag) => (
                <div key={tag.id} className="rounded bg-purple-400 py-1.5 px-2">
                  <p className="leading-none text-white">{tag.label}</p>
                </div>
              ))}
          </div>
        </div>
        <div>
          <button
            onClick={() => navigate("/")}
            className="hidden items-center gap-1 rounded-full bg-slate-400 py-1.5 px-4 text-sm font-semibold leading-none text-white outline-2 outline-purple-300 transition-colors duration-300 hover:bg-slate-500 focus:outline active:bg-slate-600 dark:bg-slate-500 dark:hover:bg-slate-600 dark:active:bg-slate-700 sm:flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 rounded-full bg-slate-400 py-1.5 px-2.5 text-sm font-semibold leading-none text-white outline-2 outline-purple-300 transition-colors duration-300 hover:bg-slate-500 focus:outline active:bg-slate-600 sm:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mb-3 break-words rounded bg-white p-2 shadow transition-colors duration-300 dark:bg-slate-700">
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(`/${note.id}/edit`)}
          className="rounded-full bg-purple-400 py-2 px-5 text-sm font-semibold leading-none text-white outline-2 outline-purple-300 transition-colors duration-300 hover:bg-purple-500 focus:outline active:bg-purple-600 dark:bg-purple-500 dark:hover:bg-purple-600 dark:active:bg-purple-700"
        >
          Edit
        </button>
        <button
          className="rounded-full bg-red-400 py-2 px-5 text-sm font-semibold leading-none text-white outline-2 outline-purple-300 transition-colors duration-300 hover:bg-red-500 focus:outline active:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700"
          onClick={() => {
            onDelete(note.id);
            navigate("/");
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default Note;
