export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>&copy; {year} wzyns</p>
    </footer>
  );
}
