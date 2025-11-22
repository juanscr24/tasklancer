import { Input } from "@/components/ui";
import { ButtonMode } from "@/components/ui/ButtonMode";
import { User } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-(--bg-1)">
      <ButtonMode />
      <div className="w-1/4">
        <h1 className="">Hola mundo</h1>
      </div>
    </div>
  );
}
