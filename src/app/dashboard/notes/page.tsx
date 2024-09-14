export default function NotesPage({ foldersCount }: { foldersCount: number }) {
  return (
    <div className="h-[500px] rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
      {foldersCount === 0 ? (
        <p className="text-muted-foreground">
          No folders available. Please create a folder to view notes.
        </p>
      ) : (
        <p className="text-muted-foreground">Select a folder to view notes</p>
      )}
    </div>
  );
}
