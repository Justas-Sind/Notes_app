import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
};

function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

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
      <div>
        <div>
          <h1>Notes</h1>
        </div>
        <div>
          <Link to="/new">
            <button>Create</button>
          </Link>
          <button>Edit Tags</button>
        </div>
      </div>
      <form>
        <div>
          <div>
            <label>
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

export default NoteList;
