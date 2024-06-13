export default function Loading() {
  return (
    <div className="z-50 w-full h-screen text-center bg-neutral-200 dark:bg-black">
      <div
        className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-indigo-500 rounded-full dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
