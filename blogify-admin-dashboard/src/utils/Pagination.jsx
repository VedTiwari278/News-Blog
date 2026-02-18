import React from "react";

function Pagination({ page, setPage, pagination }) {
  if (!pagination) return null;

  const totalPages = pagination.totalPages || 1;

  const getPageNumbers = () => {
    const delta = 2; // pages before & after current
    const range = [];
    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(totalPages, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (range[0] > 2) range.unshift("...");
    if (range[0] !== 1) range.unshift(1);

    if (range[range.length - 1] < totalPages - 1) range.push("...");
    if (range[range.length - 1] !== totalPages) range.push(totalPages);

    return range;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="fixed bottom-5 right-5 bg-gray-300 shadow-lg rounded-xl px-4 py-3 flex items-center gap-2 flex-wrap z-50">
      {/* Prev Button */}
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-black hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ◀
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((p, idx) =>
        p === "..." ? (
          <span
            key={idx}
            className="px-3 py-1 text-gray-500 dark:text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded-full border transition ${
              p === page
                ? "bg-black text-white border-black"
                : "bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-black hover:text-white"
            }`}
          >
            {p}
          </button>
        ),
      )}

      {/* Next Button */}
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-black hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ▶
      </button>
    </div>
  );
}

export default Pagination;
