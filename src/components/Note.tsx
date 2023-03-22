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
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-normal text-slate-900">
            {note.title}
          </h1>
          <div className="flex flex-wrap gap-1">
            {note.tags.length > 0 &&
              note.tags.map((tag) => (
                <div key={tag.id} className="rounded bg-purple-400 py-1.5 px-2">
                  <p className="leading-none text-white">{tag.label}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/${note.id}/edit`)}
            className="rounded-full bg-purple-400 py-2 px-5 text-sm font-semibold leading-none text-white transition-all duration-300 hover:bg-purple-500 focus:outline-none focus:ring focus:ring-purple-300 active:bg-purple-600"
          >
            Edit
          </button>
          <button
            className="rounded-full bg-red-400 py-2 px-5 text-sm font-semibold leading-none text-white transition-all duration-300 hover:bg-red-500 focus:outline-none focus:ring focus:ring-purple-300 active:bg-red-600"
            onClick={() => {
              onDelete(note.id);
              navigate("/");
            }}
          >
            Delete
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 rounded-full bg-slate-400 py-2 px-5 text-sm font-semibold leading-none text-white transition-all duration-300 hover:bg-slate-500 focus:outline-none focus:ring focus:ring-purple-300 active:bg-slate-600"
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
        </div>
      </div>
      <div>
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
      </div>
    </>
  );
}

export default Note;
