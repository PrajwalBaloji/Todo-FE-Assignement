import Button from "../../base/Button/Button";

export default function DetailsSection() {
  return (
    <section className="h-full flex flex-col p-6 bg-gray-100 rounded-2xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Task</h2>
      <div className="flex flex-col">
        <input
          type="text"
          className="px-3 py-2 rounded-md border border-gray-300 bg-white 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col flex-1">
        <label className="text-sm text-gray-600 mb-1">Description</label>
        <textarea className="px-3 py-2 rounded-md border border-gray-300 bg-white resize-none h-full min-h-[150px]" />
      </div>
      <div className="flex items-center justify-end gap-2 mt-6">
        <Button appearance="text" variant="destructive">
          Delete
        </Button>

        <Button>Save Changes</Button>
      </div>
    </section>
  );
}
