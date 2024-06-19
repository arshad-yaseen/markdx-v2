import { db } from "@/db";
import { markdowns as markdownsSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";

export default async function Home() {
  const markdowns = await db.query.markdowns.findMany();

  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1 className="text-5xl tracking-tight font-bold text-center">
            Loading...
          </h1>
        </main>
      }
    >
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-5xl tracking-tight font-bold text-center">
          Magically Supercharge Your <br /> Markdown with AI
        </h1>

        <form
          action={async (formData: FormData) => {
            "use server";
            const title = formData.get("title") as string;
            const content = formData.get("content") as string;
            await db.insert(markdownsSchema).values({
              title,
              content,
            });

            revalidatePath("/");
          }}
          className="flex flex-col items-center justify-center w-full mt-24"
        >
          <input
            type="text"
            name="title"
            placeholder="Enter your title..."
            className="w-full p-4 text-lg text-center font-semibold tracking-tight bg-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          />
          <textarea
            placeholder="Start writing your markdown..."
            name="content"
            className="w-full h-96 p-4 mt-4 text-lg text-center font-semibold tracking-tight bg-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          ></textarea>
          <button
            type="submit"
            className="mt-8 px-8 py-4 text-lg font-semibold tracking-tight text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>

        <ul className="flex flex-col items-center justify-center w-full mt-24">
          {markdowns.map((markdown) => (
            <li
              key={markdown.id}
              className="w-full p-4 text-lg text-center font-semibold tracking-tight bg-gray-100 rounded-lg"
            >
              <h2>{markdown.title}</h2>
              <p>{markdown.content}</p>
              <p>{markdown.id}</p>
            </li>
          ))}
        </ul>
      </main>
    </Suspense>
  );
}
