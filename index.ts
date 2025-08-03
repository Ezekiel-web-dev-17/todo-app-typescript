const myUls = document.querySelector("ul") as HTMLUListElement;
const form = document.querySelector("form") as HTMLFormElement;
const defaultContent = ` <li class="head-table">
    <p style="text-align: center; width: 20%">Task Title</p>
          <p
          style="
              width: 55%;
              text-align: center;
              border-left: 2px solid #fffb00;
              border-right: 2px solid #fffb00;
              "
              >
              Detail
              </p>
              <p
              style="
              border-right: 2px solid #fffb00;
              text-align: center;
              width: 15%;
              "
          >
            Tag
            </p>
            <p style="text-align: center; max-width: 3%">Done</p>
            </li>`;
let tasks: taskD[] = [];
interface taskD {
  id: number;
  title: string;
  detail: string;
  tag: string;
  completed?: boolean;
}
let taskData: taskD = {
  id: 0,
  title: "",
  detail: "",
  tag: "",
  completed: false,
};

function parser(): taskD[] {
  const pars = localStorage.getItem("tsk 1");
  return pars ? JSON.parse(pars) : [];
}

function domMer(tagId: string) {
  return document.querySelector(`${tagId}`);
}

let pastTask = parser();
showTask();

function addTask() {
  return form.classList.add("d-visible");
}

function onTagChange(input: HTMLInputElement) {
  taskData.tag = input.value;
}

function onChangeFunc(task: string) {
  const taskBtn = document.querySelector(`#${task}`) as HTMLButtonElement;
  for (const key in taskData) {
    if (key === task) {
      const form = domMer(`#${task}`) as HTMLFormElement;

      let domElementValue = form.value;
      switch (task) {
        case "title":
          domElementValue ? (taskData.title = domElementValue) : "title";
          break;
        case "detail":
          domElementValue ? (taskData.detail = domElementValue) : "detail";
          break;
      }
    }
  }
}

function buildTask() {
  if (pastTask && pastTask[0]) {
    tasks = [
      ...pastTask,
      {
        id: Date.now(),
        title: taskData.title,
        detail: taskData.detail,
        tag: taskData.tag,
        completed: taskData.completed,
      },
    ];
  } else {
    tasks = [
      ...tasks,
      {
        id: Date.now(),
        title: taskData.title,
        detail: taskData.detail,
        tag: taskData.tag,
        completed: taskData.completed,
      },
    ];
  }
}
function saveTasks() {
  localStorage.setItem("tsk 1", JSON.stringify(tasks));
}
function renderTasks() {
  if (taskData.title && taskData.detail && taskData.tag) {
    document.querySelectorAll("li").forEach((li) => {
      saveTasks();
      if (li.classList.contains("head-table")) return;
      li.style.display = "none";
    });
    myUls.innerHTML = defaultContent;
    showTask();
  }
}
function resetForm() {
  form.reset();
  document.querySelectorAll(".tag-btn").forEach((btn) => {
    btn.classList.remove("tag-btn");
  });
  taskData = {
    id: 0,
    title: "",
    detail: "",
    tag: "",
    completed: false,
  };
}

function createTask() {
  buildTask();
  renderTasks();
  resetForm();
  form.classList.remove("d-visible");
}

function showTask() {
  let tsk = parser();
  if (!tsk || tsk.length === 0) {
    myUls.innerHTML += `<li style="text-align: center; width: 100%; color: white; font-size: 22px; font-weight: 600;">No tasks yet.</li>`;
    return;
  }
  tsk?.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = `<p style="text-align: center; width: 20%">
      ${task?.title.toUpperCase()}
      </p>
      <p style="width: 55%; text-align: center">
      ${task?.detail}
      </p>
      <p style="text-align: center; width: 15%">${task?.tag}</p>
      <input
      type="checkbox"
      id="${task?.id}"
      ${task.completed ? "checked" : ""}
      style="text-align: center; max-width: 3%; accent-color: chartreuse"
      onclick="complete(${task?.completed}, ${task?.id})"
      />`;
    myUls.appendChild(li);
  });
}

function complete(done: boolean, taskID: number) {
  let updatedTasks = pastTask.map((prevTsk: taskD) => {
    if (prevTsk?.id === taskID) {
      return { ...prevTsk, completed: !done };
    }
    return prevTsk;
  });
  localStorage.setItem("tsk 1", JSON.stringify(updatedTasks));
  myUls.innerHTML = defaultContent;
  showTask();
}
