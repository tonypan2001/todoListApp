export default function SkeletonTasks() {
  const Item = () => (
    <div className="animate-pulse rounded-lg border border-gray-200 p-4 bg-white dark:bg-gray-800">
      <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
      <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );
  return (
    <div className="flex flex-col gap-3">
      <Item />
      <Item />
      <Item />
    </div>
  );
}
