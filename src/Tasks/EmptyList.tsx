interface EmptyListProps {
  message?: string;
}

export default function ExmptyList({ message }: EmptyListProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        {message || "No tasks yet"}
      </h2>
      <p className="text-gray-500 text-sm">
        Create your first task to get started.
      </p>
    </div>
  );
}
