
function ErrorMessage({ message }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
      <p className="font-semibold">Error: {message}</p>
      <p className="text-sm mt-1">Please try again later.</p>
    </div>
  )
}

export default ErrorMessage