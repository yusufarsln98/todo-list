import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import { Task } from "@/models/task.model";

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta
          name="description"
          content="
          A simple todo list app built with Next.js, SASS and TypeScript.
        "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <>hello</>
      </main>
    </>
  );
}
