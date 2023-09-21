import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.scss";
import { Task } from "@/models/task.model";
// get macro styles

// input component function
const AddTask = (
  props: React.PropsWithChildren<{
    setTasks: React.Dispatch<Task[]>;
    tasks: Task[];
  }>
) => {
  // input value
  const [inputValue, setInputValue] = useState("");
  const [taskId, setTaskId] = useState(0);

  const addTaskHandler = () => {
    if (inputValue.trim() !== "") {
      setTaskId(taskId + 1);
      const newTask: Task = {
        id: taskId,
        description: inputValue,
        completed: false,
      };
      props.setTasks([...props.tasks, newTask]);
      setInputValue("");
    }
  };

  return (
    <div className={`${styles.addTaskContainer}`}>
      <input
        type="text"
        name=""
        id=""
        className={`${styles.addTaskInput}`}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          addTaskHandler();
        }}
        className={`${styles.addTaskButton}`}
      >
        <Image
          src="icons/plus.svg"
          alt="add"
          width={20}
          height={20}
          style={{ display: "block" }}
        />
      </button>
    </div>
  );
};

const FilterTask = (
  props: React.PropsWithChildren<{
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    filter: string;
  }>
) => {
  // dropdown state
  const [dropdown, setDropdown] = useState(false);
  // array of filters
  const filters = ["All", "Completed", "Not Completed"];
  // arrow button position to set dropdown position
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });
  // dropdown handler
  const dropdownHandler = () => {
    setDropdown(!dropdown);
  };

  // get button position
  useEffect(() => {
    const button = document.querySelector(`.${styles.filterTaskButton}`);
    if (button) {
      const rect = button.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left,
      });
    }
  }, [dropdown]);

  // dropdown list
  const dropdownList = (
    <ul
      className={`${styles.dropdownList}`}
      style={{
        position: "absolute",
        top: position.top + 36,
        left: position.left - 90,
      }}
    >
      {filters.map((filter) => (
        <li
          key={filter}
          className={`${styles.dropdownListItem}`}
          onClick={() => {
            props.setFilter(filter);
            setDropdown(false);
          }}
        >
          {filter}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`${styles.filterTaskContainer}`}>
      <div className={`${styles.filterTask}`}>
        {props.filter}
        <button
          onClick={dropdownHandler}
          className={`${styles.filterTaskButton}`}
        >
          <Image
            src="icons/arrow.svg"
            alt="arrow"
            width={20}
            height={20}
            style={{ display: "block" }}
          />
        </button>
        {dropdown ? dropdownList : null}
      </div>
    </div>
  );
};

export default function Home() {
  // tasks state
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);
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
        <h1 className={`${styles.title}`}>To-Do List</h1>
        {/* add and filter */}
        <div className={`${styles.addAndFilterContainer}`}>
          <AddTask setTasks={setTasks} tasks={tasks} />
          <FilterTask setFilter={setFilter} filter={filter} />
        </div>
        <div className={`${styles.taskListContainer}`}>
          <>hello</>
        </div>
      </main>
    </>
  );
}
