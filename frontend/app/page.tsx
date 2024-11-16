import AddTagsToProfile from "@/components/add-tags-to-profile";
import Nav from "@/components/nav";
import DynamicProvider from "@/providers/dynamic-provider";

export default function Home() {
  return (
    <DynamicProvider>
      <Nav />
      <main className="min-h-screen w-full bg-frost-100 text-night-950 overflow-hidden font-sans pt-24 px-4">
        <AddTagsToProfile />
      </main>
    </DynamicProvider>
  );
}
