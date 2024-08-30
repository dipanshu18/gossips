import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const features: { title: string; description: string }[] = [
  {
    title: "Lorem Ipsum",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos numquam ipsum magnam officia quod, cupiditate nemo voluptate rerum dolorum atque facilis. Ducimus explicabo vitae iusto maiores facere dolorum enim quis nam, sed ex quos, nulla nesciunt perspiciatis exercitationem odit possimus? Accusantium provident necessitatibus ea laborum sunt nemo magnam doloremque incidunt!`,
  },
  {
    title: "Lorem Ipsum",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos numquam ipsum magnam officia quod, cupiditate nemo voluptate rerum dolorum atque facilis. Ducimus explicabo vitae iusto maiores facere dolorum enim quis nam, sed ex quos, nulla nesciunt perspiciatis exercitationem odit possimus? Accusantium provident necessitatibus ea laborum sunt nemo magnam doloremque incidunt!`,
  },
  {
    title: "Lorem Ipsum",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos numquam ipsum magnam officia quod, cupiditate nemo voluptate rerum dolorum atque facilis. Ducimus explicabo vitae iusto maiores facere dolorum enim quis nam, sed ex quos, nulla nesciunt perspiciatis exercitationem odit possimus? Accusantium provident necessitatibus ea laborum sunt nemo magnam doloremque incidunt!`,
  },
];

export default function Landing() {
  return (
    <div className="p-10">
      <main className="my-10 h-96">
        <header className="text-center">
          <h1 className="text-7xl py-5 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-900">
            Gossips
          </h1>
          <p className="text-lg text-wrap max-w-2xl mx-auto">
            A scalable chat app that has features like one-to-one chat and group
            chat to gossip about your favourite tech-stack, movies or anything
            you want.
          </p>
          <Link href={"/signup"} className="my-5 block">
            <Button>Get started</Button>
          </Link>
        </header>
      </main>

      <section className="my-10">
        <h1 className="text-3xl font-semibold text-center">Features</h1>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
          {features.map((item, idx) => (
            <Card key={idx} className="bg-inherit p-5 w-full space-y-4">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
