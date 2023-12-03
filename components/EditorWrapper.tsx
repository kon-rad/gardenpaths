"use client";

import { Editor } from "novel";
import { useEffect } from "react";
import { useGlobalState } from "@/lib/contexts/GlobalState";

const EditorWrapper = () => {
  const {
    doc,
    setDoc,
    startTransitionSaving,
    refreshEditor,
    setRefreshEditor,
    initDoc,
  } = useGlobalState();

  console.log("wrapper render content: ", initDoc);
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "s") {
        e.preventDefault();
        startTransitionSaving(async () => {
          // await updateDocument(doc, supabase, session);
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [doc, startTransitionSaving]);
  useEffect(() => {
    console.log("doc.doc_id updated", doc.doc_id, initDoc.doc_id);
    if (doc.doc_id !== initDoc.doc_id) {
      // setRefreshEditor()
      console.log("refreshing key", doc.content);

      setRefreshEditor(`${Math.random() * 10000000}`);
    }
  }, [doc.doc_id]);

  return (
    <Editor
      key={refreshEditor}
      disableLocalStorage={true}
      defaultValue={doc.content || ""}
      onUpdate={(editor) => {
        console.log(
          "calling onUpdate editor: ",
          editor,
          editor?.storage.markdown.getMarkdown()
        );

        setDoc((prev) => ({
          ...prev,
          content: editor?.storage.markdown.getMarkdown(),
        }));
      }}
      onDebouncedUpdate={() => {
        console.log("calling debounced update");

        if (doc.title === initDoc.title && doc.content === initDoc.content) {
          console.log("onDebouncedUpdate - no change");

          return;
        }
        // call the /api/autocomplete
        // { content: '' }
        startTransitionSaving(async () => {
          console.log("starting save inside EditorWrapper: doc: ", doc);

          // await updateDocument(doc, supabase, session);
        });
      }}
    />
  );
};

export default EditorWrapper;
