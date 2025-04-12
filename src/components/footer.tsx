export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p className="text-sm">&copy; {year} wish.in</p>
    </footer>
  );
}
