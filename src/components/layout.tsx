import React from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md px-5 py-12">
      <Header />
      <main className="py-12">{children}</main>
      <Footer />
    </div>
  );
}
