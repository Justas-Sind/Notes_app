import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";

type NoteProps = {
  onDelete: (id: string) => void;
};

function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div>
          <h1>{note.title}</h1>
          <div>
            {note.tags.length > 0 &&
              note.tags.map((tag) => (
                <div key={tag.id}>
                  <p>{tag.label}</p>
                </div>
              ))}
          </div>
        </div>
        <div>
          <Link to={`/${note.id}/edit`}>
            <button>Edit</button>
          </Link>
          <button
            onClick={() => {
              onDelete(note.id);
              navigate("/");
            }}
          >
            Delete
          </button>
          <Link to="/">
            <button>Back</button>
          </Link>
        </div>
      </div>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
}

export default Note;
