// Floating bubbles
const bubblesContainer = document.querySelector(".bubbles");
function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  const size = Math.random() * 40 + 10; 
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.left = Math.random() * 100 + "vw";
  bubble.style.animationDuration = (Math.random() * 5 + 5) + "s";
  bubblesContainer.appendChild(bubble);
  setTimeout(() => bubble.remove(), 10000);
}
setInterval(createBubble, 500);

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task) {
    tasks.push({ text: task, done: false }); // store with "done" flag     
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    renderTasks(true);
  }    
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks(highlightLast = false) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span onclick="toggleDone(${index})" style="cursor:pointer; ${task.done ? 'text-decoration: line-through; color: gray;' : ''}">
        ${task.text}
      </span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    list.appendChild(li);

    // Highlight last added task
    if (highlightLast && index === tasks.length - 1) {
      const span = li.querySelector("span");
      span.classList.add("highlight");
      setTimeout(() => span.classList.remove("highlight"), 1200);
    }
  });
  updateProgress();
}

function updateProgress() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length; // count completed tasks
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  document.getElementById("progress").textContent = progress + "%";

  const plant = document.getElementById("plantStage");
  if (progress === 0) plant.textContent = "🌱";     
  else if (progress <= 40) plant.textContent = "🌿"; 
  else if (progress <= 80) plant.textContent = "🌳"; 
  else plant.textContent = "🌸";                     

  plant.style.transform = "scale(1.2)";
  setTimeout(() => (plant.style.transform = "scale(1)"), 300);
}
