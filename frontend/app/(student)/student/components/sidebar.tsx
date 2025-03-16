import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Sidebar() {
  return (
    <ScrollArea className=" h-[calc(100vh)] bg-transparent shadow-xl ">
      <aside
        className={cn(`w-20 p-8  h-screen  bg-primary text-primary-foreground`)}
      >
        
        <nav className="flex flex-col items-center justify-between h-full">
          <Link href="/">
            <Button className="text-4xl" variant="ghost">
              🏠
            </Button>
          </Link>
          <Link href="/student/category">
          <Button className="text-4xl" variant="ghost">
            📊
          </Button>
          </Link>
          <Link href="/">
          <Button className="text-4xl" variant="ghost">
            📜
          </Button>
          </Link>
          <Link href="/">
          <Button className="text-4xl" variant="ghost">
            🔄
          </Button>
          </Link>
        </nav>
      </aside>
    </ScrollArea>
  );
}
