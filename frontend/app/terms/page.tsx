import React from "react";

const Page = () => {
  return (
    <div className="font-serif grid place-items-center min-h-dvh w-full">
      <div className="text-lg max-w-96">
        <p className="text-2xl mb-8 font-semibold">
          Since you're ever so curious, here's our twitter handles 😇
        </p>
        <div className="space-y-4 flex flex-col gap-4 ">
          <a
            href="https://twitter.com/boidushya"
            className="underline underline-offset-2"
          >
            Boidu - I talk I yap I code I nap (and the guy whos talking to you
            rn, i spent way too much on the landing page btw)
          </a>
          <a
            href="https://twitter.com/bhowaldebjit"
            className="underline underline-offset-2"
          >
            Debjit - All the parts you do not see, the person who made - this is
            he
          </a>
          <a
            href="https://twitter.com/imanishbarnwal"
            className="underline underline-offset-2"
          >
            Manish - He's currently sweet talking DevRels @ the hackathon lol
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
