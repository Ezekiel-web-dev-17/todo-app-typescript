"use strict";
const myUls = document.querySelector("ul");
const form = document.querySelector("form");
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
let tasks = [];
let taskData = {
    id: 0,
    title: "",
    detail: "",
    tag: "",
    completed: false,
};
function parser() {
    const pars = localStorage.getItem("tsk 1");
    return pars ? JSON.parse(pars) : [];
}
function domMer(tagId) {
    return document.querySelector(`${tagId}`);
}
let pastTask = parser();
showTask();
function addTask() {
    return form.classList.add("d-visible");
}
function onTagChange(input) {
    taskData.tag = input.value;
}
function onChangeFunc(task) {
    const taskBtn = document.querySelector(`#${task}`);
    for (const key in taskData) {
        if (key === task) {
            const form = domMer(`#${task}`);
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
    }
    else {
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
            if (li.classList.contains("head-table"))
                return;
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
    tsk === null || tsk === void 0 ? void 0 : tsk.forEach((task) => {
        let li = document.createElement("li");
        li.innerHTML = `<p style="text-align: center; width: 20%">
      ${task === null || task === void 0 ? void 0 : task.title.toUpperCase()}
      </p>
      <p style="width: 55%; text-align: center">
      ${task === null || task === void 0 ? void 0 : task.detail}
      </p>
      <p style="text-align: center; width: 15%">${task === null || task === void 0 ? void 0 : task.tag}</p>
      <input
      type="checkbox"
      id="${task === null || task === void 0 ? void 0 : task.id}"
      ${task.completed ? "checked" : ""}
      style="text-align: center; max-width: 3%; accent-color: chartreuse"
      onclick="complete(${task === null || task === void 0 ? void 0 : task.completed}, ${task === null || task === void 0 ? void 0 : task.id})"
      />`;
        myUls.appendChild(li);
    });
}
function complete(done, taskID) {
    let updatedTasks = pastTask.map((prevTsk) => {
        if ((prevTsk === null || prevTsk === void 0 ? void 0 : prevTsk.id) === taskID) {
            return Object.assign(Object.assign({}, prevTsk), { completed: !done });
        }
        return prevTsk;
    });
    localStorage.setItem("tsk 1", JSON.stringify(updatedTasks));
    myUls.innerHTML = defaultContent;
    showTask();
}
