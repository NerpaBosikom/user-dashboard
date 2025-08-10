export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-teal-50 text-center py-4 border-t border-teal-200">
      <p className="text-sm text-teal-700">
        Developed by <span className="font-semibold">Svetlana Tomzova</span> © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
