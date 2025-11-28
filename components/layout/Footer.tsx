// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t">
      <div className="container mx-auto px-4 py-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}
