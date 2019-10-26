const wrap = document.getElementById('wrap');
const set = (t, n, v) => {
  t.setAttribute(n, v)
}

let draw = (n) => {
  for (i = 0; i < n * n; i++) {
    let s = document.createElement("div");
    s.className = "outline";
    wrap.appendChild(s);
  };
  fill();
};


let random = () => {
  return Math.floor(Math.random() * Math.floor(5))
}

let fill = () => {
  let count = wrap.childElementCount;
  let d = wrap.firstElementChild;
  set(d, "ondrop", "drop_handler(event)")
  set(d, "ondragover", "dragover_handler(event)")
  d = d.nextElementSibling;
  for (i = 0; i < count -1; i++) {
    let s = document.createElement("div");
    console.log(typeof s)
    s.id = `s${random()}`;
    s.className = "square";
    set(s, "draggable", "true");
    set(s, "ondragstart", "dragstart_handler(event)");
    d.appendChild(s);
    d = d.nextElementSibling;
  }
}

let dragstart_handler = (evt) => {
  event.target.classList.add("move");
  console.log(event.target.parentElement)
  evt.dataTransfer.setData('text/html', evt.target.id);
  evt.dataTransfer.dropEffect = 'move';
  set(evt.target.parentElement, "ondrop", "drop_handler(event)")
  set(evt.target.parentElement, "ondragover", "dragover_handler(event)")
  console.log(evt);
}

let dragover_handler = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

let drop_handler = (event) => {
  event.preventDefault();
  let data = event.dataTransfer.getData("text/html");
  console.log(data);
  event.target.appendChild(document.querySelector(".move"));
  event.target.removeAttribute("ondrop");
  event.target.removeAttribute("ondragover");
  event.target.firstElementChild.classList.remove('move');
}

draw(16);
